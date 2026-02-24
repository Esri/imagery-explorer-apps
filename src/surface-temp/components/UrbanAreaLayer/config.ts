/**
 * Global Human Settlement Layer Urban Centres Database (GHS-UCDB) provided by Copernicus – Europe’s eyes on Earth.
 * @see https://www.arcgis.com/home/item.html?id=2344906dc4a04c748b690b9a92c8446c
 */
export const UrbanAreaLayerServiceURL =
    'https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/UCDB/FeatureServer/0';

export enum UrbanAreaLayerFieldNames {
    OBJECTID = 'OBJECTID',
    /**
     * the unique identifier of the Urban Centre
     */
    URBAN_CENTER_ID = 'ID_HDC_G0',
    /**
     * the main name of the Urban Centre
     */
    URBAN_CENTER_NAME = 'UC_NM_MN',
    /**
     * full list of assigned names of the Urban Centre (the country ISO 3 is declared within ‘[]’, to support the cross border entities)
     */
    URBAN_CENTER_ALL_NAMES = 'UC_NM_LST',
    /**
     * Major Geographical Region (UNDESA, 2018b), according to the classification of the main country. (e.g. Asia, Africa, etc.)
     */
    MAJOR_GEO_REGION = 'GRGN_L1',
    /**
     * Geographical Region (UNDESA, 2018b), according to the classification of the main country (e.g. Eastern Africa, Southern Asia, etc.)
     */
    GEO_REGION = 'GRGN_L2',
    /**
     * the name of the main country, i.e., the country within which borders the majority of the area of the Urban Centre is located (e.g. United States, China, etc.)
     */
    COUNTRY = 'CTR_MN_NM',
}
