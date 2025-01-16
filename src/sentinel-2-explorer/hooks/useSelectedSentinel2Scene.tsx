import { getSentinel2SceneByObjectId } from '@shared/services/sentinel-2/getSentinel2Scenes';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { Sentinel2Scene } from '@typing/imagery-service';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export const useSelectedSentinel2Scene = (): Sentinel2Scene => {
    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

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
