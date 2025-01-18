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
import React, { FC, useEffect, useMemo, useState } from 'react';
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
import { batch } from 'react-redux';
import {
    centerChanged,
    extentUpdated,
    isUpdatingChanged,
    resolutionUpdated,
    scaleUpdated,
    zoomChanged,
} from '../../store/Map/reducer';
import { saveMapCenterToHashParams } from '../../utils/url-hash-params';
import { MapLoadingIndicator } from './MapLoadingIndicator';
// import { queryLocation4TrendToolChanged } from '@shared/store/TrendTool/reducer';
// import { updateQueryLocation4TrendTool } from '@shared/store/TrendTool/thunks';
import { Point } from '@arcgis/core/geometry';
import { ReferenceLayersToggleControl } from '../ReferenceLayersToggleControl';
import ReferenceLayers from './ReferenceLayers';
// import SearchWidget from '../SearchWidget/SearchWidget';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectIsSwipeModeOn,
} from '@shared/store/ImageryScene/selectors';
// import { selectActiveAnalysisTool } from '@shared/store/Analysis/selectors';
import { MapCenterIndicator } from './MapCenterIndicator';
// import { updateQueryLocation4SpectralProfileTool } from '@shared/store/SpectralProfileTool/thunks';
import { appConfig } from '@shared/config';
import { ZoomWidget } from './ZoomWidget';

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

    const center = useAppSelector(selectMapCenter);

    const zoom = useAppSelector(selectMapZoom);

    const shouldHideBottomPanel = useAppSelector(selectHideBottomPanel);

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const isSwipeWidgetVisible = useAppSelector(selectIsSwipeModeOn);

    const swipeWidgetHandlerPosition = useAppSelector(
        selectSwipeWidgetHandlerPosition
    );

    const [isUpdating, setIsUpdating] = useState<boolean>(true);

    const mode = useAppSelector(selectAppMode);

    // const analysisTool = useAppSelector(selectActiveAnalysisTool);

    const anchorLocation = useAppSelector(selectMapPopupAnchorLocation);

    // const showMagnifier = useMemo(() => {
    //     if (mode !== 'analysis') {
    //         return false;
    //     }

    //     return analysisTool === 'trend' || analysisTool === 'spectral';
    // }, [analysisTool, mode]);

    const showMapLoadingIndicator = useMemo(() => {
        if (isAnimationPlaying) {
            return false;
        }

        return isUpdating;
    }, [isUpdating, isAnimationPlaying]);

    useEffect(() => {
        // console.log('map view zoom and center has changed', center, zoom);
        saveMapCenterToHashParams(center, zoom);
    }, [zoom, center]);

    useEffect(() => {
        // adding this class will hide map zoom widget when animation mode is on
        document.body.classList.toggle('hide-map-control', isAnimationPlaying);
    }, [isAnimationPlaying]);

    useEffect(() => {
        dispatch(isUpdatingChanged(isUpdating));
    }, [isUpdating]);

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
        >
            <MapView webmapId={appConfig.webmapId} center={center} zoom={zoom}>
                {children}

                <EventHandlers
                    onStationary={(center, zoom, extent, resolution, scale) => {
                        // console.log('map view is stationary', center, zoom, extent);

                        batch(() => {
                            dispatch(
                                centerChanged([
                                    center.longitude,
                                    center.latitude,
                                ])
                            );
                            dispatch(zoomChanged(zoom));
                            dispatch(resolutionUpdated(resolution));
                            dispatch(scaleUpdated(scale));
                            // dispatch(extentUpdated(extent.toJSON()));
                        });
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
                    mapViewUpdatingOnChange={setIsUpdating}
                />

                <MapLoadingIndicator
                    active={showMapLoadingIndicator}
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

            <ReferenceLayersToggleControl shoudHide={isAnimationPlaying} />
        </div>
    );
};

export default MapViewContainer;
