import { SavePanel } from '@shared/components/SavePanel';
import { LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { getLandsatSceneByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { LandsatScene } from '@typing/imagery-service';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const LandsatSceneSavePanel = () => {
    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

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

    return (
        <SavePanel
            imageryServiceURL={LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL}
            sceneId={landsatScene?.name}
        />
    );
};
