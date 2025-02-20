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

// import React, { useEffect, useState, useRef } from 'react';

// import ArcGISMapView from '@arcgis/core/views/MapView';
// import WebMap from '@arcgis/core/WebMap';
// import TileInfo from '@arcgis/core/layers/support/TileInfo';
// import classNames from 'classnames';
// import '@shared/components/MapView/CustomMapViewStyle.css';

// interface Props {
//     /**
//      * ArcGIS Online Item Id
//      */
//     webmapId: string;
//     /**
//      * Coordinate pair `[longitude, latitude]` that represent the default center of the map view
//      */
//     center?: number[];
//     /**
//      * deafult zoom level
//      */
//     zoom?: number;
//     /**
//      * Children Elements that will receive Map View as prop
//      */
//     children?: React.ReactNode;
// }

// const MapView: React.FC<Props> = ({
//     webmapId,
//     center,
//     zoom,
//     children,
// }: Props) => {
//     const mapDivRef = useRef<HTMLDivElement>();

//     const [mapView, setMapView] = useState<ArcGISMapView>(null);

//     const mapViewRef = useRef<ArcGISMapView>();

//     const initMapView = async () => {
//         try {
//             mapViewRef.current = new ArcGISMapView({
//                 container: mapDivRef.current,
//                 center,
//                 zoom,
//                 map: new WebMap({
//                     portalItem: {
//                         id: webmapId,
//                     },
//                 }),
//                 constraints: {
//                     lods: TileInfo.create().lods,
//                 },
//             });

//             mapViewRef.current.when(() => {
//                 setMapView(mapViewRef.current);
//             });
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const updateWebmap = async () => {
//         try {
//             mapView.map = new WebMap({
//                 portalItem: {
//                     id: webmapId,
//                 },
//             });
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         // loadCss();
//         initMapView();

//         return () => {
//             mapViewRef.current.destroy();
//         };
//     }, []);

//     useEffect(() => {
//         if (mapView) {
//             updateWebmap();
//         }
//     }, [webmapId]);

//     return (
//         <>
//             <div
//                 className={classNames('absolute top-0 left-0 w-full bottom-0')}
//                 ref={mapDivRef}
//             ></div>
//             {mapView
//                 ? React.Children.map(children, (child) => {
//                       return React.cloneElement(
//                           child as React.ReactElement<any>,
//                           {
//                               mapView,
//                           }
//                       );
//                   })
//                 : null}
//         </>
//     );
// };

// export default MapView;
