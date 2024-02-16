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
import { useSelector } from 'react-redux';
import {
    selectTooltipData,
    selectTooltipXPosition,
} from '@shared/store/UI/selectors';
import Tooltip from './Tooltip';

const TooltipContainer = () => {
    const xPosition = useSelector(selectTooltipXPosition);

    const data = useSelector(selectTooltipData);

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
            <Tooltip data={data} />
        </div>
    );
};

export default TooltipContainer;
