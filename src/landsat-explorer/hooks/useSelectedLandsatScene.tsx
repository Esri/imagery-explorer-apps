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
