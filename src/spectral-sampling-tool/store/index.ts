import { getPreloadedState } from './getPreloadedState';
import configureAppStore from './configureStore';

export const getSpectralSampingToolStore = async () => {
    const preloadedState = await getPreloadedState();
    return configureAppStore(preloadedState);
};
