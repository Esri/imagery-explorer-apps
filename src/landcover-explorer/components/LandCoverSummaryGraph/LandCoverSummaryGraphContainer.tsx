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

import React, { FC, useMemo } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
// import { MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM } from '@landcover-explorer/constants/map';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    // selectMapCenterAndZoom,
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
    selectYear,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
import { showInfoPanelToggled } from '@shared/store/LandcoverExplorer/reducer';
import ChangeCompareGraph from './ChangeCompareGraph/ChangeCompareGraphContainer';
import TotalAreaGraph from './TotalAreaGraph/TotalAreaGraphContainer';
import HeaderText from '../ControlPanel/HeaderText/HeaderText';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

type LandCoverGraphContainerProps = {
    /**
     * Flag to determine if the chart should be shown or not.
     * This is used to control the visibility of the chart based on various conditions.
     */
    showChart: boolean;
    /**
     * Flag to determine if the expand button should be shown or not.
     */
    shouldShowExpandButton: boolean;
    /**
     * Optional children to render inside the container.
     * This can be used to pass additional components or elements.
     */
    children: React.ReactNode;
    /**
     * The fixed width of the container. In pixels.
     */
    width?: number;
};

export const LandCoverGraphContainer: FC<LandCoverGraphContainerProps> = ({
    showChart,
    shouldShowExpandButton,
    width,
    children,
}) => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const mode = useAppSelector(selectMapMode);

    // const isSentinel2LayerOutOfVisibleRange = useAppSelector(
    //     selectIsSentinel2LayerOutOfVisibleRange
    // );

    // const shouldShowSentinel2Layer = useAppSelector(
    //     selectShouldShowSatelliteImageryLayer
    // );

    const animationMode = useAppSelector(selectAnimationStatus);

    // const isAnimationControlVisible =
    //     animationMode !== undefined && animationMode !== null;

    const { year4LeadingLayer, year4TrailingLayer } = useAppSelector(
        selectYearsForSwipeWidgetLayers
    );

    const year = useAppSelector(selectYear);

    const shouldShowChart = useMemo(() => {
        if (animationMode) {
            return false;
        }

        return showChart;
    }, [animationMode, showChart]);

    const getSubtitle = () => {
        if (mode === 'swipe') {
            // return `from ${year4LeadingLayer} to ${year4TrailingLayer}`;
            return t('from_to_year', {
                // ns: APP_NAME, // Use the namespace for translation
                fromYear: year4LeadingLayer, // Pass the leading year dynamically for translation,
                toYear: year4TrailingLayer, // Pass the trailing year dynamically for translation
            });
        }

        // return `at ${year}`;
        return t('at_year', {
            // ns: APP_NAME, // Use the namespace for translation
            year: year, // Pass the year dynamically for translation
        });
    };

    const containerStyle = useMemo(() => {
        if (width === undefined) {
            return undefined;
        }

        return {
            width: `${width}px`,
        };
    }, [width]);

    return (
        <div
            className={classNames(
                'text-center md:mx-6',
                'pb-8 md:pb-0', // in mobile view, we need to add some padding space at the bottom because this component is the last one in the bottom panel
                {
                    'w-full': width === undefined,
                    '2xl:w-96': width === undefined, // Default width for larger screens
                    // 'w-[470px]': wider === true, // Default width for wider prop
                    // '2xl:w-[470px]': wider === true, // Make the container wider if the wider prop is true
                }
            )}
            style={containerStyle}
        >
            <HeaderText
                title={`${
                    mode === 'swipe'
                        ? t('Land_Cover_Change')
                        : t('Land_Cover_Totals')
                }`}
                expandButtonTooltip={t('Expanded_Summary_Chart', {
                    // ns: APP_NAME,
                })} // Translate the tooltip for the expand button
                subTitle={getSubtitle()}
                expandButtonOnClick={
                    shouldShowExpandButton
                        ? () => {
                              dispatch(showInfoPanelToggled(true));
                          }
                        : undefined
                }
            />

            {shouldShowChart === false ? (
                <div className="w-full flex justify-center items-center text-sm opacity-50 mt-16">
                    {animationMode ? (
                        <p>
                            {' '}
                            {t('animation_graph_disabled_message', {
                                // ns: APP_NAME,
                            })}
                        </p>
                    ) : (
                        <p>
                            {mode === 'swipe'
                                ? t('zoom_to_see_change_graph', {
                                      //   ns: APP_NAME,
                                  })
                                : t('zoom_to_see_totals_graph', {
                                      //   ns: APP_NAME,
                                  })}
                        </p>
                    )}
                </div>
            ) : (
                <div className="w-full h-40">
                    {/* {mode === 'swipe' ? (
                        <ChangeCompareGraph />
                    ) : (
                        <TotalAreaGraph />
                    )} */}
                    {children}
                </div>
            )}
        </div>
    );
};

export default LandCoverGraphContainer;
