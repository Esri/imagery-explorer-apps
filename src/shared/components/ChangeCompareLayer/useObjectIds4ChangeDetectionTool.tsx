import {
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * Custom hook to retrieve object IDs for change detection tool.
 *
 * This hook gets query parameters for the main and secondary scenes,
 * and then determines the object IDs of the selected scenes based on their acquisition dates.
 *
 * @returns An array containing the object ID of the selected scene
 */
export const useObjectIds4ChangeDetectionTool = (): number[] => {
    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useSelector(
        selectQueryParams4SecondaryScene
    );

    const [
        objectIdOfSelectedSceneInEarlierDate,
        objectIdOfSelectedSceneInLater,
    ] = useMemo(() => {
        if (
            !queryParams4MainScene?.objectIdOfSelectedScene ||
            !queryParams4MainScene?.objectIdOfSelectedScene
        ) {
            return [];
        }

        // Sort query parameters by acquisition date in ascending order.
        const [
            queryParams4SceneAcquiredInEarlierDate,
            queryParams4SceneAcquiredInLaterDate,
        ] = [queryParams4MainScene, queryParams4SecondaryScene].sort((a, b) => {
            return (
                formattedDateString2Unixtimestamp(a.acquisitionDate) -
                formattedDateString2Unixtimestamp(b.acquisitionDate)
            );
        });

        return [
            queryParams4SceneAcquiredInEarlierDate.objectIdOfSelectedScene,
            queryParams4SceneAcquiredInLaterDate.objectIdOfSelectedScene,
        ];
    }, [queryParams4MainScene, queryParams4SecondaryScene]);

    return [
        objectIdOfSelectedSceneInEarlierDate,
        objectIdOfSelectedSceneInLater,
    ];
};
