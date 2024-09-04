/**
 * Land Cover Type that are supported by the Spectral Profile Tool
 */
export type LandCoverType =
    | 'Trees'
    | 'Cloud'
    | 'Clear Water'
    | 'Turbid Water'
    | 'Snow and Ice'
    | 'Sand'
    | 'Bare Soil'
    | 'Paved Surface'
    | 'Healthy Vegetation'
    | 'Dry Vegetation';

/**
 * Lookup table that contains spectral profile data for different land cover types.
 */
export type SpectralProfileDataByLandCoverType = Record<
    LandCoverType,
    number[]
>;

/**
 * List of supported land cover types.
 */
export const ListOfLandCoverTypes: LandCoverType[] = [
    'Trees',
    'Cloud',
    'Clear Water',
    'Turbid Water',
    'Snow and Ice',
    'Sand',
    'Bare Soil',
    'Paved Surface',
    'Healthy Vegetation',
    'Dry Vegetation',
];
