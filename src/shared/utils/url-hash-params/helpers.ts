import { Point } from '@arcgis/core/geometry';

export const encodeQueryLocation = (point: Point): string => {
    if (!point) {
        return '';
    }

    const { x, y } = point;
    return [x.toFixed(5), y.toFixed(5)].join(',');
};

export const decodeQueryLocation = (val: string): Point => {
    const [x, y] = val.split(',').map((d) => +d);
    return {
        x,
        y,
        spatialReference: {
            wkid: 4326,
        },
    } as Point;
};
