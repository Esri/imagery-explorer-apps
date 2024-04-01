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

export const RasterFunctionSelectorContainer = () => {
    const data = useSentinel1RasterFunctions();

    return (
        <RasterFunctionSelector
            headerTooltip={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis nibh lacus, eleifend tincidunt sapien vestibulum a. Duis lacinia ante mollis mauris ornare, ut semper tortor interdum. Phasellus venenatis sit amet sem ornare semper.'
            }
            data={data}
        />
    );
};
