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
    const containerRef = useRef<HTMLDivElement>();

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
            className={classNames(
                'absolute top-search-widget-top-position-mobile md:top-search-widget-top-position w-search-widget-width',
                {
                    'opacity-0': hide,
                }
            )}
            ref={containerRef}
            style={{
                // top: 50,
                right: 15,
            }}
        ></div>
    );
};

export default SearchWidget;
