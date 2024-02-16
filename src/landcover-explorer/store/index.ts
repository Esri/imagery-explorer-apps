import configureAppStore from '@shared/store/configureStore';
import { getPreloadedState } from './getPreloadedState';

export const getLandsatcoverExplorerStore = () => {
    const preloadedState = getPreloadedState();
    return configureAppStore(preloadedState);
};
