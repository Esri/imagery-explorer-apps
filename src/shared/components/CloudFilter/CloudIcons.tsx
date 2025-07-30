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

import { CalciteIcon } from '@esri/calcite-components-react';
import React from 'react';

export const CloudIcons = () => {
    return (
        <div className="relative h-cloud-slider-height ml-1">
            <div className="absolute top-[-6px]">
                {/* use online icon to indicate with cloud */}
                <CalciteIcon scale="s" icon="online" />
            </div>

            <div className="absolute bottom-[-12px]">
                {/* use offline icon to indicate non-cloud */}
                <CalciteIcon scale="s" icon="offline" />
            </div>
        </div>
    );
};
