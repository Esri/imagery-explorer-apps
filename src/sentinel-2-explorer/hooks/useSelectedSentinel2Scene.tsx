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

import { getSentinel2SceneByObjectId } from '@shared/services/sentinel-2/getSentinel2Scenes';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { Sentinel2Scene } from '@typing/imagery-service';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export const useSelectedSentinel2Scene = (): Sentinel2Scene => {
    const { objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const [sentinel2Scene, setSentinel2Scene] = useState<Sentinel2Scene>(null);

    useEffect(() => {
        (async () => {
            const scene: Sentinel2Scene = objectIdOfSelectedScene
                ? await getSentinel2SceneByObjectId(objectIdOfSelectedScene)
                : null;

            // console.log('scene', scene);
            setSentinel2Scene(scene);
        })();
    }, [objectIdOfSelectedScene]);

    return sentinel2Scene;
};
