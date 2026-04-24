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

import classNames from 'classnames';
import React, { FC, useEffect } from 'react';
import MapView from './MapView';
// import { WEB_MAP_ID } from '../../constants/map';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectMapCenter,
    selectMapPopupAnchorLocation,
    selectMapZoom,
    selectSwipeWidgetHandlerPosition,
} from '../../store/Map/selectors';
import {
    selectAnimationStatus,
    selectHideBottomPanel,
    selectIsAnimationPlaying,
} from '../../store/UI/selectors';
import EventHandlers from './EventHandlers';
import { useAppDispatch } from '@shared/store/configureStore';
import {
    centerChanged,
    // extentUpdated,
    isUpdatingChanged,
    resolutionUpdated,
    scaleUpdated,
    // swipeWidgetHanlderPositionChanged,
    zoomChanged,
} from '../../store/Map/reducer';
// import { saveMapCenterToHashParams } from '../../utils/url-hash-params';
import { MapLoadingIndicator } from './MapLoadingIndicator';
// import { queryLocation4TrendToolChanged } from '@shared/store/TrendTool/reducer';
// import { updateQueryLocation4TrendTool } from '@shared/store/TrendTool/thunks';
import Point from '@arcgis/core/geometry/Point';
import { ReferenceLayersControl } from '../ReferenceLayersControl';
import ReferenceLayers from './ReferenceLayers';
// import SearchWidget from '../SearchWidget/SearchWidget';
import {
    // selectActiveAnalysisTool,
    selectAppMode,
    selectIsSwipeModeOn,
} from '@shared/store/ImageryScene/selectors';
// import { selectActiveAnalysisTool } from '@shared/store/Analysis/selectors';
import { MapCenterIndicator } from './MapCenterIndicator';
// import { updateQueryLocation4SpectralProfileTool } from '@shared/store/SpectralProfileTool/thunks';
// import { appConfig } from '@shared/config';
// import { ZoomWidget } from './ZoomWidget';
import { autoSwipeStatusChanged } from '@shared/store/Map/reducer';
import { WEB_MAP_ID } from '@shared/constants/map';
import { AnimationStartButtonOnMapContainer } from '../AnimationStartButtonOnMap/AnimationStartButtonOnMapContainer';

type Props = {
    /**
     * emits when user click on the map
     * @param point map point where the user has clicked
     * @returns
     */
    mapOnClick?: (point: Point) => void;
    children?: React.ReactNode;
};

const MapViewContainer: FC<Props> = ({ mapOnClick, children }) => {
    const dispatch = useAppDispatch();

    const center = useAppSelector(selectMapCenter) as [number, number];

    const zoom = useAppSelector(selectMapZoom);

    const shouldHideBottomPanel = useAppSelector(selectHideBottomPanel);

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const isSwipeWidgetVisible = useAppSelector(selectIsSwipeModeOn);

    const swipeWidgetHandlerPosition = useAppSelector(
        selectSwipeWidgetHandlerPosition
    );

    const mode = useAppSelector(selectAppMode);

    // const analysisTool = useAppSelector(selectActiveAnalysisTool);

    const anchorLocation = useAppSelector(selectMapPopupAnchorLocation);

    useEffect(() => {
        // adding this class will hide map zoom widget when animation mode is on
        document.body.classList.toggle('hide-map-control', isAnimationPlaying);
    }, [isAnimationPlaying]);

    useEffect(() => {
        // turn off auto swipe when app mode is not swipe
        // this is to prevent auto swipe from running when swipe mode is not active
        if (mode !== 'swipe') {
            dispatch(autoSwipeStatusChanged(null));
        }
    }, [mode]);

    return (
        <div
            className={classNames(
                'absolute top-app-header-size md:top-0 left-0 w-full',
                {
                    'bottom-0': shouldHideBottomPanel === true,
                    'bottom-bottom-panel-height':
                        shouldHideBottomPanel === false,
                }
            )}
            style={
                {
                    '--calcite-color-foreground-1': 'var(--custom-background)',
                    '--calcite-color-foreground-2': 'var(--custom-background)',
                    '--calcite-color-foreground-3': 'var(--custom-background)',
                    '--calcite-color-foreground-4': 'var(--custom-background)',

                    '--calcite-color-text-1': 'var(--custom-light-blue)',
                    '--calcite-color-text-2': 'var(--custom-light-blue)',
                    '--calcite-color-text-3': 'var(--custom-light-blue)',

                    '--calcite-color-border-3': 'var(--custom-light-blue-50)',
                } as React.CSSProperties
            }
        >
            <MapView
                webmapId={WEB_MAP_ID}
                center={center}
                zoom={zoom}
                shouldDisableMapNavigate={isAnimationPlaying}
            >
                {children}

                <EventHandlers
                    onStationary={(center, zoom, extent, resolution, scale) => {
                        // console.log('map view is stationary', center, zoom, extent);
                        dispatch(
                            centerChanged([center.longitude, center.latitude])
                        );
                        dispatch(zoomChanged(zoom));
                        dispatch(resolutionUpdated(resolution));
                        dispatch(scaleUpdated(scale));
                    }}
                    onClickHandler={(point) => {
                        // console.log('clicked on map', point);
                        const { latitude, longitude } = point;

                        const queryLocation = {
                            x: +longitude,
                            y: +latitude,
                            longitude,
                            latitude,
                            spatialReference: {
                                wkid: 4326,
                            },
                        } as Point;

                        if (mapOnClick) {
                            mapOnClick(queryLocation);
                        }
                    }}
                    mapViewUpdatingOnChange={(val) =>
                        dispatch(isUpdatingChanged(val))
                    }
                />

                <MapLoadingIndicator
                    swipeWidgetHandlerPosition={
                        isSwipeWidgetVisible ? swipeWidgetHandlerPosition : null
                    }
                />

                <MapCenterIndicator
                    shouldShow={
                        mode === 'find a scene' && anchorLocation === null
                    }
                />

                {/* <SearchWidget hide={isAnimationPlaying} /> */}

                <ReferenceLayers />

                {/* <ZoomWidget /> */}
            </MapView>

            <ReferenceLayersControl shoudHide={isAnimationPlaying} />

            <AnimationStartButtonOnMapContainer />
        </div>
    );
};

export default MapViewContainer;
