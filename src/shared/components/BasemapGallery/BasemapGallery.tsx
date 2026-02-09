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

import React, { useRef, useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import classNames from 'classnames';

type Props = {
    mapView?: MapView;
    hide?: boolean;
};

const BasemapGalleryWidget: React.FC<Props> = ({ mapView, hide }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetRef = useRef<BasemapGallery | null>(null);

    useEffect(() => {
        if (!mapView || !containerRef.current) {
            return;
        }

        // Create the BasemapGallery widget
        widgetRef.current = new BasemapGallery({
            view: mapView,
            container: containerRef.current,
        });

        return () => {
            // Cleanup
            if (widgetRef.current) {
                widgetRef.current.destroy();
                widgetRef.current = null;
            }
        };
    }, [mapView]);

    return (
        <div
            className={classNames('relative bg-custom-background', {
                hidden: hide,
            })}
            ref={containerRef}
        ></div>
    );
};

export default BasemapGalleryWidget;
