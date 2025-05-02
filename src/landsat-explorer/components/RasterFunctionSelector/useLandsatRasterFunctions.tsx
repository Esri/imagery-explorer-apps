/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useContext, useMemo } from 'react';
import {
    // LANDSAT_RASTER_FUNCTION_INFOS,
    LandsatRasterFunctionName,
} from '@shared/services/landsat-level-2/config';

import LandsatAgricultureThumbnail from './thumbnails/Landsat/Render_Agriculture.jpg';
import LandsatBathymetricThumbnail from './thumbnails/Landsat/Render_Bathymetric.jpg';
import LandsatColorIRThumbnail from './thumbnails/Landsat/Render_ColorIR.jpg';
import LandsatNaturalColorThumbnail from './thumbnails/Landsat/Render_NaturalColor.jpg';
import LandsatGeologyThumbnail from './thumbnails/Landsat/Render_Geology.jpg';
import LandsatNDVIThumbnail from './thumbnails/Landsat/Render_NDVI.png';
import LandsatShortWaveIRThumbnail from './thumbnails/Landsat/Render_ShortwaveIR.jpg';
import LandsatThermalThumbnail from './thumbnails/Landsat/Render_Thermal.png';
import LandsatMNDWIThumbnail from './thumbnails/Landsat/Render_MNDWI.png';
import LandsatNDMIThumbnail from './thumbnails/Landsat/Render_NDMI.png';
import LandsatUrbanThumbnail from './thumbnails/Landsat/Render_Urban.jpg';

import LandsatMNDWILegend from './legends/Landsat/MNDWI_noText.png';
import LandsatNDVILegend from './legends/Landsat/NDVI_noText.png';
import LandsatNDMILegend from './legends/Landsat/NDMI_noText.png';
import LandsatThermalLegend from './legends/Landsat/Thermal.png';
import { RasterFunctionInfo } from '@typing/imagery-service';
// import { AppContext } from '@shared/contexts/AppContextProvider';
import { useAppSelector } from '@shared/store/configureStore';
import { selectImageryServiceRasterFunctionInfo } from '@shared/store/ImageryService/selectors';

const LandsatRendererThumbnailByName: Record<
    LandsatRasterFunctionName,
    string
> = {
    'Agriculture for Visualization': LandsatAgricultureThumbnail,
    'Bathymetric for Visualization': LandsatBathymetricThumbnail,
    'Color Infrared for Visualization': LandsatColorIRThumbnail,
    'Natural Color for Visualization': LandsatNaturalColorThumbnail,
    'Geology for Visualization': LandsatGeologyThumbnail,
    'NDVI Colorized for Visualization': LandsatNDVIThumbnail,
    'Short-wave Infrared for Visualization': LandsatShortWaveIRThumbnail,
    'Surface Temperature Colorized (Fahrenheit) for Visualization':
        LandsatThermalThumbnail,
    'Surface Temperature Colorized (Celsius) for Visualization':
        LandsatThermalThumbnail,
    'MNDWI Colorized for Visualization': LandsatMNDWIThumbnail,
    'Urban for Visualization': LandsatUrbanThumbnail,
    'NDMI Colorized for Visualization': LandsatNDMIThumbnail,
};

const LandsatRendererLegendByName: Record<LandsatRasterFunctionName, string> = {
    'Agriculture for Visualization': null,
    'Bathymetric for Visualization': null,
    'Color Infrared for Visualization': null,
    'Natural Color for Visualization': null,
    'Geology for Visualization': null,
    'NDVI Colorized for Visualization': LandsatNDVILegend,
    'Short-wave Infrared for Visualization': null,
    'Surface Temperature Colorized (Fahrenheit) for Visualization':
        LandsatThermalLegend,
    'Surface Temperature Colorized (Celsius) for Visualization':
        LandsatThermalLegend,
    'MNDWI Colorized for Visualization': LandsatMNDWILegend,
    'Urban for Visualization': null,
    'NDMI Colorized for Visualization': LandsatNDMILegend,
};

/**
 * Get raster function information that includes thumbnail and legend
 * @returns
 */
export const useLandsatRasterFunctions = (): RasterFunctionInfo[] => {
    // const { rasterFunctionInfo } = useContext(AppContext);

    const rasterFunctionInfo = useAppSelector(
        selectImageryServiceRasterFunctionInfo
    );

    const rasterFunctionInfosWithThumbnail = useMemo(() => {
        if (!rasterFunctionInfo) {
            return [];
        }

        return rasterFunctionInfo.map((d) => {
            const name: LandsatRasterFunctionName =
                d.name as LandsatRasterFunctionName;

            const thumbnail = LandsatRendererThumbnailByName[name];
            const legend = LandsatRendererLegendByName[name];

            return {
                ...d,
                thumbnail,
                legend,
            } as RasterFunctionInfo;
        });
    }, [rasterFunctionInfo]);

    return rasterFunctionInfosWithThumbnail;
};
