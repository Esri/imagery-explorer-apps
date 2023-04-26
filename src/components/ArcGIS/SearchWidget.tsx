import React from 'react';

import { loadModules } from 'esri-loader';
import IMapView from 'esri/views/MapView';
import IExtent from 'esri/geometry/Extent';
import IGraphic from 'esri/Graphic';
import ISearchWidget from 'esri/widgets/Search';

import { UIAddPosition } from './types';

type SearchResult = {
    extent: IExtent;
    feature: IGraphic;
    name: string;
    target: string;
};

type Props = {
    position?: UIAddPosition;
    containerId?: string;
    mapView?: IMapView;
    searchCompletedHandler?: (result: SearchResult) => void;
};

const SearchWidget: React.FC<Props> = ({
    position,
    containerId,
    mapView,
    searchCompletedHandler,
}: Props) => {
    const init = async () => {
        if (!position && !containerId) {
            return;
        }

        type Modules = [typeof ISearchWidget];

        try {
            const [Search] = await (loadModules([
                'esri/widgets/Search',
            ]) as Promise<Modules>);

            const searchWidget = new Search({
                view: mapView,
                resultGraphicEnabled: false,
                popupEnabled: false,
                container: containerId,
            });

            if (position && !containerId) {
                mapView.ui.add(searchWidget, {
                    position,
                    index: 2,
                });
            }

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
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    return null;
};

export default SearchWidget;
