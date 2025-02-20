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

import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useRef } from 'react';
import Zoom from '@arcgis/core/widgets/Zoom.js';

type Props = {
    mapView?: MapView;
};

export const ZoomWidget: FC<Props> = ({ mapView }) => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapView) return;

        const zoomWidget = new Zoom({
            view: mapView,
            // layout: 'horizontal',
            container: container.current,
        });

        // mapView.ui.add(zoomWidget, 'top-right');

        // return () => {
        //     mapView.ui.remove(zoomWidget)
        // }
    }, [mapView]);

    return <div className="mt-[1px]" ref={container}></div>;
};
