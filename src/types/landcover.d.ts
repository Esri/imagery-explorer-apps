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

export type NLCDLandCoverClassification = 'Developed' | 'Forest';

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
