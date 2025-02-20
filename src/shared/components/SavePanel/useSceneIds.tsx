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

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';

interface UseGenericSceneIdsArgs {
    /**
     * This function should return the scene data by the object ID.
     * @param objectId
     * @returns Object with the scene name.
     */
    getSceneByObjectId: (objectId: number) => Promise<{ name: string } | null>;
    /**
     * This function should shorten the scene ID.
     * @param sceneId scene ID to shorten.
     * @returns shortened scene ID.
     */
    shortenSceneId?: (sceneId: string) => string;
}

/**
 * This hook returns the scene IDs for the main and secondary scenes.
 * @param getSceneByObjectId This function should return the scene data by the object ID.
 * @param shortenSceneId This function should shorten the scene ID.
 * @returns Array with the main and secondary scene IDs.
 */
export const useSceneIds = ({
    getSceneByObjectId,
    shortenSceneId,
}: UseGenericSceneIdsArgs): string[] => {
    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);
    const queryParams4SecondaryScene = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const [sceneIds, setSceneIds] = useState<string[]>([]);

    const mode = useAppSelector(selectAppMode);
    const analyzeTool = useAppSelector(selectActiveAnalysisTool);

    useEffect(() => {
        (async () => {
            const mainScene = queryParams4MainScene?.objectIdOfSelectedScene
                ? await getSceneByObjectId(
                      queryParams4MainScene.objectIdOfSelectedScene
                  )
                : null;

            const secondaryScene =
                queryParams4SecondaryScene?.objectIdOfSelectedScene
                    ? await getSceneByObjectId(
                          queryParams4SecondaryScene.objectIdOfSelectedScene
                      )
                    : null;

            let mainSceneId = mainScene?.name || '';
            let secondarySceneId = secondaryScene?.name || '';

            if (
                mode === 'analysis' &&
                analyzeTool === 'change' &&
                shortenSceneId
            ) {
                mainSceneId = shortenSceneId(mainSceneId);
                secondarySceneId = shortenSceneId(secondarySceneId);
            }

            setSceneIds([mainSceneId, secondarySceneId]);
        })();
    }, [
        queryParams4MainScene?.objectIdOfSelectedScene,
        queryParams4SecondaryScene?.objectIdOfSelectedScene,
        mode,
        analyzeTool,
        getSceneByObjectId,
        shortenSceneId,
    ]);

    return sceneIds;
};
