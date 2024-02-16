import { Sentinel2RasterFunction } from '@landcover-explorer/components/ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import { LandCoverClassification } from '@landcover-explorer/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { MapCenter, MapMode } from '../store/Map/reducer';

type UrlHashParamKey =
    | 'mapCenter'
    | 'timeExtent'
    | 'landCover'
    | 'downloadMode'
    | 'showImageryLayer'
    | 'mode'
    | 'year'
    | 'month'
    | 'renderingRule'
    | 'animation'
    | 'region'
    | 'saveWebMap';

const SupportedSentinel2RasterFunctions: Sentinel2RasterFunction[] = [
    'Natural Color with DRA',
    'Agriculture with DRA',
    'Color Infrared with DRA',
    'Short-wave Infrared with DRA',
    'NDVI Colormap',
    'NDMI Colorized',
];

let hashParams: URLSearchParams = null; //new URLSearchParams(window.location.hash.slice(1));

/**
 * update Hash Params in the URL using data from hashParams
 */
export const updateHashParams = (key: UrlHashParamKey, value: string) => {
    if (value === undefined || value === null) {
        hashParams.delete(key);
    } else {
        hashParams.set(key, value);
    }

    window.location.hash = hashParams.toString();
};

export const getHashParamValueByKey = (key: UrlHashParamKey): string => {
    if (hashParams === null) {
        hashParams = new URLSearchParams(window.location.hash.slice(1));
    }

    if (!hashParams.has(key)) {
        return null;
    }

    return hashParams.get(key);
};

export const saveMapCenterToHashParams = (center: MapCenter, zoom: number) => {
    const { lon, lat } = center;
    const value = `${lon},${lat},${zoom}`;
    updateHashParams('mapCenter', value);
};

export const getMapCenterFromHashParams = () => {
    const value = getHashParamValueByKey('mapCenter');

    if (!value) {
        return null;
    }

    const [lon, lat, zoom] = value.split(',').map((d) => +d);

    return {
        center: {
            lon,
            lat,
        },
        zoom,
    };
};

export const saveTimeExtentToHashParams = (
    startYear: number,
    endYear: number
) => {
    const value = `${startYear},${endYear}`;
    updateHashParams('timeExtent', value);
};

export const getTimeExtentFromHashParams = () => {
    const value = getHashParamValueByKey('timeExtent');

    if (!value) {
        return null;
    }

    const [startYear, endYear] = value.split(',').map((d) => +d);

    return {
        startYear,
        endYear,
    };
};

export const saveActiveLandCoverTypeToHashParams = (
    landCoverType: LandCoverClassification
) => {
    updateHashParams('landCover', landCoverType);
};

export const getActiveLandCoverTypeFromHashParams = () => {
    return getHashParamValueByKey('landCover');
};

export const saveDonwloadModeToHashParams = (showDownloadPanel: boolean) => {
    updateHashParams('downloadMode', showDownloadPanel ? 'true' : null);
};

export const getDonwloadModeFromHashParams = () => {
    return getHashParamValueByKey('downloadMode') === 'true';
};

export const saveshowImageryLayerToHashParams = (showImageryLayer: boolean) => {
    updateHashParams('showImageryLayer', showImageryLayer ? 'true' : null);
};

export const getShowImageryLayerFromHashParams = () => {
    return getHashParamValueByKey('showImageryLayer') === 'true';
};

export const saveMapModeToHashParams = (mode: MapMode) => {
    updateHashParams('mode', mode);
};

export const getMapModeFromHashParams = () => {
    return getHashParamValueByKey('mode');
};

export const saveActiveYearToHashParams = (year: number) => {
    updateHashParams('year', year?.toString());
};

export const getActiveYearFromHashParams = () => {
    return getHashParamValueByKey('year');
};

export const saveActiveMonthToHashParams = (month: number) => {
    updateHashParams('month', month?.toString());
};

export const getActiveMonthFromHashParams = () => {
    return getHashParamValueByKey('month');
};

export const saveSentinel2RasterFunctionToHashParams = (
    rasterFunctionName: Sentinel2RasterFunction
) => {
    const idx = SupportedSentinel2RasterFunctions.indexOf(rasterFunctionName);

    if (idx === -1) {
        return;
    }

    updateHashParams('renderingRule', idx.toString());
};

export const getSentinel2RasterFunctionFromHashParams = () => {
    const val = getHashParamValueByKey('renderingRule');

    if (!val) {
        return null;
    }

    const idx = +val;

    return SupportedSentinel2RasterFunctions[idx];
};

export const saveAnimationModeToHashParams = (isAnimationModeOn?: boolean) => {
    updateHashParams('animation', isAnimationModeOn ? 'true' : undefined);
};

export const getAnimationModeFromHashParams = () => {
    return getHashParamValueByKey('animation') === 'true';
};

export const saveRegionToHashParams = (region?: string) => {
    updateHashParams('region', region);
};

export const getRegionFromHashParams = () => {
    return getHashParamValueByKey('region') || '';
};

export const saveShowSaveWebMapPanelToHashParams = (
    showSaveWebMapPanel?: boolean
) => {
    updateHashParams('saveWebMap', showSaveWebMapPanel ? 'true' : undefined);
};

export const getShowSaveWebMapPanelFromHashParams = () => {
    return getHashParamValueByKey('saveWebMap') === 'true';
};
