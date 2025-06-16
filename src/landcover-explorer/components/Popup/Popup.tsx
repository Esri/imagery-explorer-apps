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

// import './style.css';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import IMapView from '@arcgis/core/views/MapView';
import IPoint from '@arcgis/core/geometry/Point';
// import { LandcoverClassificationData } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
// import {
//     LandcoverClassificationsByYear,
// } from '@shared/services/sentinel-2-10m-landcover/identifyTask';
import { identify } from '../Sentinel2Layer/identify';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectIsSatelliteImageryLayerOutOfVisibleRange,
    selectMapMode,
    selectSatelliteImageryLayerAquisitionMonth,
    selectSatelliteImageryLayerRasterFunction,
    selectShouldShowSatelliteImageryLayer,
    // selectSwipePosition,
    selectYear,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
import { format } from 'date-fns';
import { selectSwipeWidgetHandlerPosition } from '@shared/store/Map/selectors';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';
import { DATE_FORMAT } from '@shared/constants/UI';
import {
    identifyLandcoverClassificationsByLocation,
    LandcoverClassificationDataByYear,
} from '@shared/services/helpers/getLandcoverClassificationsByLocation';
import { LandcoverClassificationData } from '@typing/landcover';

type Props = {
    /**
     * URL for the Land Cover Image Service.
     * This is used to perform the identify task.
     */
    landCoverServiceUrl: string;
    /**
     * The raster function to be used for the mosaic rule of the identify task.
     */
    rasterFunction: string;
    /**
     * Available years for which the land cover classification data can be retrieved.
     */
    years: number[];
    /**
     * The field in the Land Cover Image Service that contains the year of the imagery.
     */
    yearField: string;
    /**
     * Map stores Land Cover Classification Data using pixel value as the key.
     */
    classificationDataMap: Map<number, LandcoverClassificationData>;
    mapView?: IMapView;
};

type MapViewOnClickHandler = (mapPoint: IPoint, mousePointX: number) => void;

/**
 * Check and see if user clicked on the left side of the swipe widget
 * @param swipePosition position of the swipe handler, value should be bewteen 0 - 100
 * @param mapViewWidth width of the map view container
 * @param mouseX x position of the mouse click event
 * @returns boolean indicates if clicked on left side
 */
const didClickOnLeftSideOfSwipeWidget = (
    swipePosition: number,
    mapViewWidth: number,
    mouseX: number
) => {
    const wdithOfLeftHalf = mapViewWidth * (swipePosition / 100);
    return mouseX <= wdithOfLeftHalf;
};

const Popup: FC<Props> = ({
    landCoverServiceUrl,
    rasterFunction,
    years,
    yearField,
    classificationDataMap,
    mapView,
}: Props) => {
    const { t } = useTranslation();

    const isSatelliteImagertLayerOutOfVisibleRange = useAppSelector(
        selectIsSatelliteImageryLayerOutOfVisibleRange
    );

    const shouldShowSatelliteImageryLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    const satelliteImageryRasterFunction = useAppSelector(
        selectSatelliteImageryLayerRasterFunction
    );

    const aquisitionMonth = useAppSelector(
        selectSatelliteImageryLayerAquisitionMonth
    );

    const swipePosition = useAppSelector(selectSwipeWidgetHandlerPosition);

    const mode = useAppSelector(selectMapMode);

    const { year4LeadingLayer, year4TrailingLayer } = useAppSelector(
        selectYearsForSwipeWidgetLayers
    );

    const aquisitionYear = useAppSelector(selectYear);

    const mapViewOnClickHandlerRef = useRef<MapViewOnClickHandler>();

    const getLoadingIndicator = () => {
        const popupDiv = document.createElement('div');
        popupDiv.innerHTML = `<calcite-loader active scale="s"></calcite-loader>`;
        return popupDiv;
    };

    const getMainContent = (
        landCoverData: LandcoverClassificationDataByYear[],
        aquisitionYear: number,
        acquisitionDate?: number
    ) => {
        const popupDiv = document.createElement('div');

        const acquisitionDateFormatted = acquisitionDate
            ? format(acquisitionDate, DATE_FORMAT)
            : '';

        const htmlString4AcquisitionDate = acquisitionDateFormatted
            ? `
                <div class='mx-2 mt-4 pb-2 text-center'>
                    <span>${t('sentinel2_acquisition_date', {
                        ns: APP_NAME,
                        date: acquisitionDateFormatted, // Pass the formatted date dynamically for translation
                    })}</span>
                </div>
            `
            : '';

        const htmlString4LandCoverData: string = landCoverData
            ? landCoverData
                  .sort((a, b) => b.year - a.year)
                  .map((item) => {
                      const { year, data } = item;

                      const [R, G, B] = data.Color;

                      const backgroundColor = `rgb(${R}, ${G}, ${B})`;

                      const classNameTranslated = t(data.ClassName, {
                          ns: APP_NAME,
                          defaultValue: data.ClassName, // Fallback to the original ClassName if translation is not available
                      });

                      return `
                        <div class='flex my-2 items-center'>
                            <div class='rounded-full mr-2 bg-custom-light-blue-80 w-[6px] h-[6px] ${
                                year !== aquisitionYear ? 'opacity-0' : ''
                            }'></div>
                            <span>${year}</span>
                            <div class='rounded-full w-4 h-4 border-2 border-white mx-2' style="background-color:${backgroundColor};"></div>
                            <span>${classNameTranslated}</span>
                        </div>
                    `;
                  })
                  .join('')
            : '';

        const htmlString4LandCoverList = htmlString4LandCoverData
            ? `
                <div class='flex justify-center mt-2'>
                    <div>
                        ${htmlString4LandCoverData}
                    </div>
                </div>
            `
            : '';

        popupDiv.innerHTML = `
            <div class='text-custom-light-blue'>
                ${htmlString4AcquisitionDate}
                ${htmlString4LandCoverList}
            </div>
        `;

        return popupDiv;
    };

    mapViewOnClickHandlerRef.current = async (
        mapPoint: IPoint,
        mousePointX: number
    ) => {
        // no need to show pop-up for sentinel-2 imagery layer until imagery is visible
        if (
            shouldShowSatelliteImageryLayer &&
            isSatelliteImagertLayerOutOfVisibleRange === true
        ) {
            return;
        }

        const lat = Math.round(mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(mapPoint.longitude * 1000) / 1000;
        const title =
            `${t('latitude_abbreviation')} ${lat} ` +
            `${t('longitude_abbreviation')} ${lon}`;

        mapView.openPopup({
            title,
            location: mapPoint,
            content: getLoadingIndicator(),
        });

        const landCoverData =
            shouldShowSatelliteImageryLayer === false
                ? await identifyLandcoverClassificationsByLocation({
                      point: mapPoint,
                      landCoverServiceUrl,
                      rasterFunction,
                      years,
                      yearField,
                      classificationDataMap,
                  })
                : null;

        // acquisition date (in unix timestamp) of sentinel-2 imagery that is displayed on map
        let acquisitionDate: number = null;

        // acquisition year of the land cover/sentinel 2 imagery that is displayed on map
        let year = aquisitionYear;

        // when in swipe mode, we need to first check if user clicked on left or right side of the swipe widget,
        // then decide which acquisition year to use
        if (mode === 'swipe') {
            year = didClickOnLeftSideOfSwipeWidget(
                swipePosition,
                mapView.width,
                mousePointX
            )
                ? year4LeadingLayer
                : year4TrailingLayer;
        }

        if (
            shouldShowSatelliteImageryLayer &&
            !isSatelliteImagertLayerOutOfVisibleRange
        ) {
            const identifyTaskRes = await identify({
                geometry: mapPoint,
                resolution: mapView.resolution,
                rasterFunction: satelliteImageryRasterFunction,
                year,
                month: aquisitionMonth,
            });

            if (
                identifyTaskRes.catalogItems &&
                identifyTaskRes.catalogItems.features
            ) {
                acquisitionDate =
                    identifyTaskRes?.catalogItems?.features[0]?.attributes
                        .acquisitiondate;
            }
        }

        mapView.popup.open({
            // Set the popup's title to the coordinates of the location
            title,
            location: mapPoint, // Set the location of the popup to the clicked location
            content: getMainContent(landCoverData, year, acquisitionDate),
        });
    };

    const init = async () => {
        // It's necessary to overwrite the default click for the popup
        // behavior in order to display your own popup
        mapView.popupEnabled = false;
        mapView.popup.dockEnabled = false;
        mapView.popup.visibleElements = {
            collapseButton: false,
        };

        mapView.on('click', async (evt) => {
            mapViewOnClickHandlerRef.current(evt.mapPoint, evt.x);
        });
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (mapView) {
            mapView.closePopup();
        }
    }, [
        aquisitionYear,
        aquisitionMonth,
        shouldShowSatelliteImageryLayer,
        isSatelliteImagertLayerOutOfVisibleRange,
        swipePosition,
        year4LeadingLayer,
        year4TrailingLayer,
        mode,
    ]);

    return null;
};

export default Popup;
