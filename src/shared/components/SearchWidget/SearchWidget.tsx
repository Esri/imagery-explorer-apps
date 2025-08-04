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

import React, { useRef } from 'react';

import MapView from '@arcgis/core/views/MapView';
import Extent from '@arcgis/core/geometry/Extent';
import Graphic from '@arcgis/core/Graphic';
import ArcGISSearchWidget from '@arcgis/core/widgets/Search';
import classNames from 'classnames';

type SearchResult = {
    extent: Extent;
    feature: Graphic;
    name: string;
    target: string;
};

type Props = {
    // containerId?: string;
    mapView?: MapView;
    hide?: boolean;
    searchCompletedHandler?: (result: SearchResult) => void;
};

const SearchWidget: React.FC<Props> = ({
    // containerId,
    mapView,
    hide,
    searchCompletedHandler,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const init = async () => {
        const searchWidget = new ArcGISSearchWidget({
            view: mapView,
            resultGraphicEnabled: false,
            popupEnabled: false,
            container: containerRef.current,
        });

        // mapView.ui.add(searchWidget, 'top-right');

        if (searchCompletedHandler) {
            searchWidget.on('search-complete', (evt) => {
                if (
                    searchWidget.results[0] &&
                    searchWidget?.results[0]?.results[0]
                ) {
                    const searchResult: SearchResult =
                        searchWidget.results[0].results[0];
                    // console.log(searchResultGeom);
                    searchCompletedHandler(searchResult);
                }
            });
        }
    };

    React.useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    return (
        <div
            className={classNames('relative w-full z-20 bg-custom-background', {
                'opacity-0': hide,
            })}
            ref={containerRef}
        ></div>
    );
};

export default SearchWidget;
