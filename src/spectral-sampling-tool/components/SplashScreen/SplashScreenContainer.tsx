import React from 'react';
import { SplashScreen } from './SplashScreen';
import { useAppDispatch } from '@shared/store/configureStore';
import {
    classificationNameUpdated,
    SpectralSamplingToolSupportedService,
    targetServiceUpdated,
} from '@shared/store/SpectralSamplingTool/reducer';
import {
    getRasterFunctionInfoByTargetService,
    getTimeExtentByTargetService,
} from '@spectral-sampling-tool/utils/getTargetService';
import {
    imageryServiceRasterFunctionInfoUpdated,
    imageryServiceTimeExtentUpdated,
} from '@shared/store/ImageryService/reducer';
import {
    resetCurrentSamplingSession,
    resumePreviousSession,
} from '@shared/store/SpectralSamplingTool/thunks';
import { SpectralSamplingToolSessionData } from '@shared/utils/indexedDB/sessioOfSpectralSamplingTool';

export const SplashScreenContainer = () => {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const getPrerequisiteData = async (
        targetService: SpectralSamplingToolSupportedService
    ) => {
        try {
            setIsLoading(true);
            setError(null);

            // Get the time extent and raster function info of the selected target service
            const timeExtent =
                await getTimeExtentByTargetService(targetService);
            // console.log('timeExtent', timeExtent);

            const rasterFunctionInfo =
                getRasterFunctionInfoByTargetService(targetService);
            // console.log('rasterFunctionInfo', rasterFunctionInfo);

            // Update the imagery service state
            // with the time extent and raster function info
            // of the selected target service
            dispatch(imageryServiceTimeExtentUpdated(timeExtent));
            dispatch(
                imageryServiceRasterFunctionInfoUpdated(rasterFunctionInfo)
            );
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const createNewSessionButtonOnClick = async (
        targetService: SpectralSamplingToolSupportedService,
        sessionName: string
    ) => {
        await getPrerequisiteData(targetService);

        // Reset the current sampling session
        // to remove all sampling points and query params associated with it
        dispatch(resetCurrentSamplingSession());

        // Update the spectral sampling tool state
        // with the selected target service and session name
        dispatch(classificationNameUpdated(sessionName));
        dispatch(targetServiceUpdated(targetService));
    };

    const continuePreviousSessionButtonOnClick = async (
        data: SpectralSamplingToolSessionData
    ) => {
        if (!data) {
            console.log('no session data found');
            return;
        }

        await getPrerequisiteData(data.targetService);

        dispatch(resumePreviousSession(data));
    };

    return (
        <SplashScreen
            isLoading={isLoading}
            error={error}
            createNewSessionButtonOnClick={createNewSessionButtonOnClick}
            countinuePreviousSessionButtonOnClick={
                continuePreviousSessionButtonOnClick
            }
            // createNewSessionButtonOnClick={createNewSessionButtonOnClick}
        />
    );
};
