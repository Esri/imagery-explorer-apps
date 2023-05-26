import React, { useMemo } from 'react';
import { format } from 'date-fns';
import {
    SceneInfoTable,
    SceneInfoTableData,
} from '@shared/components/SceneInfoTable';
import { useDataFromSelectedLandsatScene } from './useDataFromSelectedLandsatScene';

export const SceneInfoContainer = () => {
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
            collectionCategory,
            collectionNumber,
            correctionLevel,
            processingDate,
        } = data;

        return [
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
                name: 'Row',
                value: row.toString(),
            },
            {
                name: 'Path',
                value: path.toString(),
            },
            {
                name: 'Acquired',
                value: format(acquisitionDate, 'MMM dd, yyyy'),
            },
            {
                name: 'Processed',
                value: format(processingDate, 'MMM dd, yyyy'),
            },
            {
                name: 'Collection',
                value: collectionNumber,
            },
            {
                name: 'Category',
                value: collectionCategory,
            },
            {
                name: 'Cloud Cover',
                value: `${Math.floor(cloudCover * 100)}%`,
            },
        ];
    }, [data]);

    if (!tableData || !tableData.length) {
        return null;
    }

    return <SceneInfoTable data={tableData} />;
};
