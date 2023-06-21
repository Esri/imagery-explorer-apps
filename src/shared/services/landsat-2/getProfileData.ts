import { Point } from 'esri/geometry';
import { getLandsatScenes } from './getLandsatScenes';

type GetProfileDataOptions = {
    queryLocation: {
        longitude: number;
        latitude: number;
    };
    acquisitionMonth: number;
};

export const getProfileData = async ({
    queryLocation,
    acquisitionMonth,
}: GetProfileDataOptions) => {
    const { longitude, latitude } = queryLocation;

    try {
        const landsatScenes = await getLandsatScenes({
            mapPoint: [longitude, latitude],
            acquisitionMonth,
        });

        console.log(landsatScenes);
    } catch (err) {
        console.log(err);
    }
};
