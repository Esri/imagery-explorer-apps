import { APP_NAME } from '@shared/config';
import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';
import { RasterFunctionInfo } from '@typing/imagery-service';
import { t } from 'i18next';

const translationKeyLookup: Record<
    LandsatRasterFunctionName,
    {
        labelTranslationKey: string;
        descriptionTranslationKey: string;
    }
> = {
    'Natural Color for Visualization': {
        labelTranslationKey: 'natural_color_label',
        descriptionTranslationKey: 'natural_color_description',
    },
    'Agriculture for Visualization': {
        labelTranslationKey: 'agriculture_label',
        descriptionTranslationKey: 'agriculture_description',
    },
    'Bathymetric for Visualization': {
        labelTranslationKey: 'bathymetric_label',
        descriptionTranslationKey: 'bathymetric_description',
    },
    'Color Infrared for Visualization': {
        labelTranslationKey: 'color_infrared_label',
        descriptionTranslationKey: 'color_infrared_description',
    },
    'Short-wave Infrared for Visualization': {
        labelTranslationKey: 'short_wave_infrared_label',
        descriptionTranslationKey: 'short_wave_infrared_description',
    },
    'Geology for Visualization': {
        labelTranslationKey: 'geology_label',
        descriptionTranslationKey: 'geology_description',
    },
    'Urban for Visualization': {
        labelTranslationKey: 'urban_label',
        descriptionTranslationKey: 'urban_description',
    },
    'NDVI Colorized for Visualization': {
        labelTranslationKey: 'ndvi_colorized_label',
        descriptionTranslationKey: 'ndvi_colorized_description',
    },
    'NDMI Colorized for Visualization': {
        labelTranslationKey: 'ndmi_colorized_label',
        descriptionTranslationKey: 'ndmi_colorized_description',
    },
    'MNDWI Colorized for Visualization': {
        labelTranslationKey: 'mndwi_colorized_label',
        descriptionTranslationKey: 'mndwi_colorized_description',
    },
    'Surface Temperature Colorized (Celsius) for Visualization': {
        labelTranslationKey: 'surface_temperature_colorized_fahrenheit_label',
        descriptionTranslationKey:
            'surface_temperature_colorized_fahrenheit_description',
    },
    'Surface Temperature Colorized (Fahrenheit) for Visualization': {
        labelTranslationKey: 'surface_temperature_colorized_fahrenheit_label',
        descriptionTranslationKey:
            'surface_temperature_colorized_fahrenheit_description',
    },
};

export const getTranslatedLandsatRasterFunctionInfo = (
    rasterFunctionInfo: RasterFunctionInfo[]
): RasterFunctionInfo[] => {
    return rasterFunctionInfo.map((rasterFunction) => {
        const {
            name,
            description,
            label, // label is not used in the translation
        } = rasterFunction;

        const { labelTranslationKey, descriptionTranslationKey } =
            translationKeyLookup[name as LandsatRasterFunctionName] || {};

        if (!labelTranslationKey || !descriptionTranslationKey) {
            console.warn(`No translation keys found for ${name}`);
            return rasterFunction;
        }

        return {
            ...rasterFunction,
            label: t(labelTranslationKey, {
                ns: APP_NAME,
                defaultValue: label,
            }),
            description: t(descriptionTranslationKey, {
                ns: APP_NAME,
                defaultValue: description,
            }),
        };
    });
};
