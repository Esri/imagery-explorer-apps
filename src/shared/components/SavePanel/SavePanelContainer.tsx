import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowSavePanel } from '@shared/store/UI/selectors';
import { CloseButton } from '../CloseButton';
import { showSavePanelToggled } from '@shared/store/UI/reducer';
import { isAnonymouns, signIn } from '@shared/utils/esri-oauth';
import { CreateHostedImageryLayer } from './CreateHostedImageryLayer/CreateHostedImageryLayer';
import { JobList } from './JobList';
import { useCheckJobStatus } from './useCheckJobStatus';
import { Header } from './Header/Header';
import { SaveOptionButton } from './SaveOptionsList/SaveOptionButton';
import { SaveOptionsListHeader } from './SaveOptionsList/SaveOptionsListHeader';

type SavePanelContainerProps = {
    /**
     * URL of the imagery service to be used for the generate and download raster job.
     *
     * Please note that this URL should be the actual URL of the imagery service, not the URL of the service proxy used by the app.
     */
    imageryServiceURL: string;
    /**
     * ID of the scene to be used for the generate and download raster job.
     */
    sceneId: string;
};

export const SavePanelContainer: FC<SavePanelContainerProps> = ({
    imageryServiceURL,
    sceneId,
}) => {
    const dispatch = useDispatch();

    const shouldShowSavePanel = useSelector(selectShowSavePanel);

    useCheckJobStatus();

    useEffect(() => {
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

            <div className="mt-4 mx-auto py-12  max-w-3xl w-full">
                <Header sceneId={sceneId} />

                <div className="w-full mt-12 mx-auto">
                    {/* <CreateHostedImageryLayer
                        imageryServiceURL={imageryServiceURL}
                        sceneId={sceneId}
                    /> */}

                    <SaveOptionsListHeader title="Publish" />

                    <SaveOptionButton
                        title="Scene"
                        subtitle="as Hosted Imagery"
                        desciprtion="Publish a hosted imagery layer of the selected scene. This action requires a Professional Plus User Type and a Publisher role or higher."
                        onClick={() => {
                            console.log('Scene');
                        }}
                    />

                    <SaveOptionButton
                        title="Index mask"
                        subtitle="as Hosted Imagery"
                        desciprtion="Publish a hosted imagery layer of the selected scene. This action requires a Professional Plus User Type and a Publisher role or higher."
                        onClick={() => {
                            console.log('Scene');
                        }}
                    />
                </div>

                <JobList />
            </div>
        </div>
    );
};
