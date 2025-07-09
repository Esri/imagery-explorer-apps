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

import React, { useEffect, useMemo } from 'react';
// import Sentinel2LayerRasterFunctionsList from './Sentinel2LayerRasterFunctionsList';

import ThumbnailNatrualColor from './thumbnails/Imagery_NaturalColor.png';
import ThumbnailAgriculture from './thumbnails/Imagery_Agriculture.png';
import ThumbnailColorIR from './thumbnails/Imagery_ColorIR.png';
import ThumbnailNDMI from './thumbnails/Imagery_NDMI.png';
import ThumbnailNDVI from './thumbnails/Imagery_NDVI.png';
import ThumbnailSWIR from './thumbnails/Imagery_SWIR.png';
// import { useAppDispatch } from '@shared/store/configureStore';
// import { ImageryRasterFunction4LandcoverApp, satelliteImageryLayerRasterFunctionChanged } from '@shared/store/LandcoverExplorer/reducer';
// import { useAppSelector } from '@shared/store/configureStore';
// import { selectSatelliteImageryLayerRasterFunction } from '@shared/store/LandcoverExplorer/selectors';
// import { updateTooltipData } from '@shared/store/UI/thunks';
// import { saveSentinel2RasterFunctionToHashParams } from '@landcover-explorer/utils/URLHashParams';
// import { selectAnimationStatus } from '@shared/store/UI/selectors';
import { SatelliteImageryRendererData } from '@landcover-explorer/components/SatelliteImageryRenderersList/SatelliteImageryRenderersList';
import { SatelliteImageryRenderersList } from '@landcover-explorer/components/SatelliteImageryRenderersList';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

// export type Sentinel2RasterFunction =
//     | 'Natural Color for Visualization'
//     | 'Agriculture for Visualization'
//     | 'Color Infrared for Visualization'
//     | 'Short-wave Infrared for Visualization'
//     | 'NDVI Colorized for Visualization'
//     | 'NDMI Colorized for Visualization';

// export type RasterFunctionData = {
//     name: ImageryRasterFunction4LandcoverApp;
//     label: string;
//     description: string;
//     thumbnail: string;
//     translatedLabel: string; // This can be used for translation purposes if needed
//     translatedDescription: string; // This can be used for translation purposes if needed
// };

// export const Sentinel2RasterFunctionsData: SatelliteImageryRendererData[] = [
//     {
//         name: 'Natural Color for Visualization',
//         label: 'Natural Color',
//         description:
//             'Natural Color bands red, green, blue (4, 3, 2) displayed with dynamic range adjustment applied.',
//         thumbnail: ThumbnailNatrualColor,
//         // The following properties are used for translation purposes
//         translatedLabel: 'renderer_natural_color_label',
//         translatedDescription: 'renderer_natural_color_description',
//     },
//     {
//         name: 'Short-wave Infrared for Visualization',
//         label: 'SWIR',
//         description:
//             'Bands shortwave infrared-2, shortwave infrared-1, red (12, 11, 4) with dynamic range adjustment applied.',
//         thumbnail: ThumbnailSWIR,
//         translatedLabel: 'renderer_swir_label',
//         translatedDescription: 'renderer_swir_description',
//     },
//     {
//         name: 'Agriculture for Visualization',
//         label: 'Agriculture',
//         description:
//             'Bands shortwave IR-1, near-IR, blue (11, 8, 2) with dynamic range adjustment applied. Vigorous vegetation bright green, stressed vegetation dull green, and bare areas as brown.',
//         thumbnail: ThumbnailAgriculture,
//         translatedLabel: 'renderer_agriculture_label',
//         translatedDescription: 'renderer_agriculture_description',
//     },
//     {
//         name: 'NDVI Colorized for Visualization',
//         label: 'NDVI',
//         description:
//             'Normalized difference vegetation index (NDVI) with colormap. Dark green represents vigorous vegetation and brown represents sparse vegetation. It is computed as (b8 - b4) / (b8 + b4) and is suitable for vegetation, land cover and plant health monitoring.',
//         thumbnail: ThumbnailNDVI,
//         translatedLabel: 'renderer_ndvi_label',
//         translatedDescription: 'renderer_ndvi_description',
//     },
//     {
//         name: 'Color Infrared for Visualization',
//         label: 'Color IR',
//         description:
//             'Bands near-infrared, red, green (8,4,3) with dynamic range adjustment applied. Healthy vegetation is bright red while stressed vegetation is dull red',
//         thumbnail: ThumbnailColorIR,
//         translatedLabel: 'renderer_color_ir_label',
//         translatedDescription: 'renderer_color_ir_description',
//     },
//     {
//         name: 'NDMI Colorized for Visualization',
//         label: 'NDMI',
//         description:
//             'Normalized Difference Moisture Index with color map. Wetlands and moist areas appear blue whereas dry areas are represented by deep yellow and brown color. It is computed as NIR(B8)-SWIR1(B11)/NIR(B8)+SWIR1(B11).',
//         thumbnail: ThumbnailNDMI,
//         translatedLabel: 'renderer_ndmi_label',
//         translatedDescription: 'renderer_ndmi_description',
//     },
// ];

export const Sentinel2LayerRasterFunctionsListContainer = () => {
    // const dispatch = useAppDispatch();

    // const animationMode = useAppSelector(selectAnimationStatus);

    // const selectedRasterFunction = useAppSelector(
    //     selectSatelliteImageryLayerRasterFunction
    // );

    // useEffect(() => {
    //     saveSentinel2RasterFunctionToHashParams(selectedRasterFunction);
    // }, [selectedRasterFunction]);

    const { t } = useTranslation();

    const data = useMemo(() => {
        const Sentinel2RasterFunctionsData: SatelliteImageryRendererData[] = [
            {
                name: 'Natural Color for Visualization',
                label: 'Natural Color',
                description:
                    'Natural Color bands red, green, blue (4, 3, 2) displayed with dynamic range adjustment applied.',
                thumbnail: ThumbnailNatrualColor,
                // The following properties are used for translation purposes
                translatedLabel: t('renderer_natural_color_label', {
                    ns: APP_NAME,
                }),
                translatedDescription: t('renderer_natural_color_description', {
                    ns: APP_NAME,
                }),
            },
            {
                name: 'Short-wave Infrared for Visualization',
                label: 'SWIR',
                description:
                    'Bands shortwave infrared-2, shortwave infrared-1, red (12, 11, 4) with dynamic range adjustment applied.',
                thumbnail: ThumbnailSWIR,
                translatedLabel: t('renderer_swir_label', { ns: APP_NAME }),
                translatedDescription: t('renderer_swir_description', {
                    ns: APP_NAME,
                }),
            },
            {
                name: 'Agriculture for Visualization',
                label: 'Agriculture',
                description:
                    'Bands shortwave IR-1, near-IR, blue (11, 8, 2) with dynamic range adjustment applied. Vigorous vegetation bright green, stressed vegetation dull green, and bare areas as brown.',
                thumbnail: ThumbnailAgriculture,
                translatedLabel: t('renderer_agriculture_label', {
                    ns: APP_NAME,
                }),
                translatedDescription: t('renderer_agriculture_description', {
                    ns: APP_NAME,
                }),
            },
            {
                name: 'NDVI Colorized for Visualization',
                label: 'NDVI',
                description:
                    'Normalized difference vegetation index (NDVI) with colormap. Dark green represents vigorous vegetation and brown represents sparse vegetation. It is computed as (b8 - b4) / (b8 + b4) and is suitable for vegetation, land cover and plant health monitoring.',
                thumbnail: ThumbnailNDVI,
                translatedLabel: t('renderer_ndvi_label', { ns: APP_NAME }),
                translatedDescription: t('renderer_ndvi_description', {
                    ns: APP_NAME,
                }),
            },
            {
                name: 'Color Infrared for Visualization',
                label: 'Color IR',
                description:
                    'Bands near-infrared, red, green (8,4,3) with dynamic range adjustment applied. Healthy vegetation is bright red while stressed vegetation is dull red',
                thumbnail: ThumbnailColorIR,
                translatedLabel: t('renderer_color_ir_label', { ns: APP_NAME }),
                translatedDescription: t('renderer_color_ir_description', {
                    ns: APP_NAME,
                }),
            },
            {
                name: 'NDMI Colorized for Visualization',
                label: 'NDMI',
                description:
                    'Normalized Difference Moisture Index with color map. Wetlands and moist areas appear blue whereas dry areas are represented by deep yellow and brown color. It is computed as NIR(B8)-SWIR1(B11)/NIR(B8)+SWIR1(B11).',
                thumbnail: ThumbnailNDMI,
                translatedLabel: t('renderer_ndmi_label', { ns: APP_NAME }),
                translatedDescription: t('renderer_ndmi_description', {
                    ns: APP_NAME,
                }),
            },
        ];

        return Sentinel2RasterFunctionsData;
    }, []);

    return (
        // <Sentinel2LayerRasterFunctionsList
        //     selectedRasterFunction={selectedRasterFunction}
        //     data={Sentinel2RasterFunctionsData}
        //     disabled={animationMode !== null}
        //     onSelect={(rasterFunction) => {
        //         dispatch(
        //             satelliteImageryLayerRasterFunctionChanged(rasterFunction)
        //         );
        //     }}
        //     itemOnHover={(data) => {
        //         dispatch(updateTooltipData(data));
        //     }}
        // />

        <SatelliteImageryRenderersList data={data} />
    );
};

// export default ImageryRasterFunctionsListContainer;
