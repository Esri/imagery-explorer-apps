/***
// calls https://arcgis-content.maps.arcgis.com/sharing/rest/portals/jIL9msH9OI208GCb/isServiceNameAvailable?f=json&name=Monterrey_SIUHI_Data_Aggregation_2&type=Image%20Service&includeitemid=false&token=
// calls submit job https://rasteranalysis.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer/EstimateRasterAnalysisCost/submitJob
// calls https://rasteranalysis.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer/GenerateRaster/submitJob
// https://rasteranalysis.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer/GenerateRaster/jobs/9abb34572eeb4c81b8b7136f0bbcfda4/results/outputRaster >> 
// {"paramName":"outputRaster","dataType":"GPString","value":{
    "itemId": "58d35154991144e78e2698546e1e1fab",
    "url": "https://tiledimageservices.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/Monterrey_SIUHI_Data_Aggregation_2/ImageServer"
    }}
 * 
 */

export const aggregateData = () => {
    // implementation goes here
};
