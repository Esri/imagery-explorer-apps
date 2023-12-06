import { getPreloadedState } from './getPreloadedState';
import configureAppStore from './configureStore';

export const getLandsatExplorerStore = async () => {
    const preloadedState = await getPreloadedState();
    return configureAppStore(preloadedState);
};
