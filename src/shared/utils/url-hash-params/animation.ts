import { Extent } from '@arcgis/core/geometry';
import { getHashParamValueByKey, updateHashParams } from '.';
import { getNormalizedExtent } from '../snippets/getNormalizedExtent';

/**
 * Save animation window info to hash params whenever the animation is being played.
 */
export const saveAnimationWindowInfoToHashParams = (
    extent?: Extent,
    width?: number,
    height?: number
) => {
    if (!extent || !width || !height) {
        updateHashParams('animationWindow', null);

        return;
    }

    const { xmin, ymin, xmax, ymax } = getNormalizedExtent(extent);

    updateHashParams(
        'animationWindow',
        [xmin, ymin, xmax, ymax, width, height].join(',')
    );
};

export const getAnimationWindowInfoFromHashParams = () => {
    const val = getHashParamValueByKey('animationWindow');

    if (!val) {
        return null;
    }

    const [xmin, ymin, xmax, ymax, width, height] = val
        .split(',')
        .map((v) => +v);

    return {
        extent: {
            xmin,
            ymin,
            xmax,
            ymax,
        },
        width,
        height,
    };
};

/**
 * Save animation speed to hash params whenever the animation is being played.
 * The app would restore the animation if it sees the animation speed in the hash params
 * @param animationSpeed
 */
export const saveAnimationSpeedToHashParams = (animationSpeed?: number) => {
    updateHashParams(
        'animation',
        animationSpeed ? animationSpeed.toFixed(0).toString() : null
    );
};

export const getAnimationSpeedFromHashParams = () => {
    const val = getHashParamValueByKey('animation');
    return val ? +val : null;
};
