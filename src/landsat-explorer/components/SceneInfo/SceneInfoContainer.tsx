import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAvailableScenesByObjectId,
    selectQueryParams4SceneInSelectedMode,
} from '../../../shared/store/Landsat/selectors';
import { LandsatScene } from '../../services/landsat-2/getLandsatScenes';
import { format } from 'date-fns';
import {
    SceneInfoTable,
    SceneInfoTableData,
} from '../../../shared/components/SceneInfoTable';

export const SceneInfoContainer = () => {
    const queryParams4SelectedScene = useSelector(
        selectQueryParams4SceneInSelectedMode
    );

    const availableScenesByObjectId = useSelector(
        selectAvailableScenesByObjectId
    );

    const data = availableScenesByObjectId[
        queryParams4SelectedScene?.objectIdOfSelectedScene
    ] as LandsatScene;

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
