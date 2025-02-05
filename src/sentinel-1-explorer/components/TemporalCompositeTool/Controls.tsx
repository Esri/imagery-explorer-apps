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

import { Button } from '@shared/components/Button';
import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import React, { FC } from 'react';

type Props = {
    isTemporalCompositeLayerOn: boolean;
    /**
     * data to populate the Dropdown Menu for list of raster functions
     */
    rasterFunctionsDropdownData: DropdownData[];
    /**
     * Emits when user selects a new raster function in dropdown list
     * @param val
     * @returns
     */
    rasterFunctionOnChange: (val: string) => void;
    /**
     * Emits when user clicks on the "Clear Selected Scenes" button
     * @returns void
     */
    clearSelectedScenesButtonOnClick: () => void;
};

export const TemproalCompositeToolControls: FC<Props> = ({
    isTemporalCompositeLayerOn,
    rasterFunctionsDropdownData,
    rasterFunctionOnChange,
    clearSelectedScenesButtonOnClick,
}) => {
    return (
        <div>
            <div className="mt-2 w-full text-center">
                <p className="text-xs opacity-50">
                    {isTemporalCompositeLayerOn === false
                        ? 'Select scenes to apply to the Red, Green, and Blue color bands to create a composite RGB image, a hue-based change detection.'
                        : 'The composite image blends the three Red, Green, and Blue input scenes into a composite RGB image. The resulting colors communicate the varied reflectance across dates.'}
                </p>
            </div>

            <div className="flex justify-right w-full mt-4">
                <div className="mr-2 text-right flex-grow">
                    <span className="text-xs">Render composite as:</span>
                </div>

                <Dropdown
                    data={rasterFunctionsDropdownData}
                    skipUppercase={true}
                    onChange={rasterFunctionOnChange}
                />
            </div>

            <div className="text-right mt-4">
                <div
                    className="inline-block cursor-pointer bg-custom-light-blue-5 border border-custom-light-blue-25 px-2"
                    onClick={clearSelectedScenesButtonOnClick}
                >
                    <span className="text-xs">Clear all scene selections</span>
                </div>
            </div>
        </div>
    );
};
