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

import { getLandsatSceneByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { LandsatScene } from '@typing/imagery-service';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export const useSelectedLandsatScene = (): LandsatScene => {
    const { objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const [landsatScene, setLandsatScene] = useState<LandsatScene>(null);

    useEffect(() => {
        (async () => {
            const scene: LandsatScene = objectIdOfSelectedScene
                ? await getLandsatSceneByObjectId(objectIdOfSelectedScene)
                : null;

            // console.log('scene', scene);
            setLandsatScene(scene);
        })();
    }, [objectIdOfSelectedScene]);

    return landsatScene;
};
