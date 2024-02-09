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

import {
    selectAvailableScenes,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * This custom hook returns the acquisition date of the selected scene to highlight it on the calendar.
 * @returns
 */
export const useAcquisitionDateFromSelectedScene = (): string => {
    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    // /**
    //  * user selected acquisition date
    //  */
    // const acquisitionDate = queryParams?.acquisitionDate;

    /**
     * List of available imagery scenes that intersect with map center and were acquired during the input year.
     */
    const availableScenes = useSelector(selectAvailableScenes);

    const selectedAcquisitionDate = useMemo(() => {
        // If the user has not selected a date or there are no available scenes for the query location,
        // then the selected acquisition date should be empty.
        if (!objectIdOfSelectedScene || !availableScenes.length) {
            return '';
        }

        // Find the scene from the available scenes list that has the acquisition date matching the user-selected acquisition date.
        const sceneAcquiredOnSelectedDate = availableScenes.find(
            (scene) => scene.objectId === objectIdOfSelectedScene
        );

        // Use the acquisition date of the scene that is found to highlight on the calendar.
        // If no scene is found in the available scenes list, the user-selected date
        // won't be returned so it does not get highlighted in the calendar,
        // indicating that they need to select another date to choose a scene.
        // If a scene is found, its acquisition date is returned for highlighting.
        return sceneAcquiredOnSelectedDate?.formattedAcquisitionDate;
    }, [objectIdOfSelectedScene, availableScenes]);

    return selectedAcquisitionDate;
};
