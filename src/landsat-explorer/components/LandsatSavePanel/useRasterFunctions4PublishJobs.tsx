// import {
//     createChangeDetectionRasterFunction,
//     createClipRasterFunction,
//     createMaskIndexRasterFunction,
// } from '@shared/services/raster-analysis/rasterFunctions';
// import {
//     selectQueryParams4MainScene,
//     // selectQueryParams4SceneInSelectedMode,
//     // selectQueryParams4SecondaryScene,
// } from '@shared/store/ImageryScene/selectors';
// import { getToken } from '@shared/utils/esri-oauth';
// import React, { useEffect, useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
// import {
//     selectMaskLayerPixelValueRange,
//     selectSelectedIndex4MaskTool,
// } from '@shared/store/MaskTool/selectors';
// import { SpectralIndex } from '@typing/imagery-service';
// import { getBandIndexesBySpectralIndex } from '@shared/services/landsat-level-2/helpers';
// import { getLandsatFeatureByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';
// import { Extent, Geometry } from '@arcgis/core/geometry';
// import {
//     selectFullPixelValuesRangeInChangeCompareTool,
//     selectSelectedOption4ChangeCompareTool,
//     selectUserSelectedRangeInChangeCompareTool,
// } from '@shared/store/ChangeCompareTool/selectors';
// import { useObjectIds4ChangeDetectionTool } from '@shared/components/ChangeCompareLayer/useObjectIds4ChangeDetectionTool';

// import { useLandsatMaskToolFullPixelValueRange } from '../MaskTool/useLandsatMaskToolFullPixelValueRange';
// import { RasterFunctionsByPublishJobType } from '@shared/components/SavePanel/SavePanelContainer';

// export const useRasterFunctions4PublishJobs = (originalServiceUrl:string) => {

//     const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

//     const { selectedRange } = useSelector(selectMaskLayerPixelValueRange);

//     const maskToolFullPixelValueRange = useLandsatMaskToolFullPixelValueRange();

//     const spectralIndex4MaskTool = useSelector(
//         selectSelectedIndex4MaskTool
//     ) as SpectralIndex;

//     const selectedRange4ChangeDetectionTool = useSelector(
//         selectUserSelectedRangeInChangeCompareTool
//     );

//     const changeDetectionToolFullPixelValueRange = useSelector(
//         selectFullPixelValuesRangeInChangeCompareTool
//     );

//     const [
//         objectIdOfSelectedSceneInEarlierDate,
//         objectIdOfSelectedSceneInLater,
//     ] = useObjectIds4ChangeDetectionTool();

//     const spectralIndex4ChangeDetection = useSelector(
//         selectSelectedOption4ChangeCompareTool
//     ) as SpectralIndex;

//     const [rasterFunctions, setRasterFunctions] = useState<RasterFunctionsByPublishJobType>({
//         'Publish Change Detection': null,
//         'Publish Index Mask': null,
//         'Publish Scene': null
//     });

//     const [clippingGeometry, setClippingGeometry] = useState<Geometry | null>(null);

//     useEffect(() => {
//         (async () => {

//             if (
//                 !queryParams4MainScene ||
//                 !queryParams4MainScene?.objectIdOfSelectedScene
//             ) {
//                 setClippingGeometry(null);
//                 return;
//             }

//             const feature = await getLandsatFeatureByObjectId(
//                 queryParams4MainScene.objectIdOfSelectedScene
//             );

//             const clippingGeometry = feature?.geometry as Geometry;

//             setClippingGeometry(clippingGeometry);
//         })();

//     }, [queryParams4MainScene]);

//     useEffect(() => {

//         const token = getToken();

//         const publishSceneRasterFunction = createClipRasterFunction({
//             serviceUrl: originalServiceUrl,
//             objectId: queryParams4MainScene?.objectIdOfSelectedScene,
//             token,
//             clippingGeometry,
//         })

//         setRasterFunctions((prev) => {
//             return {
//                 ...prev,
//                 'Publish Scene': publishSceneRasterFunction
//             }
//         })

//     }, [clippingGeometry, queryParams4MainScene?.objectIdOfSelectedScene]);

//     useEffect(() => {

//         const token = getToken();

//         const publishIndexMaskRasterFunction = createMaskIndexRasterFunction({
//             serviceUrl: originalServiceUrl,
//             objectId: queryParams4MainScene?.objectIdOfSelectedScene,
//             token,
//             bandIndexes: getBandIndexesBySpectralIndex(
//                 spectralIndex4MaskTool
//             ),
//             pixelValueRange: selectedRange,
//             fullPixelValueRange: maskToolFullPixelValueRange,
//             clippingGeometry,
//         })
//         setRasterFunctions((prev) => {
//             return {
//                 ...prev,
//                 'Publish Index Mask': publishIndexMaskRasterFunction
//             }
//         })

//     }, [clippingGeometry, queryParams4MainScene?.objectIdOfSelectedScene, spectralIndex4MaskTool, selectedRange, maskToolFullPixelValueRange]);

//     useEffect(() => {

//         const token = getToken();

//         const publishChangeDetectionRasterFunction = createChangeDetectionRasterFunction({
//             serviceUrl: originalServiceUrl,
//             objectId4EarlierScene: objectIdOfSelectedSceneInEarlierDate,
//             objectId4LaterScene: objectIdOfSelectedSceneInLater,
//             token,
//             bandIndexes: getBandIndexesBySpectralIndex(
//                 spectralIndex4ChangeDetection
//             ),
//             clippingGeometry,
//             pixelValueRange: selectedRange4ChangeDetectionTool,
//             fullPixelValueRange: changeDetectionToolFullPixelValueRange,
//         })

//         setRasterFunctions((prev) => {
//             return {
//                 ...prev,
//                 'Publish Change Detection': publishChangeDetectionRasterFunction
//             }
//         })

//     }, [clippingGeometry, objectIdOfSelectedSceneInEarlierDate, objectIdOfSelectedSceneInLater, changeDetectionToolFullPixelValueRange, selectedRange4ChangeDetectionTool, spectralIndex4ChangeDetection]);

//     return rasterFunctions;

//     // const fetRasterFunctions4PublishJobs = async () => {
//     //     if (
//     //         !queryParams4MainScene ||
//     //         !queryParams4MainScene?.objectIdOfSelectedScene
//     //     ) {
//     //         return;
//     //     }

//     //     const token = getToken();

//     //     try {
//     //         const feature = await getLandsatFeatureByObjectId(
//     //             queryParams4MainScene.objectIdOfSelectedScene
//     //         );

//     //         const clippingGeometry = feature?.geometry as Geometry;

//     //         // // A small clipping geometry for testing - Area close to the south end of the Salton Sea
//     //         // const clippingGeometry = new Extent({
//     //         //     xmin: -12907238.254787412, ymin: 3910098.8218691843, xmax: -12849638.051587004, ymax: 3925308.8755267914,
//     //         //     spatialReference: { wkid: 102100 }
//     //         // })

//     //         // const publishSceneRasterFunction = createClipRasterFunction({
//     //         //     serviceUrl: originalServiceUrl,
//     //         //     objectId: queryParams4MainScene?.objectIdOfSelectedScene,
//     //         //     token,
//     //         //     clippingGeometry,
//     //         // })

//     //         // const publishIndexMaskRasterFunction = createMaskIndexRasterFunction({
//     //         //     serviceUrl: originalServiceUrl,
//     //         //     objectId: queryParams4MainScene?.objectIdOfSelectedScene,
//     //         //     token,
//     //         //     bandIndexes: getBandIndexesBySpectralIndex(
//     //         //         spectralIndex4MaskTool
//     //         //     ),
//     //         //     pixelValueRange: selectedRange,
//     //         //     fullPixelValueRange: maskToolFullPixelValueRange,
//     //         //     clippingGeometry,
//     //         // })

//     //         // const publishChangeDetectionRasterFunction = createChangeDetectionRasterFunction({
//     //         //     serviceUrl: originalServiceUrl,
//     //         //     objectId4EarlierScene: objectIdOfSelectedSceneInEarlierDate,
//     //         //     objectId4LaterScene: objectIdOfSelectedSceneInLater,
//     //         //     token,
//     //         //     bandIndexes: getBandIndexesBySpectralIndex(
//     //         //         spectralIndex4ChangeDetection
//     //         //     ),
//     //         //     clippingGeometry,
//     //         //     pixelValueRange: selectedRange4ChangeDetectionTool,
//     //         //     fullPixelValueRange: changeDetectionToolFullPixelValueRange,
//     //         // })

//     //         // const rasterFunctions: RasterFunctionsByPublishJobType = {
//     //         //     'Publish Change Detection': publishChangeDetectionRasterFunction,
//     //         //     'Publish Index Mask': publishIndexMaskRasterFunction,
//     //         //     'Publish Scene': publishSceneRasterFunction
//     //         // }

//     //         // setRasterFunctions(rasterFunctions);

//     //     } catch (err) {
//     //         // dispatch(
//     //         //     updatePublishAndDownloadJob({
//     //         //         ...job,
//     //         //         status: PublishAndDownloadJobStatus.Failed,
//     //         //         errormessage: `Failed to publish scene: ${
//     //         //             err.message || 'unknown error'
//     //         //         }`,
//     //         //     })
//     //         // );
//     //         console.log('Error in fetching raster functions for publish jobs', err);
//     //         setRasterFunctions(null);
//     //     }
//     // };

// }
