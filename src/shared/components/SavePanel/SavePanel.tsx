import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowSavePanel } from '@shared/store/UI/selectors';
import { CloseButton } from '../CloseButton';
import { showSavePanelToggled } from '@shared/store/UI/reducer';
import {
    destroyCredentials,
    isAnonymouns,
    signIn,
    signOut,
} from '@shared/utils/esri-oauth';
// import { CreateHostedImageryLayer } from './CreateHostedImageryLayer/CreateHostedImageryLayer';
import { JobList } from './JobList';
import { Header } from './SavePanelHeader/Header';
import { SaveOptionButton } from './SaveOptionsList/SaveOptionButton';
import { SaveOptionsListHeader } from './SaveOptionsList/SaveOptionsListHeader';
import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';
import { saveOptionInfoLookup } from './constants';
import { setOpenSavePanelInSessionStorage } from '@shared/utils/session-storage/sessionStorage';
import { SignedUserHeader } from './SignedUserHeader/SignedUserHeader';
import { SaveJobDialog } from './SaveJobDialog/SaveJobDialog';
import { PublishAndDownloadJobOptionData } from './useDownloadAndPublishOptions';

export type SaveJobButtonOnClickParams = {
    /**
     * The type of job to be saved.
     */
    saveJobType: PublishAndDownloadJobType;
    /**
     * The title of the job.
     */
    title: string;
    /**
     * The summary of the job.
     */
    summary: string;
};

/**
 * Props for the SavePanelContainer component.
 */
type SavePanelProps = {
    /**
     * ID of the scene to be used for generating and downloading the raster job.
     */
    sceneId: string;
    /**
     * Options for publishing the scene.
     */
    publishOptions: PublishAndDownloadJobOptionData[];
    // /**
    //  * Options for downloading the scene.
    //  */
    // downloadOptions: PublishAndDownloadJobOptionData[];
    /**
     * Emits when a save button is clicked.
     * @param {SaveOption} option - The save button that was clicked.
     * @returns {void}
     */
    saveButtonOnClick: (params: SaveJobButtonOnClickParams) => void;
};

export const SavePanel: FC<SavePanelProps> = ({
    sceneId,
    publishOptions,
    // downloadOptions,
    saveButtonOnClick,
}) => {
    const dispatch = useDispatch();

    const shouldShowSavePanel = useSelector(selectShowSavePanel);

    const [activeSaveJobDialog, setActiveSaveJobDialog] =
        useState<PublishAndDownloadJobType>();

    useEffect(() => {
        setOpenSavePanelInSessionStorage(shouldShowSavePanel);

        if (!shouldShowSavePanel) {
            return;
        }

        if (isAnonymouns()) {
            signIn();
        }
    }, [shouldShowSavePanel]);

    if (!shouldShowSavePanel) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-custom-background-95 z-20 text-custom-light-blue overflow-y-auto fancy-scrollbar">
            <CloseButton
                onClick={() => {
                    dispatch(showSavePanelToggled());
                }}
            />

            <SignedUserHeader
                onSignOut={() => {
                    // console.log('sign out');
                    // hide the save panel before signing out so that the user is not redirected to the sign-in page
                    setOpenSavePanelInSessionStorage(false);
                    signOut();
                }}
                onSwitchAccount={() => {
                    // sign out and the user will be redirected to the sign-in page
                    signOut();
                }}
            />

            <div className="mt-16 md:mt-4 mx-4 md:mx-auto py-12 md:max-w-3xl w-full">
                <Header sceneId={sceneId} />

                <div className="relative w-full mt-12 mx-auto">
                    {/* {downloadOptions?.length ? (
                        <div>
                            <SaveOptionsListHeader title="Download" />

                            {downloadOptions.map((option) => {
                                const { inputName, outputName, description } =
                                    saveOptionInfoLookup[option];

                                return (
                                    <SaveOptionButton
                                        key={option}
                                        title={inputName}
                                        subtitle={'as ' + outputName}
                                        desciprtion={description}
                                        disabled={false}
                                        onClick={() => {
                                            setActiveSaveJobDialog(option);
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ) : null} */}

                    <div>
                        <SaveOptionsListHeader title="Publish" />

                        {publishOptions.map((d) => {
                            const { saveJobType, disabled, message } = d;

                            const { inputName, outputName, description } =
                                saveOptionInfoLookup[saveJobType];

                            return (
                                <SaveOptionButton
                                    key={saveJobType}
                                    title={inputName}
                                    subtitle={'as ' + outputName}
                                    desciprtion={description}
                                    disabled={disabled}
                                    message={message}
                                    onClick={() => {
                                        setActiveSaveJobDialog(saveJobType);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                <JobList />
            </div>

            {activeSaveJobDialog ? (
                <SaveJobDialog
                    saveJobType={activeSaveJobDialog}
                    sceneId={sceneId}
                    closeButtonOnClick={() => setActiveSaveJobDialog(undefined)}
                    saveButtonOnClick={(title, summary) => {
                        // console.log(title, summary);
                        saveButtonOnClick({
                            saveJobType: activeSaveJobDialog,
                            title,
                            summary,
                        });
                        setActiveSaveJobDialog(undefined);
                    }}
                />
            ) : null}
        </div>
    );
};
