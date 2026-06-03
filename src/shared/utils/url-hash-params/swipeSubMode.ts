import type { SwipeSubMode } from '@shared/store/ImageryScene/reducer';
import { updateHashParams } from '.';

type EncodedSwipeSubModeParams = {
    isSwipeModeOn: boolean;
    selectedSubMode: SwipeSubMode;
    availableSubModes: SwipeSubMode[];
    isBasemapOnRightSideOfSwipe: boolean;
};

/**
 * Encodes swipe sub-mode state for URL hash params.
 *
 * Returns an empty string when there is only one (or no) available sub-mode,
 * because there is nothing meaningful to persist in the URL.
 */
const encodeSwipeSubMode = ({
    isSwipeModeOn,
    selectedSubMode,
    availableSubModes,
    isBasemapOnRightSideOfSwipe,
}: EncodedSwipeSubModeParams): string | null => {
    if (!isSwipeModeOn) {
        return null;
    }

    // If there is only one or no sub mode available, we don't need to encode it in the URL hash params
    if (!availableSubModes || availableSubModes.length <= 1) {
        return null;
    }

    return `${selectedSubMode}|${isBasemapOnRightSideOfSwipe ? 'right' : 'left'}`;
};

type DecodedSwipeSubModeOutput = {
    selectedSubMode: SwipeSubMode;
    isBasemapOnRightSideOfSwipe: boolean;
} | null;

/**
 * Decodes swipe sub-mode state from URL hash params.
 *
 * Returns `null` when the value is empty or the decoded sub-mode is invalid.
 */
const decodeSwipeSubMode = (val: string): DecodedSwipeSubModeOutput => {
    if (!val) {
        return null;
    }

    const [selectedSubMode, basemapPosition] = val.split('|');

    // validate the decoded selectedSubMode value to make sure it's a valid SwipeSubMode, if not, return null
    const validSwipeSubModes: SwipeSubMode[] = [
        'scene-to-scene',
        'scene-to-basemap',
    ];
    if (!validSwipeSubModes.includes(selectedSubMode as SwipeSubMode)) {
        return null;
    }

    return {
        selectedSubMode: selectedSubMode as SwipeSubMode,
        // Default to `left` unless explicitly encoded as `right`.
        isBasemapOnRightSideOfSwipe: basemapPosition === 'right',
    };
};

export const saveSwipeSubModeToHashParams = (
    data: EncodedSwipeSubModeParams
) => {
    const encodedValue = encodeSwipeSubMode(data);
    updateHashParams('swipeSubMode', encodedValue);
};

export const getSwipeSubModeFromHashParams = (
    hashParams: URLSearchParams
): DecodedSwipeSubModeOutput => {
    const value = hashParams.get('swipeSubMode');
    return decodeSwipeSubMode(value);
};
