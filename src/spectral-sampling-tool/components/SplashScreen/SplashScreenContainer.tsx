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

export const SplashScreenContainer = () => {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const createNewSessionButtonOnClick = async (
        targetService: SpectralSamplingToolSupportedService,
        sessionName: string
    ) => {
        try {
            setIsLoading(true);
            setError(null);

            const timeExtent = await getTimeExtentByTargetService(
                targetService
            );
            console.log('timeExtent', timeExtent);

            const rasterFunctionInfo =
                getRasterFunctionInfoByTargetService(targetService);
            console.log('rasterFunctionInfo', rasterFunctionInfo);

            dispatch(classificationNameUpdated(sessionName));
            dispatch(targetServiceUpdated(targetService));
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <SplashScreen
            isLoading={isLoading}
            error={error}
            createNewSessionButtonOnClick={createNewSessionButtonOnClick}
        />
    );
};
