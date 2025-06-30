/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
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
import {
    PublishAndDownloadJobType,
    PublishJob,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import { saveOptionInfoLookup } from './constants';
import { setOpenSavePanelInSessionStorage } from '@shared/utils/session-storage/sessionStorage';
import { SignedUserHeader } from './SignedUserHeader/SignedUserHeader';
import { SaveJobDialog } from './SaveJobDialog/SaveJobDialog';
import { PublishAndDownloadJobOptionData } from './useDownloadAndPublishOptions';
import {
    // EstimatedCostByJobType,
    PublishJobSubmitHandler,
} from './SavePanelContainer';
import { useAppDispatch } from '@shared/store/configureStore';
import { useTranslation } from 'react-i18next';

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
    sceneIds: string[];
    /**
     * Subheader text to be displayed below the title. This is optional.
     */
    subHeader: string;
    /**
     * Options for publishing the scene.
     */
    publishOptions: PublishAndDownloadJobOptionData[];
    /**
     * The satellite name used in the title and summary of the output ArchGIS Online item.
     */
    satellite: string;
    // /**
    //  * Options for downloading the scene.
    //  */
    // downloadOptions: PublishAndDownloadJobOptionData[];
    // /**
    //  * Estimated cost of the raster analysis job.
    //  * The cost is in credits.
    //  */
    // estimatedCostByJobType: EstimatedCostByJobType;
    /**
     * Emits when a save button is clicked.
     * @param {SaveOption} option - The save button that was clicked.
     * @returns {void}
     */
    saveButtonOnClick: (params: SaveJobButtonOnClickParams) => void;
    /**
     * Handler for submitting a publish job.
     * @param job data for the publish job
     * @returns void
     */
    publishJobSubmitHandler: PublishJobSubmitHandler;
};

export const SavePanel: FC<SavePanelProps> = ({
    sceneIds,
    subHeader,
    publishOptions,
    // estimatedCostByJobType,
    satellite,
    // downloadOptions,
    saveButtonOnClick,
    publishJobSubmitHandler,
}) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const shouldShowSavePanel = useAppSelector(selectShowSavePanel);

    const [activeSaveJobDialog, setActiveSaveJobDialog] =
        useState<PublishAndDownloadJobType>();

    const signedIn = isAnonymouns() === false;

    useEffect(() => {
        setOpenSavePanelInSessionStorage(shouldShowSavePanel);

        if (!shouldShowSavePanel) {
            return;
        }

        // if (isAnonymouns()) {
        //     // if the user is not signed in, we need to sign in
        //     signIn();
        // }
    }, [shouldShowSavePanel]);

    const signInButtonOnClick = () => {
        setOpenSavePanelInSessionStorage(true);
        signIn();
    };

    if (!shouldShowSavePanel) {
        return null;
    }

    return (
        <div
            className="absolute top-0 left-0 bottom-0 right-0 bg-custom-background-95 z-20 text-custom-light-blue overflow-y-auto fancy-scrollbar"
            data-testid="save-panel"
        >
            <CloseButton
                onClick={() => {
                    dispatch(showSavePanelToggled());
                }}
            />

            <SignedUserHeader
                onSignIn={signInButtonOnClick}
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
                <Header
                    // sceneId={sceneId}
                    subHeader={subHeader}
                    signedIn={signedIn}
                    signInButtonOnClick={signInButtonOnClick}
                />

                <div className="relative w-full mt-12 mx-auto">
                    <div
                        data-testid="save-options-list"
                        data-number-of-options={publishOptions.length}
                    >
                        <SaveOptionsListHeader title={t('publish')} />

                        {publishOptions.map((d) => {
                            const { saveJobType, disabled, message } = d;

                            const { inputName, outputName, description } =
                                saveOptionInfoLookup[saveJobType];

                            // const estimatedCost =
                            //     estimatedCostByJobType[
                            //         saveJobType as PublishJob
                            //     ] || 0;

                            return (
                                <div
                                    key={saveJobType}
                                    data-testid={`save-option-${saveJobType}`}
                                >
                                    <SaveOptionButton
                                        key={saveJobType}
                                        title={t(inputName)}
                                        subtitle={t(outputName)}
                                        desciprtion={t(description)}
                                        // estimatedCost={estimatedCost}
                                        disabled={disabled || !signedIn}
                                        message={message}
                                        onClick={() => {
                                            setActiveSaveJobDialog(saveJobType);
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <JobList publishJobSubmitHandler={publishJobSubmitHandler} />
            </div>

            {activeSaveJobDialog ? (
                <SaveJobDialog
                    saveJobType={activeSaveJobDialog}
                    sceneIds={sceneIds}
                    satellite={satellite}
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
