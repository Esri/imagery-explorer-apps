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

import {
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

/**
 * Custom hook to retrieve object IDs for change detection tool.
 *
 * This hook gets query parameters for the main and secondary scenes,
 * and then determines the object IDs of the selected scenes based on their acquisition dates.
 *
 * @returns An array containing the object ID of the selected scene
 */
export const useObjectIds4ChangeDetectionTool = (): number[] => {
    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useAppSelector(
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
