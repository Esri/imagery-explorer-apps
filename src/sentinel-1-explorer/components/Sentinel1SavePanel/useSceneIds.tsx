import { getSentinel1SceneByObjectId } from '@shared/services/sentinel-1/getSentinel1Scenes';
import {
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { Sentinel1Scene } from '@typing/imagery-service';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export const useSceneIdsFromSelectedSentinel1Scenes = (): string[] => {
    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const [sceneIds, setSceneIds] = useState<string[]>([]);

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

            // console.log('scene', scene);
            setSceneIds(
                [mainScene?.name, secondaryScene?.name].filter(Boolean)
            );
        })();
    }, [
        queryParams4MainScene?.objectIdOfSelectedScene,
        queryParams4SecondaryScene?.objectIdOfSelectedScene,
    ]);

    return sceneIds;
};
