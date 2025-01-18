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
