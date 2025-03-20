import { APP_NAME } from '@shared/config';
import { Sentinel1FunctionName } from '@shared/services/sentinel-1/config';
import { RasterFunctionInfo } from '@typing/imagery-service';
import { t } from 'i18next';

const translationKeyLookup: Record<
    Sentinel1FunctionName,
    {
        labelTranslationKey: string;
        descriptionTranslationKey: string;
    }
> = {
    'False Color dB with DRA': {
        labelTranslationKey: 'false_color_db_with_dra_label',
        descriptionTranslationKey: 'false_color_db_with_dra_description',
    },
    'VV dB Colorized': {
        labelTranslationKey: 'vv_db_colorized_label',
        descriptionTranslationKey: 'vv_db_colorized_description',
    },
    'VH dB Colorized': {
        labelTranslationKey: 'vh_db_colorized_label',
        descriptionTranslationKey: 'vh_db_colorized_description',
    },
    'Water Anomaly Index Colorized': {
        labelTranslationKey: 'water_anomaly_index_colorized_label',
        descriptionTranslationKey: 'water_anomaly_index_colorized_description',
    },
    'SWI Colorized': {
        labelTranslationKey: 'swi_colorized_label',
        descriptionTranslationKey: 'swi_colorized_description',
    },
    'SWI Raw': {
        labelTranslationKey: '',
        descriptionTranslationKey: '',
    },
    'VH Amplitude with Despeckle': {
        labelTranslationKey: '',
        descriptionTranslationKey: '',
    },
    'VV Amplitude with Despeckle': {
        labelTranslationKey: '',
        descriptionTranslationKey: '',
    },
    'Water Anomaly Index Raw': {
        labelTranslationKey: '',
        descriptionTranslationKey: '',
    },
    'VV and VH Power with Despeckle': {
        labelTranslationKey: '',
        descriptionTranslationKey: '',
    },
};

export const getTranslatedSentinel1RasterFunctionInfo = (
    rasterFunctionInfo: RasterFunctionInfo[]
): RasterFunctionInfo[] => {
    return rasterFunctionInfo.map((rasterFunction) => {
        const {
            name,
            description,
            label, // label is not used in the translation
        } = rasterFunction;

        const { labelTranslationKey, descriptionTranslationKey } =
            translationKeyLookup[name as Sentinel1FunctionName] || {};

        if (!labelTranslationKey || !descriptionTranslationKey) {
            // console.warn(`No translation keys found for ${name}`);
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
