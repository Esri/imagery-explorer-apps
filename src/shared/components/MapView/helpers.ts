import Graphic from '@arcgis/core/Graphic';
import { Point } from '@arcgis/core/geometry';
import IconImage from '@shared/statics/img/map-anchor.png';
import { SizeOfMapAnchorImage } from '@shared/constants/UI';

/**
 * Get a Graphic object that with the "picture-marker" symbol that uses
 * themed map anchor image
 * @param point
 * @returns
 */
export const getThemedMapPointGraphic = (point: Point) => {
    return new Graphic({
        geometry: {
            type: 'point',
            ...point,
        },
        symbol: {
            type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
            url: IconImage,
            width: SizeOfMapAnchorImage,
            height: SizeOfMapAnchorImage,
        } as any,
    });
};
