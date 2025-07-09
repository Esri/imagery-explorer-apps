export type Sentinel2LandCoverClassification =
    | 'Water'
    | 'Trees'
    | 'Flooded Vegetation'
    | 'Crops'
    | 'Built Area'
    | 'Bare Ground'
    | 'Snow/Ice'
    | 'Clouds'
    | 'Rangeland'
    | 'No Data';

export type NLCDLandCoverClassification =
    | 'Open Water'
    | 'Perennial Snow/Ice'
    | 'Developed Open Space'
    | 'Developed Low Intensity'
    | 'Developed Medium Intensity'
    | 'Developed High Intensity'
    | 'Barren Land'
    | 'Deciduous Forest'
    | 'Evergreen Forest'
    | 'Mixed Forest'
    // | 'Dwarf Scrub'
    | 'Shrub/Scrub'
    | 'Grassland/Herbaceous'
    // | 'Sedge/Herbaceous'
    // | 'Lichens'
    // | 'Moss'
    | 'Pasture/Hay'
    | 'Cultivated Crops'
    | 'Woody Wetlands'
    | 'Emergent Herbaceous Wetlands';

export type LandCoverClassification =
    | Sentinel2LandCoverClassification
    | NLCDLandCoverClassification;

/**
 * Pixel data of Landcover imagery service
 */
export type LandcoverClassificationData = {
    /**
     * pixel value
     */
    Value: number;
    /**
     * Classification Name represent a specific land cover, (e.g. "Trees")
     */
    ClassName: LandCoverClassification;
    /**
     * color as [red, green, blue]
     */
    Color: number[];
    /**
     * Short description of that land cover
     */
    Description: string;
    /**
     * Short name used for display purposes
     */
    shortName: string;
};
