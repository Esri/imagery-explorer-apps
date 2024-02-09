/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
