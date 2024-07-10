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

import { RasterFunctionSelector } from '@shared/components/RasterFunctionSelector';
import React from 'react';
import { useSentinel1RasterFunctions } from './useSentinel1RasterFunctions';

const TOOLTIP_TEXT = `
<div class='text-left'>
<p class='mb-2'>Sentinel-1 SAR sensors send and receive radar pulses that echo off the Earth’s surface. The echoes returned to the sensor are known as radar backscatter. The amplitude (strength) of the backscatter varies depending on the characteristics of the surface at any given location, resulting in variable dark to bright pixels. Consider the following:</p>
<p>Smoother surfaces = Lower backscatter = Darker pixels</p>
<p>Rougher surfaces = Higher backscatter = Brighter pixels</p>
<p>Water bodies/wet soils = Lower backscatter = Darker pixels</p>
<p>Vertical objects = Higher backscatter = Brighter pixels</p>
<p>Thicker vegetation = Lower backscatter = Darker pixels</p>
<p class='mt-2'>NOTE: In some cases, multiple factors need to be considered simultaneously. For example, water bodies generally have greater signal reflectivity away from the sensor, resulting in lower backscatter and a darker appearance. However, a rough water surface will result in higher backscatter and appear brighter than a smooth water surface.</p>
</div>
`;

export const RasterFunctionSelectorContainer = () => {
    const data = useSentinel1RasterFunctions();

    return (
        <RasterFunctionSelector
            headerTooltip={TOOLTIP_TEXT}
            widthOfTooltipContainer={360}
            data={data}
        />
    );
};
