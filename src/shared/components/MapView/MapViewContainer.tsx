import classNames from 'classnames';
import React, { FC, useEffect } from 'react';
import MapView from './MapView';
import { WEB_MAP_ID } from '../../constants/map';
import { useSelector } from 'react-redux';
import {
    selectMapCenter,
    selectMapZoom,
    selectWebmapId,
} from '../../store/Map/selectors';
import { selectHideBottomPanel } from '../../store/UI/selectors';
import EventHandlers from './EventHandlers';
import { useDispatch } from 'react-redux';
import { batch } from 'react-redux';
import { centerChanged, zoomChanged } from '../../store/Map/reducer';
import { saveMapCenterToHashParams } from '../../utils/url-hash-params';

type Props = {
    children?: React.ReactNode;
};

const MapViewContainer: FC<Props> = ({ children }) => {
    const dispatch = useDispatch();

    const webmapId = useSelector(selectWebmapId);

    const center = useSelector(selectMapCenter);

    const zoom = useSelector(selectMapZoom);

    const shouldHideBottomPanel = useSelector(selectHideBottomPanel);

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
            <MapView webmapId={webmapId} center={center} zoom={zoom}>
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
                    onClick={(point) => {
                        console.log('clicked on map', point);
                    }}
                />
            </MapView>
        </div>
    );
};

export default MapViewContainer;
