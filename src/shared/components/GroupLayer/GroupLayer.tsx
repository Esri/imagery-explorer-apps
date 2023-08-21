import React, { FC, useEffect, useState } from 'react';
import MapView from 'esri/views/MapView';
import IGroupLayer from 'esri/layers/GroupLayer';
import { loadModules } from 'esri-loader';

type Props = {
    index?: number;
    mapView?: MapView;
    /**
     * Children Elements that will receive Map View and Group  as prop
     */
    children?: React.ReactNode;
};

export const GroupLayerWrapper: FC<Props> = ({
    index,
    mapView,
    children,
}: Props) => {
    const [groupLayer, setGroupLayer] = useState<IGroupLayer>();

    const initGroupLayer = async () => {
        type Modules = [typeof IGroupLayer];

        const [GroupLayer] = await (loadModules([
            'esri/layers/GroupLayer',
        ]) as Promise<Modules>);

        const groupLayer = new GroupLayer();

        mapView.map.add(groupLayer, index);

        setGroupLayer(groupLayer);
    };

    useEffect(() => {
        if (!mapView) {
            return;
        }

        initGroupLayer();
    }, [mapView]);

    return (
        <>
            {groupLayer
                ? React.Children.map(children, (child) => {
                      return React.cloneElement(
                          child as React.ReactElement<any>,
                          {
                              mapView,
                              groupLayer,
                          }
                      );
                  })
                : null}
        </>
    );
};
