import classNames from 'classnames';
import React, { FC } from 'react';
import MapView from './MapView';
import { WEB_MAP_ID } from '../../constants';

type Props = {
    children?: React.ReactNode;
};

const MapViewContainer: FC<Props> = ({ children }) => {
    return (
        <div className={classNames('absolute top-0 left-0 w-full bottom-0')}>
            <MapView webmapId={WEB_MAP_ID} center={[-92, 40]} zoom={9}>
                {children}
            </MapView>
        </div>
    );
};

export default MapViewContainer;
