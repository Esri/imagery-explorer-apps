export type InterestingPlaceData = {
    /**
     * name of this interesting place
     */
    name: string;
    /**
     * location info of this interesting place
     */
    location: {
        center: number[];
        zoom: number;
    };
    /**
     * name of the raster function associated with this Interesting place
     */
    renderer: string;
    /**
     * url of thumbnail image
     */
    thumbnail: string;
    /**
     * longer name that can be used in tooltip title
     */
    label?: string;
    /**
     * description of this place
     */
    description?: string;
};

/**
 * Date range object
 *
 * @example
 * ```
 * {
 *   startDate: '2024-01-01',
 *   endDate: '2024-12-31'
 * }
 * ```
 */
export type DateRange = {
    /**
     * start date in format of `YYYY-MM-DD`.
     */
    startDate: string;
    /**
     * end date in format of `YYYY-MM-DD`.
     */
    endDate: string;
};
