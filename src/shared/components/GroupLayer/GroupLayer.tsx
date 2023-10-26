import React, { FC, useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import GroupLayer from '@arcgis/core/layers/GroupLayer';

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
    const [groupLayer, setGroupLayer] = useState<GroupLayer>();

    const initGroupLayer = async () => {
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
