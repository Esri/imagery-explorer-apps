import { Geometry } from '@arcgis/core/geometry';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';
import { SpectralIndex } from '@typing/imagery-service';

type GetChangeCompareLayerRasterFunctionParams = {
    /**
     * band index for the selected spectral index
     */
    bandIndex: string;
    /**
     * geometry that will be used to clip the output imagery
     */
    clippingGeometry: Geometry;
    /**
     * query params of the first selected scene
     */
    queryParams4SceneA: QueryParams4ImageryScene;
    /**
     * query params of the second selected scene
     */
    queryParams4SceneB: QueryParams4ImageryScene;
};

/**
 * This function retrieves a raster function that can be used to visualize changes between two input Imagery scenes.
 * The output raster function applies an `Arithmetic` operation to calculate the difference of a selected spectral index
 * between two input rasters.
 *
 * @param {GetChangeCompareLayerRasterFunctionParams} params - The parameters for generating the Change Compare Layer Raster Function.
 * - `bandIndex` - band index for the selected spectral index.
 * - `clippingGeometry` - geometry that will be used to clip the output imagery
 * - `queryParams4SceneA` - Query parameters for the first selected scene.
 * - `queryParams4SceneB` - Query parameters for the second selected scene.
 * @returns A Raster Function that contains the `Arithmetic` function to visualize spectral index changes.
 *
 * @see https://developers.arcgis.com/documentation/common-data-types/raster-function-objects.htm
 */
export const getChangeCompareLayerRasterFunction = ({
    bandIndex,
    clippingGeometry,
    queryParams4SceneA,
    queryParams4SceneB,
}: GetChangeCompareLayerRasterFunctionParams): RasterFunction => {
    if (!bandIndex) {
        return null;
    }

    if (
        !queryParams4SceneA?.objectIdOfSelectedScene ||
        !queryParams4SceneB?.objectIdOfSelectedScene
    ) {
        return null;
    }

    // Sort query parameters by acquisition date in ascending order.
    const [
        queryParams4SceneAcquiredInEarlierDate,
        queryParams4SceneAcquiredInLaterDate,
    ] = [queryParams4SceneA, queryParams4SceneB].sort((a, b) => {
        return (
            formattedDateString2Unixtimestamp(a.acquisitionDate) -
            formattedDateString2Unixtimestamp(b.acquisitionDate)
        );
    });

    try {
        // // Get the band index for the selected spectral index.
        // const bandIndex = getBandIndexesBySpectralIndex(spectralIndex);

        // // Retrieve the feature associated with the later acquired Landsat scene.
        // const feature = await getLandsatFeatureByObjectId(
        //     queryParams4SceneAcquiredInLaterDate?.objectIdOfSelectedScene
        // );

        return new RasterFunction({
            // the Clip function clips a raster using a rectangular shape according to the extents defined,
            // or clips a raster to the shape of an input polygon feature class.
            functionName: 'Clip',
            functionArguments: {
                // a polygon or envelope
                ClippingGeometry: clippingGeometry,
                // use 1 to keep image inside of the geometry
                ClippingType: 1,
                Raster: {
                    // The `Arithmetic` function performs an arithmetic operation between two rasters.
                    rasterFunction: 'Arithmetic',
                    rasterFunctionArguments: {
                        Raster: {
                            rasterFunction: 'BandArithmetic',
                            rasterFunctionArguments: {
                                Raster: `$${queryParams4SceneAcquiredInLaterDate.objectIdOfSelectedScene}`,
                                Method: 0,
                                BandIndexes: bandIndex,
                            },
                            outputPixelType: 'F32',
                        },
                        Raster2: {
                            rasterFunction: 'BandArithmetic',
                            rasterFunctionArguments: {
                                Raster: `$${queryParams4SceneAcquiredInEarlierDate.objectIdOfSelectedScene}`,
                                Method: 0,
                                BandIndexes: bandIndex,
                            },
                            outputPixelType: 'F32',
                        },
                        // 1=esriRasterPlus, 2=esriRasterMinus, 3=esriRasterMultiply, 4=esriRasterDivide, 5=esriRasterPower, 6=esriRasterMode
                        Operation: 2,
                        // default 0; 0=esriExtentFirstOf, 1=esriExtentIntersectionOf, 2=esriExtentUnionOf, 3=esriExtentLastOf
                        ExtentType: 1,
                        // 0=esriCellsizeFirstOf, 1=esriCellsizeMinOf, 2=esriCellsizeMaxOf, 3=esriCellsizeMeanOf, 4=esriCellsizeLastOf
                        CellsizeType: 0,
                    },
                    outputPixelType: 'F32',
                },
            },
        });
    } catch (err) {
        console.error(err);

        // handle any potential errors and return null in case of failure.
        return null;
    }
};
