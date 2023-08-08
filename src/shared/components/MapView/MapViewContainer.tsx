import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import MapView from './MapView';
import { WEB_MAP_ID } from '../../constants/map';
import { useSelector } from 'react-redux';
import {
    selectMapCenter,
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
import { queryLocation4ProfileToolChanged } from '@shared/store/Analysis/reducer';
import { updateQueryLocation4ProfileMask } from '@shared/store/Analysis/thunks';
import { Point } from 'esri/geometry';
import { ReferenceLayersToggleControl } from '../ReferenceLayersToggleControl';
import ReferenceLayers from './ReferenceLayers';
import SearchWidget from './SearchWidget';
import {
    selectAppMode,
    selectIsSwipeModeOn,
} from '@shared/store/Landsat/selectors';
import { selectActiveAnalysisTool } from '@shared/store/Analysis/selectors';

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

    const showMagnifier = mode === 'analysis' && analysisTool === 'profile';

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
                            x: +longitude.toFixed(3),
                            y: +latitude.toFixed(3),
                            spatialReference: {
                                wkid: 4326,
                            },
                        } as Point;

                        dispatch(
                            updateQueryLocation4ProfileMask(queryLocation)
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
