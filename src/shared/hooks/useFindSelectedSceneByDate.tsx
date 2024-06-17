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

import React, { useEffect } from 'react';
import { useSelector, batch } from 'react-redux';
import {
    selectAvailableScenes,
    selectQueryParams4SceneInSelectedMode,
    selectShouldForceSceneReselection,
} from '@shared/store/ImageryScene/selectors';
import { useDispatch } from 'react-redux';
import { updateObjectIdOfSelectedScene } from '@shared/store/ImageryScene/thunks';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { shouldForceSceneReselectionUpdated } from '@shared/store/ImageryScene/reducer';

/**
 * This custom hooks tries to find the selected scene that was acquired from the selected acquisition date
 * whenever the available scenes and acquisition date changes
 */
export const useFindSelectedSceneByDate = (): void => {
    const dispatch = useDispatch();

    const { acquisitionDate, objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    /**
     * available imagery scenes that intersect with input map geometry and were acquired during the input year.
     */
    const availableScenes = useSelector(selectAvailableScenes);

    const shouldForceSceneReselection = useSelector(
        selectShouldForceSceneReselection
    );

    useEffect(() => {
        // It is unnecessary to update the object ID of the selected scene while the animation is playing.
        // This is because the available scenes associated with each animation frame do not get updated during animation playback.
        // Moreover, when the animation is playing, the map center or acquisition date cannot be changed.
        // Therefore, the object ID of the Landsat scene for each animation frame remains fixed, eliminating the need for updating it.
        if (isAnimationPlaying) {
            return;
        }

        // Remove the object Id of selected scene when user removes the selected acquisition date
        if (!acquisitionDate) {
            dispatch(updateObjectIdOfSelectedScene(null));
            return;
        }

        // We want to maintain the selected imagery scene as locked as long as the `shouldForceSceneReselection` flag is set to false,
        // in other words, once a scene is chosen, it will remain locked until the user explicitly removes the
        // selected date from the calendar or removes the object Id of the selected scene.
        if (objectIdOfSelectedScene && shouldForceSceneReselection === false) {
            return;
        }

        // we should try to find a scene that was acquired from the selected acquisition date
        // whenever the available scenes and acquisition date changes
        const selectedScene = availableScenes.find(
            (d) => d.formattedAcquisitionDate === acquisitionDate
        );

        batch(() => {
            dispatch(
                updateObjectIdOfSelectedScene(selectedScene?.objectId || null)
            );

            dispatch(shouldForceSceneReselectionUpdated(false));
        });
    }, [availableScenes, acquisitionDate, objectIdOfSelectedScene]);
};
