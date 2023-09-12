import {
    TrendToolOption,
    TrendToolState,
    initialTrendToolState,
} from '@shared/store/TrendTool/reducer';
import { SpectralIndex } from '@typing/imagery-service';
import { QueryParams4ImageryScene } from '@shared/store/Landsat/reducer';
import { Point } from 'esri/geometry';
import { getCurrentYear } from '../date-time/getCurrentDateTime';
import {
    MaskToolState,
    initialMaskToolState,
} from '@shared/store/MaskTool/reducer';

export const decodeMapCenter = (value: string) => {
    if (!value) {
        return null;
    }

    const [longitude, latitude, zoom] = value.split(',');

    if (!longitude || !latitude || !zoom) {
        return null;
    }

    return {
        center: [+longitude, +latitude],
        zoom: +zoom,
    };
};

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
        // cloudCover: 0.5,
        animationFrameId: null,
    };
};

export const encodeMaskToolData = (data: MaskToolState): string => {
    if (!data) {
        return null;
    }

    const {
        spectralIndex,
        shouldClipMaskLayer,
        maskLayerOpacity,
        maskOptionsBySpectralIndex,
    } = data;

    const maskOptions = maskOptionsBySpectralIndex[spectralIndex];

    return [
        spectralIndex,
        shouldClipMaskLayer,
        maskLayerOpacity,
        maskOptions?.color,
        maskOptions?.selectedRange,
    ].join('|');
};

export const decodeMaskToolData = (val: string): MaskToolState => {
    if (!val) {
        return null;
    }

    const [
        spectralIndex,
        shouldClipMaskLayer,
        maskLayerOpacity,
        color,
        selectedRange,
    ] = val.split('|');

    const maskOptionForSelectedSpectralIndex =
        color && selectedRange
            ? {
                  color: color.split(',').map((d) => +d),
                  selectedRange: selectedRange.split(',').map((d) => +d),
              }
            : initialMaskToolState.maskOptionsBySpectralIndex[spectralIndex];

    return {
        spectralIndex: spectralIndex as SpectralIndex,
        shouldClipMaskLayer: shouldClipMaskLayer === 'true',
        maskLayerOpacity: +maskLayerOpacity,
        maskOptionsBySpectralIndex: {
            ...initialMaskToolState.maskOptionsBySpectralIndex,
            [spectralIndex]: maskOptionForSelectedSpectralIndex,
        },
    };
};

export const encodeProfileToolQueryLocation = (point: Point): string => {
    if (!point) {
        return '';
    }

    const { x, y } = point;
    return [x.toFixed(5), y.toFixed(5)].join(',');
};

export const decodeProfileToolQueryLocation = (val: string): Point => {
    const [x, y] = val.split(',').map((d) => +d);
    return {
        x,
        y,
        spatialReference: {
            wkid: 4326,
        },
    } as Point;
};

export const encodeTemporalProfileToolData = (data: TrendToolState): string => {
    if (!data) {
        return null;
    }

    const {
        spectralIndex,
        acquisitionMonth,
        queryLocation,
        acquisitionYear,
        option,
    } = data;

    if (!queryLocation) {
        return null;
    }

    return [
        spectralIndex,
        acquisitionMonth,
        // samplingTemporalResolution,
        encodeProfileToolQueryLocation(queryLocation),
        acquisitionYear,
        option,
    ].join('|');
};

export const decodeTemporalProfileToolData = (val: string): TrendToolState => {
    if (!val) {
        return null;
    }

    const [
        spectralIndex,
        acquisitionMonth,
        // samplingTemporalResolution,
        queryLocation,
        acquisitionYear,
        option,
    ] = val.split('|');

    return {
        ...initialTrendToolState,
        spectralIndex: spectralIndex as SpectralIndex,
        acquisitionMonth: +acquisitionMonth,
        acquisitionYear: acquisitionYear ? +acquisitionYear : getCurrentYear(),
        option: option ? (option as TrendToolOption) : 'year-to-year',
        queryLocation: decodeProfileToolQueryLocation(queryLocation),
    };
};
