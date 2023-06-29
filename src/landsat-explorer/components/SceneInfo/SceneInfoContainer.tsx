import React, { useMemo } from 'react';
import { format } from 'date-fns';
import {
    SceneInfoTable,
    SceneInfoTableData,
} from '@shared/components/SceneInfoTable';
import { useDataFromSelectedLandsatScene } from './useDataFromSelectedLandsatScene';
import { DATE_FORMAT } from '@shared/constants/UI';
import { useSelector } from 'react-redux';
import { selectAppMode } from '@shared/store/Landsat/selectors';

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
            cloudCover,
            // collectionCategory,
            // collectionNumber,
            correctionLevel,
            // processingDate,
            productId,
            sunAzimuth,
            sunElevation,
        } = data;

        return [
            // {
            //     name: 'Scene ID',
            //     value: productId,
            // },
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
                name: 'Path',
                value: path.toString(),
            },
            {
                name: 'Row',
                value: row.toString(),
            },
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
                value: `${Math.floor(cloudCover * 100)}%`,
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
