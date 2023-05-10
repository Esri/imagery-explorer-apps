import classNames from 'classnames';
import React, { FC } from 'react';
import MapView from './MapView';
import { WEB_MAP_ID } from '../../constants';
import { useSelector } from 'react-redux';
import {
    selectMapCenter,
    selectMapZoom,
    selectWebmapId,
} from '../../store/Map/selectors';
import { selectHideBottomPanel } from '../../store/UI/selectors';

type Props = {
    children?: React.ReactNode;
};

const MapViewContainer: FC<Props> = ({ children }) => {
    const webmapId = useSelector(selectWebmapId);

    const center = useSelector(selectMapCenter);

    const zoom = useSelector(selectMapZoom);

    const shouldHideBottomPanel = useSelector(selectHideBottomPanel);

    return (
        <div
            className={classNames('absolute top-0 left-0 w-full', {
                'bottom-0': shouldHideBottomPanel === true,
                'bottom-bottom-panel-height': shouldHideBottomPanel === false,
            })}
        >
            <MapView webmapId={webmapId} center={center} zoom={zoom}>
                {children}
            </MapView>
        </div>
    );
};

export default MapViewContainer;
