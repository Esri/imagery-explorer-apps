/* Copyright 2024 Esri
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

/**
 * A raster function information for the image services, including the name, description, help, function type,
 * and a thumbnail of preconfigured raster function templates.
 */
export type RasterFunctionInfo = {
    /**
     * name of the raster function (e.g. `Agriculture with DRA`)
     */
    name: string;
    /**
     * description of raster function (e.g. `Bands shortwave IR-1, near-IR, blue (6, 5, 2) with dynamic range adjustment applied dynamic range adjustment applied...`)
     */
    description: string;
    /**
     * label of the raster function that will be displayed in UI
     */
    label?: string;
    /**
     * URL of the thumbnail image
     */
    thumbnail?: string;
    /**
     * URL of the legend image
     */
    legend?: string;
};

/**
 * Spectral indices are combinations of the pixel values from two or more spectral bands in a multispectral image.
 * Spectral indices are designed to highlight pixels showing the relative abundance or lack of a land-cover type of interest in an image.
 */
export type SpectralIndex =
    | 'water'
    | 'vegetation'
    | 'moisture'
    | 'temperature farhenheit'
    | 'temperature celcius';

export type LandsatScene = {
    objectId: number;
    /**
     * Landsat product name
     * @example LC08_L1GT_029030_20151209_20160131_01_RT
     */
    name: string;
    /**
     * acquisitionDate as a string in ISO format (YYYY-MM-DD).
     */
    formattedAcquisitionDate: string;
    /**
     * acquisitionDate in unix timestamp
     */
    acquisitionDate: number;
    /**
     * year when this scene was acquired
     */
    acquisitionYear: number;
    /**
     * month when this scene was acquired
     */
    acquisitionMonth: number;
    /**
     * percent of cloud cover, the value ranges from 0 - 1
     */
    cloudCover: number;
    /**
     * percent of cloud cover ranges rounded to integers that ranges from 0 - 100
     */
    formattedCloudCover: number;
    // /**
    //  * if true, this scene was acquired during a cloudy day
    //  */
    // isCloudy: boolean;
    /**
     * name of the satellite (e.g. 'Landsat 8')
     */
    satellite: string;
    /**
     * Landsat path number
     * @see https://landsat.gsfc.nasa.gov/about/the-worldwide-reference-system/
     */
    path: number;
    /**
     * Landsat Row number
     */
    row: number;
    /**
     * name of the sensor:
     * - OLI/TIRS combined
     * - OLI-only
     * - TIRS-only
     * - ETM+
     * - MSS
     */
    sensor: string;
    // /**
    //  * Collection category:
    //  * - Real-Time
    //  * - Tier 1
    //  * - Tier 2
    //  */
    // collectionCategory: string;
    // /**
    //  * Collection number (01, 02, …)
    //  */
    // collectionNumber: string;
    /**
     * Processing correction level (L1TP/L1GT/L1GS)
     */
    correctionLevel: string;
    /**
     * processing date in unix timestamp
     */
    processingDate: number;
    // category: number;
    // name: string;
    // best: number;
    sunElevation: number;
    sunAzimuth: number;
};

/**
 * Temporal Profile/Trend Data sampled at user selected location
 */
export type TemporalProfileData = {
    /**
     * object id of imagery scene gets sampled
     */
    objectId: number;
    /**
     * acquisitionDate of imagery scene in unix timestamp
     */
    acquisitionDate: number;
    /**
     * acquisitionDate as a string in ISO format (YYYY-MM-DD).
     */
    formattedAcquisitionDate: string;
    /**
     * acquisition year of imagery scene
     */
    acquisitionYear: number;
    /**
     * acquisition month of imagery scene
     */
    acquisitionMonth: number;
    /**
     * sampled values for each band
     */
    values: number[];
};

type ImageryServiceTimeExtentData = {
    start: number;
    end: number;
};

export type Sentinel1Scene = {
    objectId: number;
    /**
     * product name
     * @example S1A_IW_GRDH_1SDV_20141003T040550_20141003T040619_002660_002F64_EC04
     */
    name: string;
    /**
     * name of the sensor
     */
    sensor: string;
    /**
     * orbit direction of the sentinel-1 imagery scene
     */
    orbitDirection: 'Ascending' | 'Descending';
    /**
     * single polarisation (HH or VV) or dual polarisation (HH+HV or VV+VH)
     */
    polarizationType: string;
    /**
     * acquisitionDate as a string in ISO format (YYYY-MM-DD).
     */
    formattedAcquisitionDate: string;
    /**
     * acquisitionDate in unix timestamp
     */
    acquisitionDate: number;
    /**
     * year when this scene was acquired
     */
    acquisitionYear: number;
    /**
     * month when this scene was acquired
     */
    acquisitionMonth: number;
};
