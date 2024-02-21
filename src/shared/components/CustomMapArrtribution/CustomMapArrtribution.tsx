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

import './style.css';
import React, { FC } from 'react';

type Props = {
    /**
     * a custom attribution to display by default
     */
    atrribution: string;
};

/**
 * This component would hide the default esri attribution and display a custom attribution message instead.
 * When user hover over this component, the actual esri attribution will be displayed.
 * @param param0
 * @returns
 */
const CustomMapArrtribution: FC<Props> = ({ atrribution }) => {
    const toggleEsriAttribution = () => {
        const element = document.querySelector('.esri-attribution');
        element.classList.toggle('show');
    };

    return (
        <div
            className="absolute left-0 bottom-0 custom-attribution-text hover:opacity-0"
            onMouseEnter={toggleEsriAttribution}
            onMouseOut={toggleEsriAttribution}
        >
            <div className="pointer-events-none">
                <span>
                    Powered by Esri
                    {'  |  '}
                    {atrribution}
                </span>
            </div>
        </div>
    );
};

export default CustomMapArrtribution;
