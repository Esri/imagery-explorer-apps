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

import { getSentinel1SceneByObjectId } from '@shared/services/sentinel-1/getSentinel1Scenes';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { Sentinel1Scene } from '@typing/imagery-service';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export const useSelectedSentinel1Scene = (): Sentinel1Scene => {
    const { objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const [sentinel1Scene, setSentinel1Scene] = useState<Sentinel1Scene>(null);

    useEffect(() => {
        (async () => {
            const scene: Sentinel1Scene = objectIdOfSelectedScene
                ? await getSentinel1SceneByObjectId(objectIdOfSelectedScene)
                : null;

            // console.log('scene', scene);
            setSentinel1Scene(scene);
        })();
    }, [objectIdOfSelectedScene]);

    return sentinel1Scene;
};
