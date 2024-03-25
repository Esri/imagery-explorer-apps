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

import React, { useMemo } from 'react';
import {
    SceneInfoTable,
    SceneInfoTableData,
} from '@shared/components/SceneInfoTable';
// import { useDataFromSelectedLandsatScene } from './useDataFromSelectedLandsatScene';
import { DATE_FORMAT } from '@shared/constants/UI';
import { useSelector } from 'react-redux';
import { selectAppMode } from '@shared/store/ImageryScene/selectors';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';

export const SceneInfoContainer = () => {
    const mode = useSelector(selectAppMode);

    // const data = useDataFromSelectedLandsatScene();

    // const tableData: SceneInfoTableData[] = useMemo(() => {
    //     if (!data) {
    //         return [];
    //     }

    //     const {
    //         satellite,
    //         row,
    //         path,
    //         acquisitionDate,
    //         sensor,
    //         formattedCloudCover,
    //         // collectionCategory,
    //         // collectionNumber,
    //         correctionLevel,
    //         // processingDate,
    //         name,
    //         sunAzimuth,
    //         sunElevation,
    //     } = data;

    //     return [
    //         // the produt id is too long to be displayed in one row,
    //         // therefore we need to split it into two separate rows
    //         {
    //             name: 'Scene ID',
    //             value: name.slice(0, 17),
    //         },
    //         {
    //             name: '',
    //             value: name.slice(17),
    //         },
    //         {
    //             name: 'Satellite',
    //             value: satellite,
    //         },
    //         {
    //             name: 'Sensor',
    //             value: sensor,
    //         },
    //         {
    //             name: 'Correction',
    //             value: correctionLevel,
    //         },
    //         {
    //             name: 'Path, Row',
    //             value: path.toString() + ', ' + row.toString(),
    //         },
    //         // {
    //         //     name: 'Row',
    //         //     value: row.toString(),
    //         // },
    //         {
    //             name: 'Acquired',
    //             value: formatInUTCTimeZone(acquisitionDate, DATE_FORMAT),
    //         },
    //         {
    //             name: 'Sun Elevation',
    //             value: sunElevation.toFixed(3),
    //         },
    //         {
    //             name: 'Sun Azimuth',
    //             value: sunAzimuth.toFixed(3),
    //         },
    //         {
    //             name: 'Cloud Cover',
    //             value: `${formattedCloudCover}%`,
    //         },
    //     ];
    // }, [data]);

    if (mode === 'dynamic' || mode === 'analysis') {
        return null;
    }

    // if (!tableData || !tableData.length) {
    //     return null;
    // }

    return <SceneInfoTable data={[]} />;
};
