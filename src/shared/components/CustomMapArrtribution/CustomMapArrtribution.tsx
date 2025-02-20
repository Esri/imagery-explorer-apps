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

import { useAppSelector } from '@shared/store/configureStore';
import './style.css';
import React, { FC, useEffect, useState } from 'react';
import {
    selectMapResolution,
    selectMapScale,
} from '@shared/store/Map/selectors';
import { numberWithCommas } from 'helper-toolkit-ts';
import classNames from 'classnames';

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
    const mapScale = useAppSelector(selectMapScale);
    const resolution = useAppSelector(selectMapResolution);

    const [shouldShowEsriAttribution, setShouldShowEsriAttribution] =
        useState<boolean>(false);

    // const toggleEsriAttribution = () => {
    //     const element = document.querySelector('.esri-attribution');
    //     element.classList.toggle('show');
    // };

    useEffect(() => {
        const element = document.querySelector('.esri-attribution');
        element.classList.toggle('show', shouldShowEsriAttribution);
    }, [shouldShowEsriAttribution]);

    return (
        <div
            className={classNames(
                'absolute left-0 bottom-0 w-full flex justify-between',
                {
                    'opacity-0': shouldShowEsriAttribution,
                }
            )}
        >
            <div
                className="custom-attribution-text"
                onMouseEnter={setShouldShowEsriAttribution.bind(null, true)}
                onMouseOut={setShouldShowEsriAttribution.bind(null, false)}
            >
                <div className="pointer-events-none">
                    <span>
                        Powered by Esri
                        {'  |  '}
                        {atrribution}
                    </span>
                </div>
            </div>

            {mapScale !== null && resolution !== null && (
                <div className="hidden md:block custom-attribution-text">
                    <div className="pointer-events-none pr-10">
                        <span>
                            1:{numberWithCommas(+mapScale.toFixed(0))} | 1px:{' '}
                            {numberWithCommas(+resolution.toFixed(0))}m
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomMapArrtribution;
