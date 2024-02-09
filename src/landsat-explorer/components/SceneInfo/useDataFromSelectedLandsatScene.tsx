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

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { selectAvailableScenesByObjectId } from '@shared/store/Landsat/selectors';
import { LandsatScene } from '@typing/imagery-service';
import {
    selectAnimationStatus,
    selectIsAnimationPlaying,
} from '@shared/store/UI/selectors';
import { getLandsatSceneByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';

// /**
//  * Save/cache Landsat scene data using the object ID as the key.
//  * Why is it necessary to do this? The reason is that the `availableScenesByObjectId` does not get updated during animation playback.
//  * As a result, it may not contain data for the Landsat scene associated with the animation frame. However, we still want to populate
//  * the scene information for each animation frame. Therefore, it is a good idea to retrieve the cached data from this map.
//  */
// const landsatSceneByObjectId: Map<number, LandsatScene> = new Map();

/**
 * This custom hook returns the data for the selected Landsat Scene.
 * @returns
 */
export const useDataFromSelectedLandsatScene = () => {
    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const availableScenesByObjectId = useSelector(
        selectAvailableScenesByObjectId
    );

    const mode = useSelector(selectAppMode);

    const animationPlaying = useSelector(selectIsAnimationPlaying);

    const [landsatScene, setLandsatScene] = useState<LandsatScene>();

    useEffect(() => {
        (async () => {
            if (
                !objectIdOfSelectedScene ||
                animationPlaying ||
                mode === 'analysis'
            ) {
                // return null;
                setLandsatScene(null);
                return;
            }

            try {
                const data =
                    availableScenesByObjectId[objectIdOfSelectedScene] ||
                    (await getLandsatSceneByObjectId(objectIdOfSelectedScene));

                setLandsatScene(data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [
        objectIdOfSelectedScene,
        availableScenesByObjectId,
        mode,
        animationPlaying,
    ]);

    return landsatScene;
};
