/* Copyright 2025 Esri
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

import Graphic from '@arcgis/core/Graphic';
import { Point } from '@arcgis/core/geometry';
import IconImage from '@shared/statics/img/map-anchor.png';
import { SizeOfMapAnchorImage } from '@shared/constants/UI';

/**
 * Get a Graphic object that with the "picture-marker" symbol that uses
 * themed map anchor image
 * @param point
 * @returns
 */
export const getThemedMapPointGraphic = (point: Point) => {
    return new Graphic({
        geometry: {
            type: 'point',
            ...point,
        },
        symbol: {
            type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
            url: IconImage,
            width: SizeOfMapAnchorImage,
            height: SizeOfMapAnchorImage,
        } as any,
    });
};
