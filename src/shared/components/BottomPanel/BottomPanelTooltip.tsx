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

import React from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectTooltipData,
    selectTooltipXPosition,
} from '@shared/store/UI/selectors';
export const BottomPanelTooltip = () => {
    const xPosition = useAppSelector(selectTooltipXPosition);

    const data = useAppSelector(selectTooltipData);

    if (!data || !xPosition) {
        return null;
    }

    return (
        <div
            className="absolute bottom-bottom-panel-height pb-1 z-10"
            style={{
                left: xPosition,
            }}
        >
            <div className=" bg-custom-background-90 text-custom-light-blue-90 text-sm p-2 max-w-xs">
                {data.title && <h4 className="text-sm mb-1">{data.title}</h4>}
                <p className="text-xs mb-2">{data.content}</p>
                {data.legendImage && (
                    <img src={data.legendImage} className="w-full h-auto" />
                )}
            </div>
        </div>
    );
};
