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

import { Slider } from '@shared/components/Slider';
import { maskLayerOpacityChanged } from '@shared/store/MaskTool/reducer';
import { selectMaskLayerOpcity } from '@shared/store/MaskTool/selectors';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { useAppDispatch } from '@shared/store/configureStore';

export const MaskLayerOpacityControl = () => {
    const dispatch = useAppDispatch();

    /**
     * opacity of the mask layer
     */
    const opacity = useAppSelector(selectMaskLayerOpcity);

    return (
        <div className="flex items-center calcite-mode-dark">
            <div className="flex items-center">
                <span className="text-xs mr-4 max-w-[90px] leading-none">
                    Opacity
                </span>
            </div>

            <div className={classNames('flex-grow pr-4')}>
                <Slider
                    value={opacity}
                    onChange={(val) => {
                        dispatch(maskLayerOpacityChanged(val));
                    }}
                />
            </div>
        </div>
    );
};
