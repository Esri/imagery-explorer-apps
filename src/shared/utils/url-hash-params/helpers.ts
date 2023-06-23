import { QueryParams4ImageryScene } from '@shared/store/Landsat/reducer';

export const encodeQueryParams4ImageryScene = (
    data: QueryParams4ImageryScene
): string => {
    if (!data) {
        return null;
    }

    const { acquisitionDate, rasterFunctionName, objectIdOfSelectedScene } =
        data;

    return [acquisitionDate, rasterFunctionName, objectIdOfSelectedScene].join(
        '|'
    );
};

export const decodeQueryParams4ImageryScene = (
    val: string
): QueryParams4ImageryScene => {
    if (!val) {
        return null;
    }

    const [acquisitionDate, rasterFunctionName, objectId] = val.split('|');

    return {
        acquisitionDate,
        rasterFunctionName,
        objectIdOfSelectedScene: objectId ? +objectId : null,
        cloudCover: 0.5,
        animationFrameId: null,
    };
};
