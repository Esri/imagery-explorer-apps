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
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { Sentinel1Scene } from '@typing/imagery-service';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { useSceneIds } from '@shared/components/SavePanel/useSceneIds';

/**
 * This function shortens the Sentinel-1 scene ID.
 * The original scene ID is tool long to be used in the name of hosted imagery service.
 * @param sceneId
 * @returns
 */
const shortenSentinel1SceneId = (sceneId: string): string => {
    if (!sceneId) {
        return '';
    }

    const [
        satellite,
        acquisitionMode,
        processingLevel,
        polarization,
        acquisitionDateStart,
        acquisitionDateEnd,
        orbitNumber,
        missionId,
        uniqueId,
    ] = sceneId.split('_');

    const parts2Keep = [
        satellite,
        polarization,
        acquisitionDateStart,
        uniqueId,
    ].filter((part) => part !== undefined);

    return parts2Keep.join('_');
};

export const useSceneIdsFromSelectedSentinel1Scenes = (): string[] => {
    const sceneIds = useSceneIds({
        getSceneByObjectId: getSentinel1SceneByObjectId,
        shortenSceneId: shortenSentinel1SceneId,
    });

    // const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    // const queryParams4SecondaryScene = useAppSelector(
    //     selectQueryParams4SecondaryScene
    // );

    // const [sceneIds, setSceneIds] = useState<string[]>([]);

    // const mode = useAppSelector(selectAppMode);

    // const analyzeTool = useAppSelector(selectActiveAnalysisTool);

    // useEffect(() => {
    //     (async () => {
    //         const mainScene: Sentinel1Scene =
    //             queryParams4MainScene?.objectIdOfSelectedScene
    //                 ? await getSentinel1SceneByObjectId(
    //                       queryParams4MainScene?.objectIdOfSelectedScene
    //                   )
    //                 : null;

    //         const secondaryScene: Sentinel1Scene =
    //             queryParams4SecondaryScene?.objectIdOfSelectedScene
    //                 ? await getSentinel1SceneByObjectId(
    //                       queryParams4SecondaryScene?.objectIdOfSelectedScene
    //                   )
    //                 : null;

    //         let mainSceneId = mainScene?.name;
    //         let secondarySceneId = secondaryScene?.name;

    //         // Shorten the scene ID if the mode is 'analysis' and the analyze tool is 'change'.
    //         if (mode === 'analysis' && analyzeTool === 'change') {
    //             mainSceneId = shortenSentinel1SceneId(mainSceneId);
    //             secondarySceneId = shortenSentinel1SceneId(secondarySceneId);
    //         }

    //         // console.log('scene', scene);
    //         setSceneIds([mainSceneId, secondarySceneId]);
    //     })();
    // }, [
    //     queryParams4MainScene?.objectIdOfSelectedScene,
    //     queryParams4SecondaryScene?.objectIdOfSelectedScene,
    //     mode,
    //     analyzeTool,
    // ]);

    return sceneIds;
};
