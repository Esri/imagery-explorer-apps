import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowSavePanel } from '@shared/store/UI/selectors';
import { CloseButton } from '../CloseButton';
import { showSavePanelToggled } from '@shared/store/UI/reducer';
import { isAnonymouns, signIn } from '@shared/utils/esri-oauth';
// import { CreateHostedImageryLayer } from './CreateHostedImageryLayer/CreateHostedImageryLayer';
import { JobList } from './JobList';
import { useCheckJobStatus } from './useCheckRasterAnalysisJobStatus';
import { Header } from './SavePanelHeader/Header';
import { SaveOptionButton } from './SaveOptionsList/SaveOptionButton';
import { SaveOptionsListHeader } from './SaveOptionsList/SaveOptionsListHeader';
import { SaveJobType } from '@shared/store/SaveJobs/reducer';
import { saveOptionInfoLookup } from './constants';
import { setOpenSavePanelInSessionStorage } from '@shared/utils/session-storage/sessionStorage';
import { SignedUserHeader } from './SignedUserHeader/SignedUserHeader';
import { SaveJobDialog } from './SaveJobDialog/SaveJobDialog';

/**
 * Props for the SavePanelContainer component.
 */
type SavePanelContainerProps = {
    /**
     * ID of the scene to be used for generating and downloading the raster job.
     */
    sceneId: string;
    /**
     * Options for publishing the scene.
     */
    publishOptions: SaveJobType[];
    /**
     * Options for downloading the scene.
     */
    downloadOptions: SaveJobType[];
    /**
     * Emits when a save option is clicked.
     * @param {SaveOption} option - The save option that was clicked.
     * @returns {void}
     */
    saveButtonOnClick: (option: SaveJobType) => void;
};

export const SavePanelContainer: FC<SavePanelContainerProps> = ({
    sceneId,
    publishOptions,
    downloadOptions,
    saveButtonOnClick,
}) => {
    const dispatch = useDispatch();

    const shouldShowSavePanel = useSelector(selectShowSavePanel);

    const [activeSaveJobDialog, setActiveSaveJobDialog] =
        useState<SaveJobType>();

    useCheckJobStatus();

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

            <SignedUserHeader />

            <div className="mt-4 mx-4 md:mx-auto py-12 md:max-w-3xl w-full">
                <Header sceneId={sceneId} />

                <div className="relative w-full mt-12 mx-auto">
                    {downloadOptions?.length ? (
                        <div>
                            <SaveOptionsListHeader title="Download" />

                            {downloadOptions.map((option) => {
                                const { title, subtitle, description } =
                                    saveOptionInfoLookup[option];

                                return (
                                    <SaveOptionButton
                                        key={option}
                                        title={title}
                                        subtitle={subtitle}
                                        desciprtion={description}
                                        disabled={false}
                                        onClick={() => {
                                            setActiveSaveJobDialog(option);
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ) : null}

                    <div>
                        <SaveOptionsListHeader title="Publish" />

                        {publishOptions.map((option) => {
                            const { title, subtitle, description } =
                                saveOptionInfoLookup[option];

                            return (
                                <SaveOptionButton
                                    key={option}
                                    title={title}
                                    subtitle={subtitle}
                                    desciprtion={description}
                                    disabled={false}
                                    onClick={() => {
                                        setActiveSaveJobDialog(option);
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
                    closeButtonOnClick={() => setActiveSaveJobDialog(undefined)}
                    saveButtonOnClick={(title, summary) => {
                        saveButtonOnClick(activeSaveJobDialog);
                        setActiveSaveJobDialog(undefined);
                    }}
                />
            ) : null}
        </div>
    );
};
