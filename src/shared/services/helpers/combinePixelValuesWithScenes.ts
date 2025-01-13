import { ImageryScene } from '@shared/store/ImageryScene/reducer';
import { PixelValuesData } from './getPixelValues';
import { TemporalProfileData } from '@typing/imagery-service';

/**
 * Create Temporal Profiles Data by combining pixel values data and imagery scene data
 * @param samples
 * @param scenes
 * @returns
 */
export const combinePixelValuesWithScenes = (
    pixelValues: PixelValuesData[],
    scenes: ImageryScene[]
): TemporalProfileData[] => {
    const output: TemporalProfileData[] = [];

    const sceneByObjectId = new Map<number, ImageryScene>();

    for (const scene of scenes) {
        sceneByObjectId.set(scene.objectId, scene);
    }

    for (let i = 0; i < pixelValues.length; i++) {
        const sampleData = pixelValues[i];
        const { objectId, values } = sampleData;

        if (sceneByObjectId.has(objectId) === false) {
            continue;
        }

        const {
            acquisitionDate,
            acquisitionMonth,
            acquisitionYear,
            formattedAcquisitionDate,
        } = sceneByObjectId.get(objectId);

        output.push({
            objectId,
            acquisitionDate,
            acquisitionMonth,
            acquisitionYear,
            formattedAcquisitionDate,
            values,
        });
    }

    return output;
};
