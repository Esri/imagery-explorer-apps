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
    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const [sceneIds, setSceneIds] = useState<string[]>([]);

    const mode = useAppSelector(selectAppMode);

    const analyzeTool = useAppSelector(selectActiveAnalysisTool);

    useEffect(() => {
        (async () => {
            const mainScene: Sentinel1Scene =
                queryParams4MainScene?.objectIdOfSelectedScene
                    ? await getSentinel1SceneByObjectId(
                          queryParams4MainScene?.objectIdOfSelectedScene
                      )
                    : null;

            const secondaryScene: Sentinel1Scene =
                queryParams4SecondaryScene?.objectIdOfSelectedScene
                    ? await getSentinel1SceneByObjectId(
                          queryParams4SecondaryScene?.objectIdOfSelectedScene
                      )
                    : null;

            let mainSceneId = mainScene?.name;
            let secondarySceneId = secondaryScene?.name;

            // Shorten the scene ID if the mode is 'analysis' and the analyze tool is 'change'.
            if (mode === 'analysis' && analyzeTool === 'change') {
                mainSceneId = shortenSentinel1SceneId(mainSceneId);
                secondarySceneId = shortenSentinel1SceneId(secondarySceneId);
            }

            // console.log('scene', scene);
            setSceneIds([mainSceneId, secondarySceneId]);
        })();
    }, [
        queryParams4MainScene?.objectIdOfSelectedScene,
        queryParams4SecondaryScene?.objectIdOfSelectedScene,
        mode,
        analyzeTool,
    ]);

    return sceneIds;
};
