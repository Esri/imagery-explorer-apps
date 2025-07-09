import { SatelliteImageryRenderersList } from '@landcover-explorer/components/SatelliteImageryRenderersList';
import { SatelliteImageryRendererData } from '@landcover-explorer/components/SatelliteImageryRenderersList/SatelliteImageryRenderersList';
import { APP_NAME } from '@shared/config';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LandsatNaturalColorThumbnail from './thumbnails/Render_NaturalColor.jpg';
import LandsatColorIRThumbnail from './thumbnails/Render_ColorIR.jpg';
import LandsatAgricultureThumbnail from './thumbnails/Render_Agriculture.jpg';
import LandsatNDVIThumbnail from './thumbnails/Render_NDVI.png';
import LandsatShortWaveIRThumbnail from './thumbnails/Render_ShortwaveIR.jpg';
import LandsatNDMIThumbnail from './thumbnails/Render_NDMI.png';
// import LandsatBathymetricThumbnail from './thumbnails/Render_Bathymetric.jpg';
// import LandsatGeologyThumbnail from './thumbnails/Render_Geology.jpg';
// import LandsatThermalThumbnail from './thumbnails/Render_Thermal.png';
// import LandsatMNDWIThumbnail from './thumbnails/Render_MNDWI.png';
// import LandsatUrbanThumbnail from './thumbnails/Render_Urban.jpg';

export const LandsatRenderersList = () => {
    const { t } = useTranslation();

    const data = useMemo(() => {
        const Sentinel2RasterFunctionsData: SatelliteImageryRendererData[] = [
            {
                name: 'Natural Color for Visualization',
                label: 'Natural Color',
                description:
                    'Natural Color bands red, green, blue (4, 3, 2) displayed with dynamic range adjustment applied.',
                thumbnail: LandsatNaturalColorThumbnail,
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
                thumbnail: LandsatShortWaveIRThumbnail,
                translatedLabel: t('renderer_swir_label', { ns: APP_NAME }),
                translatedDescription: t('renderer_swir_description', {
                    ns: APP_NAME,
                }),
            },
            {
                name: 'Agriculture for Visualization',
                label: 'Agriculture',
                description:
                    'Bands shortwave IR-1, near-IR, blue (6, 5, 2) with dynamic range adjustment applied. Vigorous veg. is bright green, stressed veg. dull green and bare areas as brown.',
                thumbnail: LandsatAgricultureThumbnail,
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
                    'Normalized difference vegetation index (NDVI) with a color map applied. <br/><br/>NDVI is calculated as (NIR - R) / (NIR + R). <br/><br/>Dark green is thick vigorous vegetation, brown to tan represents sparse or dry vegetation to bare ground, and white is indicative of water.',
                thumbnail: LandsatNDVIThumbnail,
                translatedLabel: t('renderer_ndvi_label', { ns: APP_NAME }),
                translatedDescription: t('renderer_ndvi_description', {
                    ns: APP_NAME,
                }),
            },
            {
                name: 'Color Infrared for Visualization',
                label: 'Color IR',
                description:
                    'Bands near-IR, red, green (5, 4, 3) with dynamic range adjustment applied. Healthy vegetation is bright red while stressed vegetation is dull red.',
                thumbnail: LandsatColorIRThumbnail,
                translatedLabel: t('renderer_color_ir_label', { ns: APP_NAME }),
                translatedDescription: t('renderer_color_ir_description', {
                    ns: APP_NAME,
                }),
            },
            {
                name: 'NDMI Colorized for Visualization',
                label: 'NDMI',
                description:
                    'Modified Normalized Difference Water Index with a color map applied. <br/><br/>MNDWI is calculated as (G - SWIR1) / (G + SWIR1). <br/><br/>Areas of higher water content range from dark blue to light blue while the driest areas range from tan to white.',
                thumbnail: LandsatNDMIThumbnail,
                translatedLabel: t('renderer_ndmi_label', { ns: APP_NAME }),
                translatedDescription: t('renderer_ndmi_description', {
                    ns: APP_NAME,
                }),
            },
        ];

        return Sentinel2RasterFunctionsData;
    }, []);

    return <SatelliteImageryRenderersList data={data} />;
};
