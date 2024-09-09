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
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';

/**
 * This custom hook returns the data for the selected scene of a generic type.
 * @template T - The type of the scene data.
 * @param fetchSceneByObjectId - An async function to fetch the scene by object ID.
 * @returns {T | undefined}
 */
export const useDataFromSelectedImageryScene = <T,>(
    fetchSceneByObjectId: (objectId: number) => Promise<T>
) => {
    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const mode = useSelector(selectAppMode);

    const animationPlaying = useSelector(selectIsAnimationPlaying);

    const [selectedScene, setSelectedScene] = useState<T>();

    useEffect(() => {
        (async () => {
            if (
                !objectIdOfSelectedScene ||
                animationPlaying ||
                mode === 'analysis'
            ) {
                // return null;
                setSelectedScene(null);
                return;
            }

            try {
                const data = await fetchSceneByObjectId(
                    objectIdOfSelectedScene
                );

                setSelectedScene(data as T);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [objectIdOfSelectedScene, mode, animationPlaying, fetchSceneByObjectId]);

    return selectedScene;
};
