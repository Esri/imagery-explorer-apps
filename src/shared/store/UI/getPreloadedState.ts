import { InterestingPlaceData } from '@typing/shared';
import { UIState, initialUIState } from './reducer';
import { getAnimationSpeedFromHashParams } from '@shared/utils/url-hash-params';
import { getOpenSavePanelFromSessionStorage } from '@shared/utils/session-storage/sessionStorage';

export const getPreloadedState4UI = (
    hashParams: URLSearchParams,
    randomInterestingPlace: InterestingPlaceData
): UIState => {
    const animationSpeed = getAnimationSpeedFromHashParams(hashParams);

    const showSavePanel = getOpenSavePanelFromSessionStorage();

    const proloadedUIState: UIState = {
        ...initialUIState,
        nameOfSelectedInterestingPlace: randomInterestingPlace?.name || '',
        showSavePanel,
    };

    if (animationSpeed) {
        proloadedUIState.animationSpeed = animationSpeed;
        proloadedUIState.animationStatus = 'loading';
    }

    return proloadedUIState;
};
