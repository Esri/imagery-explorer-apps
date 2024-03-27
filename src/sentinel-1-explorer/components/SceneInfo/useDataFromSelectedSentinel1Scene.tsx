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
import { Sentinel1Scene } from '@typing/imagery-service';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { getSentinel1SceneByObjectId } from '@shared/services/sentinel-1/getSentinel1Scenes';

/**
 * This custom hook returns the data for the selected Sentinel-1 Scene.
 * @returns
 */
export const useDataFromSelectedSentinel1Scene = () => {
    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const mode = useSelector(selectAppMode);

    const animationPlaying = useSelector(selectIsAnimationPlaying);

    const [sentinel1Scene, setSentinel1Scene] = useState<Sentinel1Scene>();

    useEffect(() => {
        (async () => {
            if (
                !objectIdOfSelectedScene ||
                animationPlaying ||
                mode === 'analysis'
            ) {
                // return null;
                setSentinel1Scene(null);
                return;
            }

            try {
                const data = await getSentinel1SceneByObjectId(
                    objectIdOfSelectedScene
                );
                setSentinel1Scene(data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [objectIdOfSelectedScene, mode, animationPlaying]);

    return sentinel1Scene;
};
