import React, { useMemo } from 'react';
import { format } from 'date-fns';
import {
    SceneInfoTable,
    SceneInfoTableData,
} from '@shared/components/SceneInfoTable';
import { useDataFromSelectedLandsatScene } from './useDataFromSelectedLandsatScene';
import { DATE_FORMAT } from '@shared/constants/UI';
import { useSelector } from 'react-redux';
import { selectAppMode } from '@shared/store/ImageryScene/selectors';

export const SceneInfoContainer = () => {
    const mode = useSelector(selectAppMode);

    const data = useDataFromSelectedLandsatScene();

    const tableData: SceneInfoTableData[] = useMemo(() => {
        if (!data) {
            return [];
        }

        const {
            satellite,
            row,
            path,
            acquisitionDate,
            sensor,
            formattedCloudCover,
            // collectionCategory,
            // collectionNumber,
            correctionLevel,
            // processingDate,
            name,
            sunAzimuth,
            sunElevation,
        } = data;

        return [
            // the produt id is too long to be displayed in one row,
            // therefore we need to split it into two separate rows
            {
                name: 'Scene ID',
                value: name.slice(0, 17),
            },
            {
                name: '',
                value: name.slice(17),
            },
            {
                name: 'Satellite',
                value: satellite,
            },
            {
                name: 'Sensor',
                value: sensor,
            },
            {
                name: 'Correction',
                value: correctionLevel,
            },
            {
                name: 'Path, Row',
                value: path.toString() + ', ' + row.toString(),
            },
            // {
            //     name: 'Row',
            //     value: row.toString(),
            // },
            {
                name: 'Acquired',
                value: format(acquisitionDate, DATE_FORMAT),
            },
            {
                name: 'Sun Elevation',
                value: sunElevation.toFixed(3),
            },
            {
                name: 'Sun Azimuth',
                value: sunAzimuth.toFixed(3),
            },
            {
                name: 'Cloud Cover',
                value: `${formattedCloudCover}%`,
            },
        ];
    }, [data]);

    if (mode === 'dynamic' || mode === 'analysis') {
        return null;
    }

    // if (!tableData || !tableData.length) {
    //     return null;
    // }

    return <SceneInfoTable data={tableData} />;
};
