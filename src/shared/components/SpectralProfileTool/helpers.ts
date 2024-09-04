import { SpectralProfileFeatureOfInterest } from './config';

export const FILL_COLOR_BY_FEATURE_OF_INTEREST: Record<
    SpectralProfileFeatureOfInterest,
    string
> = {
    Cloud: '#888888',
    'Clear Water': '#0079F2',
    'Turbid Water': '#76B5E2',
    'Snow and Ice': '#FFFFFF',
    Sand: '#EDC692',
    'Bare Soil': '#EE9720',
    'Paved Surface': '#EB7EE0',
    Trees: '#0AC5C0',
    'Healthy Vegetation': '#1BE43E',
    'Dry Vegetation': '#CAD728',
};

/**
 * Get fill color that will be used to render the stroke line by featureOfInterest.
 * @param FeatureOfInterests
 * @returns hex color string
 */
export const getFillColorByFeatureOfInterest = (
    FeatureOfInterests: SpectralProfileFeatureOfInterest
): string => {
    return (
        FILL_COLOR_BY_FEATURE_OF_INTEREST[FeatureOfInterests] ||
        'var(--custom-light-blue-90)'
    );
};
