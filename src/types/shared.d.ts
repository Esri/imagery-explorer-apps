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
