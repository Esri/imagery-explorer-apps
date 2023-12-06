import configureAppStore from '@shared/store/configureStore';
import { getPreloadedState } from './getPreloadedState';

export const getLandsatExplorerStore = async () => {
    const preloadedState = await getPreloadedState();
    return configureAppStore(preloadedState);
};
