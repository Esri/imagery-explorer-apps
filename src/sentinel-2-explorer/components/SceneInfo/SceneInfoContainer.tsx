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

import React, { useCallback, useMemo } from 'react';
import {
    SceneInfoTable,
    SceneInfoTableData,
} from '@shared/components/SceneInfoTable';
import { DATE_FORMAT } from '@shared/constants/UI';
import { useAppSelector } from '@shared/store/configureStore';
import { selectAppMode } from '@shared/store/ImageryScene/selectors';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import { Sentinel2Scene } from '@typing/imagery-service';
import { getSentinel2SceneByObjectId } from '@shared/services/sentinel-2/getSentinel2Scenes';
import { useDataFromSelectedImageryScene } from '@shared/components/SceneInfoTable/useDataFromSelectedScene';
import { useTranslation } from 'react-i18next';

export const SceneInfoContainer = () => {
    const { t } = useTranslation();

    const mode = useAppSelector(selectAppMode);

    const fetchSceneByObjectId = useCallback(async (objectId: number) => {
        const res = await getSentinel2SceneByObjectId(objectId);
        return res;
    }, []);

    const data =
        useDataFromSelectedImageryScene<Sentinel2Scene>(fetchSceneByObjectId);

    const tableData: SceneInfoTableData[] = useMemo(() => {
        if (!data) {
            return [];
        }

        const {
            acquisitionDate,
            formattedCloudCover,
            name,
            satellite,
            sensor,
            snowIcePercentage,
            productName,
            relativeOrbit,
            sunElevation,
            sunAzimuth,
        } = data;

        return [
            {
                name: t('scene_id'), //'Scene ID',
                value: name, //name.slice(0, 17),
                clickToCopy: true,
            },
            {
                // name: 'Satellite',
                name: t('satellite'),
                value: satellite,
            },
            {
                // name: 'Sensor',
                name: t('sensor'),
                value: sensor,
            },

            {
                // name: 'Acquired',
                name: t('acquired'),
                value: formatInUTCTimeZone(acquisitionDate, DATE_FORMAT),
            },
            {
                // name: 'Cloud Cover',
                name: t('cloud_cover'),
                value: `${formattedCloudCover}%`,
            },
            {
                // name: 'Snow/Ice',
                name: t('snow_ice'),
                value: `${snowIcePercentage}%`,
            },
            {
                // name: 'Product Name',
                name: t('product_name'),
                value: productName,
            },
            {
                // name: 'Relative Orbit',
                name: t('relative_orbit'),
                value: relativeOrbit,
            },
            {
                // name: 'Sun Elevation',
                name: t('sun_elevation'),
                value: `${sunElevation}°`,
            },
            {
                // name: 'Sun Azimuth',
                name: t('sun_azimuth'),
                value: `${sunAzimuth}°`,
            },
        ];
    }, [data]);

    if (mode === 'dynamic' || mode === 'analysis') {
        return null;
    }

    return <SceneInfoTable data={tableData} />;
};
