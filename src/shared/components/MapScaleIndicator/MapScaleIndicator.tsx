/* Copyright 2024-2026 Esri
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

import { useAppSelector } from '@shared/store/configureStore';
import {
    selectMapCenter,
    selectMapResolution,
    selectMapScale,
    selectMapZoom,
} from '@shared/store/Map/selectors';
import { calcActualResolution } from '@shared/utils/snippets/calcActualResolution';
import { numberWithCommas } from 'helper-toolkit-ts';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const MapScaleIndicator = () => {
    const { t } = useTranslation();

    // const mapCenterAndZoom = useAppSelector(selectMapCenterAndZoom);

    const mapCenter = useAppSelector(selectMapCenter);

    const zoomRaw = useAppSelector(selectMapZoom);

    const zoom = isNaN(zoomRaw) === false ? +zoomRaw.toFixed(0) : 0;

    const mapScale = useAppSelector(selectMapScale);

    const mapResolution = useAppSelector(selectMapResolution);

    const [lon, lat] = mapCenter || [null, null];

    const actualScale = useMemo(() => {
        if (mapScale === null || isNaN(mapScale) || mapCenter === null) {
            return null;
        }

        if (isNaN(lat)) {
            return null;
        }

        // get the latitude from the map center
        const latitude = lat;
        // This is the scale at the equator
        const nominalScale = mapScale;

        // Convert latitude to radians
        const latRadians = latitude * (Math.PI / 180);

        // Calculate the true scale denominator
        const trueScale = nominalScale * Math.cos(latRadians);

        return trueScale;
    }, [mapScale, lat]);

    const actualResolution = useMemo(() => {
        if (
            mapResolution === null ||
            isNaN(mapResolution) ||
            mapCenter === null
        ) {
            return null;
        }

        // get the latitude from the map center
        const latitude = lat;

        // // This is the resolution at the equator
        // const nominalResolution = mapResolution;

        // // Convert latitude to radians
        // const latRadians = latitude * (Math.PI / 180);

        // // Calculate the true resolution
        // const trueResolution = nominalResolution * Math.cos(latRadians);
        // return trueResolution;

        // // Constant: meters/pixel at the Equator for zoom level 0.
        // // Web Mercator uses a standard tile size of 256x256 pixels. At zoom level 0, the entire circumference of the Earth (roughly 40,075,016.686 meters) fits into one 256-pixel tile.
        // // This means the nominal resolution at zoom level 0 is about 156,543.04 meters/pixel.
        // const EQUATORIAL_RESOLUTION = 156543.04;

        // // Convert latitude to radians
        // const latRadians = latitude * (Math.PI / 180);

        // // Calculate the true resolution based on the zoom level and latitude
        // const trueResolution =
        //     (EQUATORIAL_RESOLUTION * Math.cos(latRadians)) /
        //     Math.pow(2, zoomLevel);

        return calcActualResolution(latitude, zoom);
    }, [mapResolution, lat, zoom]);

    const mapScaleFormatted = useMemo(() => {
        if (actualScale === null || isNaN(actualScale)) {
            return null;
        }
        return numberWithCommas(+actualScale.toFixed(0));
    }, [actualScale]);

    const mapResolutionFormatted = useMemo(() => {
        if (actualResolution === null || isNaN(actualResolution)) {
            return null;
        }

        if (actualResolution >= 1) {
            return numberWithCommas(+actualResolution.toFixed(0));
        }

        return numberWithCommas(+actualResolution.toFixed(2));
    }, [actualResolution]);

    if (mapScaleFormatted === null || mapResolutionFormatted === null) {
        return null;
    }

    return (
        <span>
            1:{mapScaleFormatted} | {t('zoom_level', { level: zoom })} | 1px:{' '}
            {mapResolutionFormatted}m
        </span>
    );
};
