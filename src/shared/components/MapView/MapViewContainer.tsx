import classNames from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import MapView from './MapView';
// import { WEB_MAP_ID } from '../../constants/map';
import { useSelector } from 'react-redux';
import {
    selectMapCenter,
    selectMapPopupAnchorLocation,
    selectMapZoom,
    selectSwipeWidgetHandlerPosition,
    selectWebmapId,
} from '../../store/Map/selectors';
import {
    selectAnimationStatus,
    selectHideBottomPanel,
} from '../../store/UI/selectors';
import EventHandlers from './EventHandlers';
import { useDispatch } from 'react-redux';
import { batch } from 'react-redux';
import { centerChanged, zoomChanged } from '../../store/Map/reducer';
import { saveMapCenterToHashParams } from '../../utils/url-hash-params';
import { MapLoadingIndicator } from './MapLoadingIndicator';
// import { queryLocation4TrendToolChanged } from '@shared/store/TrendTool/reducer';
import { updateQueryLocation4TrendTool } from '@shared/store/TrendTool/thunks';
import { Point } from 'esri/geometry';
import { ReferenceLayersToggleControl } from '../ReferenceLayersToggleControl';
import ReferenceLayers from './ReferenceLayers';
import SearchWidget from './SearchWidget';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectIsSwipeModeOn,
} from '@shared/store/Landsat/selectors';
// import { selectActiveAnalysisTool } from '@shared/store/Analysis/selectors';
import { MapCenterIndicator } from './MapCenterIndicator';
import { updateQueryLocation4SpectralProfileTool } from '@shared/store/SpectralProfileTool/thunks';

type Props = {
    children?: React.ReactNode;
};

const MapViewContainer: FC<Props> = ({ children }) => {
    const dispatch = useDispatch();

    const webmapId = useSelector(selectWebmapId);

    const center = useSelector(selectMapCenter);

    const zoom = useSelector(selectMapZoom);

    const shouldHideBottomPanel = useSelector(selectHideBottomPanel);

    const animationStatus = useSelector(selectAnimationStatus);

    const isSwipeWidgetVisible = useSelector(selectIsSwipeModeOn);

    const swipeWidgetHandlerPosition = useSelector(
        selectSwipeWidgetHandlerPosition
    );

    const [isUpdating, setIsUpdating] = useState<boolean>(true);

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const anchorLocation = useSelector(selectMapPopupAnchorLocation);

    const showMagnifier = useMemo(() => {
        if (mode !== 'analysis') {
            return false;
        }

        return analysisTool === 'trend' || analysisTool === 'spectral';
    }, [analysisTool, mode]);

    useEffect(() => {
        // console.log('map view zoom and center has changed', center, zoom);
        saveMapCenterToHashParams(center, zoom);
    }, [zoom, center]);

    return (
        <div
            className={classNames('absolute top-0 left-0 w-full', {
                'bottom-0': shouldHideBottomPanel === true,
                'bottom-bottom-panel-height': shouldHideBottomPanel === false,
            })}
        >
            <MapView
                webmapId={webmapId}
                center={center}
                zoom={zoom}
                showMagnifier={showMagnifier}
            >
                {children}

                <EventHandlers
                    onStationary={(center, zoom, extent) => {
                        // console.log('map view is stationary', center, zoom, extent);

                        batch(() => {
                            dispatch(
                                centerChanged([
                                    center.longitude,
                                    center.latitude,
                                ])
                            );
                            dispatch(zoomChanged(zoom));
                        });
                    }}
                    onClickHandler={(point) => {
                        // console.log('clicked on map', point);
                        const { latitude, longitude } = point;

                        const queryLocation = {
                            x: +longitude,
                            y: +latitude,
                            spatialReference: {
                                wkid: 4326,
                            },
                        } as Point;

                        dispatch(updateQueryLocation4TrendTool(queryLocation));

                        dispatch(
                            updateQueryLocation4SpectralProfileTool(
                                queryLocation
                            )
                        );
                    }}
                    mapViewUpdatingOnChange={setIsUpdating}
                />

                <MapLoadingIndicator
                    active={isUpdating}
                    swipeWidgetHandlerPosition={
                        isSwipeWidgetVisible ? swipeWidgetHandlerPosition : null
                    }
                />

                <MapCenterIndicator
                    shouldShow={
                        mode === 'find a scene' && anchorLocation === null
                    }
                />

                <SearchWidget hide={animationStatus !== null} />

                <ReferenceLayers />
            </MapView>

            <ReferenceLayersToggleControl
                shoudHide={animationStatus !== null}
            />
        </div>
    );
};

export default MapViewContainer;
