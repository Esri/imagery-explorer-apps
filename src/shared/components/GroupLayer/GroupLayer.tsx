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
