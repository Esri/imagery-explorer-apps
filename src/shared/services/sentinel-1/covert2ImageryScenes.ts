import { ImageryScene } from '@shared/store/ImageryScene/reducer';
import {
    Sentinel1OrbitDirection,
    Sentinel1Scene,
} from '@typing/imagery-service';

export const convert2ImageryScenes = (
    scenes: Sentinel1Scene[],
    userSelectedOrbitDirection: Sentinel1OrbitDirection
): ImageryScene[] => {
    // convert list of Landsat scenes to list of imagery scenes
    const imageryScenes: ImageryScene[] = scenes.map(
        (landsatScene: Sentinel1Scene) => {
            const {
                objectId,
                name,
                formattedAcquisitionDate,
                acquisitionDate,
                acquisitionYear,
                acquisitionMonth,
                orbitDirection,
            } = landsatScene;

            const doesNotMeetCriteria =
                userSelectedOrbitDirection !== orbitDirection;

            const imageryScene: ImageryScene = {
                objectId,
                sceneId: name,
                formattedAcquisitionDate,
                acquisitionDate,
                acquisitionYear,
                acquisitionMonth,
                cloudCover: 0,
                doesNotMeetCriteria,
                satellite: 'Sentinel-1',
            };

            return imageryScene;
        }
    );

    return imageryScenes;
};
