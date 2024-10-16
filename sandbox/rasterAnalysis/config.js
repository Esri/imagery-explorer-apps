const argv = new Set(process.argv)

const IS_PROD = argv.has('-prod')
const TIER = IS_PROD ? 'production' : 'development'
const ARCGIS_ONLINE_PORTAL = TIER === 'development' ? 'https://devext.arcgis.com' : 'https://www.arcgis.com';
const ARCGIS_ONLINE_PORTAL_REST_ROOT = ARCGIS_ONLINE_PORTAL + '/sharing/rest';
const RASTER_ANALYSIS_ROOT = TIER === 'development' 
    ? 'https://rasteranalysisdev.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer'
    : 'https://rasteranalysis.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer'

const USERNAME = process.env['ACCOUNT_USERNAME']
const PASSWORD = process.env['ACCOUNT_PASSWORD']

module.exports = {
    ARCGIS_ONLINE_PORTAL,
    ARCGIS_ONLINE_PORTAL_REST_ROOT,
    USERNAME,
    PASSWORD,
    IS_PROD,
    RASTER_ANALYSIS_ROOT
}