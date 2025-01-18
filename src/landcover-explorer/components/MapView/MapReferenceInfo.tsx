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

import classNames from 'classnames';
import React, { useEffect, FC } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    // selectMapMode,
    selectShouldShowSentinel2Layer,
    // selectSwipePosition,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
import { selectShowSwipeWidgetYearIndicator } from '@shared/store/LandcoverExplorer/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import { selectSwipeWidgetHandlerPosition } from '@shared/store/Map/selectors';

type Props = {
    /**
     * If true, map view is in process of update (e.g. fetch layer data, render layer)
     */
    isUpdating: boolean;
    /**
     * Indicate if swipe widget is currently visible
     */
    isSwipeWidgetVisible: boolean;
};

const MessageClassNames =
    'p-2 bg-custom-background-85 text-custom-light-blue uppercase text-sm';

const Sentinel2LoadingIndicator = () => {
    return (
        <div>
            <calcite-loader active scale="m"></calcite-loader>
            {/* <div className={MessageClassNames}>Loading Sentinel-2 Imagery</div> */}
        </div>
    );
};

/**
 * Indicators that remind user different information related to the map:
 * - If sentinel-2 layer is loading
 * - If sentinel-2 layer is out of visible zoom levels
 * - selected year on both sides of the swipe widget
 */
const MapInfoIndicators: FC<Props> = ({
    isUpdating,
    isSwipeWidgetVisible,
}: Props) => {
    const position = useAppSelector(selectSwipeWidgetHandlerPosition);

    const animationMode = useAppSelector(selectAnimationStatus);

    const isSentinel2LayerOutOfVisibleRange = useAppSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const showSwipeWidgetYearIndicator = useAppSelector(
        selectShowSwipeWidgetYearIndicator
    );

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSentinel2Layer
    );

    const { year4LeadingLayer, year4TrailingLayer } = useAppSelector(
        selectYearsForSwipeWidgetLayers
    );

    if (animationMode) {
        return null;
    }

    return (
        <div
            className={classNames(
                'absolute top-0 bottom-0 left-0 w-full z-10 pointer-events-none'
            )}
        >
            <div
                className="absolute top-0 bottom-0 left-0 flex items-center justify-center"
                style={{
                    width:
                        isSwipeWidgetVisible === false
                            ? '100%'
                            : `${position}%`,
                }}
            >
                {isUpdating &&
                    shouldShowSentinel2Layer &&
                    isSentinel2LayerOutOfVisibleRange === false && (
                        <Sentinel2LoadingIndicator />
                    )}

                {shouldShowSentinel2Layer &&
                    isSentinel2LayerOutOfVisibleRange && (
                        <div className={MessageClassNames}>
                            Zoom in to enable Sentinel-2 Imagery
                        </div>
                    )}

                {showSwipeWidgetYearIndicator && (
                    <div
                        className="absolute bottom-0 theme-background text-custom-light-blue text-sm py-1 px-2"
                        style={{
                            right: 7,
                            bottom: 20,
                        }}
                    >
                        {year4LeadingLayer}
                    </div>
                )}
            </div>

            <div
                className={classNames(
                    'absolute top-0 bottom-0 right-0 flex items-center justify-center',
                    {
                        hidden: isSwipeWidgetVisible === false,
                    }
                )}
                style={{
                    width: `${100 - position}%`,
                }}
            >
                {showSwipeWidgetYearIndicator && (
                    <div
                        className="absolute bottom-0 theme-background text-custom-light-blue text-sm py-1 px-2"
                        style={{
                            left: 2,
                            bottom: 20,
                        }}
                    >
                        {year4TrailingLayer}
                    </div>
                )}

                {isUpdating && shouldShowSentinel2Layer && (
                    <Sentinel2LoadingIndicator />
                )}
            </div>
        </div>
    );
};

export default MapInfoIndicators;
