import configureAppStore from '@shared/store/configureStore';
// import { getPreloadedState } from './getPreloadedState';

export const getSentinel2ExplorerStore = async () => {
    // const preloadedState = await getPreloadedState();
    return configureAppStore();
};
