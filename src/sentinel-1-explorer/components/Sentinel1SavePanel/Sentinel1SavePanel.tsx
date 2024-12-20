import {
    SavePanel,
    // SaveJobButtonOnClickParams,
} from '@shared/components/SavePanel';
import { publishSceneAsHostedImageryLayer } from '@shared/services/raster-analysis/publishSceneAsHostedImageryLayer';
import {
    // createClipRasterFunction,
    // createMaskIndexRasterFunction,
    createChangeDetectionRasterFunction,
    // createChangeDetectionRasterFunctionLogDiff
} from '@shared/services/raster-analysis/rasterFunctions';
import {
    selectQueryParams4MainScene,
    // selectQueryParams4SceneInSelectedMode,
    // selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { getToken } from '@shared/utils/esri-oauth';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { useSaveOptions } from './useSaveOptions';
// import {
//     createNewPublishAndDownloadJob,
//     updatePublishAndDownloadJob,
// } from '@shared/store/PublishAndDownloadJobs/thunks';

import {
    // selectMaskLayerPixelValueRange,
    selectSelectedIndex4MaskTool,
} from '@shared/store/MaskTool/selectors';
import { RadarIndex, SpectralIndex } from '@typing/imagery-service';

import { Extent, Geometry } from '@arcgis/core/geometry';
// import {
//     jobUpdated,
//     PublishAndDownloadJob,
//     PublishAndDownloadJobStatus,
//     PublishAndDownloadJobType,
// } from '@shared/store/PublishAndDownloadJobs/reducer';
// import { createWebMappingApplication } from '@shared/services/arcgis-online/createWebMappingApplication';
// import { saveImagerySceneAsWebMap } from '@shared/services/arcgis-online/createWebMap';
import {
    selectFullPixelValuesRangeInChangeCompareTool,
    selectSelectedOption4ChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { useObjectIds4ChangeDetectionTool } from '@shared/components/ChangeCompareLayer/useObjectIds4ChangeDetectionTool';
import {
    SENTINEL_1_ORIGINAL_SERVICE_URL,
    // SENTINEL_1_SERVICE_URL,
} from '@shared/services/sentinel-1/config';
import { getSentinel1FeatureByObjectId } from '@shared/services/sentinel-1/getSentinel1Scenes';
import { useSelectedSentinel1Scene } from '../../hooks/useSelectedSentinel1Scene';
import { getSentinel1RasterFunctionNameByIndex } from '@shared/services/sentinel-1/helper';
import { useSentinel1PublishOptions } from './useDownloadAndPublishOptions';
import { useSentinel1MaskToolFullPixelValueRange } from '../MaskTool/useSentinel1MaskToolFullPixelValueRange';
import { ChangeCompareToolOption4Sentinel1 } from '../ChangeCompareTool/ChangeCompareToolContainer';
import { useSentinel1RasterFunction4LogDiff } from '../ChangeCompareLayer/useSentinel1RasterFunction4LogDiff';
import { usePublishSceneRasterFunction } from '@shared/components/SavePanel/usePublishSceneRasterFunction';
import { usePublishMaskIndexRasterFunction } from '@shared/components/SavePanel/usePublishMaskIndexRasterFunction';
import { usePublishChangeDetectionRasterFunction } from '@shared/components/SavePanel/usePublishChangeDetectionRasterFunction';

const TAGS = ['Esri Sentinel-1 Explorer', 'Sentinel-1', 'Remote Sensing'];

export const Sentinel1SavePanel = () => {
    const sentinel1Scene = useSelectedSentinel1Scene();

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const selectedOption4ChangeDetectionTool: ChangeCompareToolOption4Sentinel1 =
        useSelector(
            selectSelectedOption4ChangeCompareTool
        ) as ChangeCompareToolOption4Sentinel1;

    const rasterFunction4LogDiff = useSentinel1RasterFunction4LogDiff();

    const rasterFunctionName4ChangeDetection = useMemo(() => {
        const rasterFunctionTemplate =
            selectedOption4ChangeDetectionTool === 'log difference'
                ? rasterFunction4LogDiff
                : getSentinel1RasterFunctionNameByIndex(
                      selectedOption4ChangeDetectionTool
                  );

        return rasterFunctionTemplate;
    }, [selectedOption4ChangeDetectionTool, rasterFunction4LogDiff]);

    const maskToolFullPixelValueRange =
        useSentinel1MaskToolFullPixelValueRange();

    const maskToolRadarIndex = useSelector(
        selectSelectedIndex4MaskTool
    ) as RadarIndex;

    const maskToolRaserFunctionName = useMemo(() => {
        if (!maskToolRadarIndex) {
            return null;
        }

        return getSentinel1RasterFunctionNameByIndex(maskToolRadarIndex);
    }, [maskToolRadarIndex]);

    // const publishSelectedScene = async ({
    //     job,
    //     title,
    //     snippet,
    // }: {
    //     job: PublishAndDownloadJob;
    //     title: string;
    //     snippet: string;
    // }) => {
    //     if (
    //         !queryParams4MainScene ||
    //         !queryParams4MainScene?.objectIdOfSelectedScene
    //     ) {
    //         return;
    //     }

    //     const token = getToken();

    //     try {
    //         const feature = await getSentinel1FeatureByObjectId(
    //             queryParams4MainScene.objectIdOfSelectedScene
    //         );

    //         const clippingGeometry = feature?.geometry as Geometry;

    //         // // A small clipping geometry for testing - Area close to the south end of the Salton Sea
    //         // const clippingGeometry = new Extent({
    //         //     xmin: -12907238.254787412,
    //         //     ymin: 3910098.8218691843,
    //         //     xmax: -12849638.051587004,
    //         //     ymax: 3925308.8755267914,
    //         //     spatialReference: { wkid: 102100 }
    //         // })

    //         let rasterFunction: any = null;

    //         if (job.type === PublishAndDownloadJobType.PublishScene) {
    //             rasterFunction = createClipRasterFunction({
    //                 serviceUrl: SENTINEL_1_ORIGINAL_SERVICE_URL,
    //                 objectId: queryParams4MainScene?.objectIdOfSelectedScene,
    //                 token,
    //                 clippingGeometry,
    //             });
    //         } else if (
    //             job.type === PublishAndDownloadJobType.PublishIndexMask
    //         ) {
    //             rasterFunction = createMaskIndexRasterFunction({
    //                 serviceUrl: SENTINEL_1_ORIGINAL_SERVICE_URL,
    //                 objectId: queryParams4MainScene?.objectIdOfSelectedScene,
    //                 token,
    //                 rasterFunctionTemplate:
    //                     getSentinel1RasterFunctionNameByIndex(radarIndex),
    //                 pixelValueRange: selectedRange,
    //                 fullPixelValueRange: maskToolFullPixelValueRange,
    //                 clippingGeometry,
    //             });
    //         } else if (
    //             job.type === PublishAndDownloadJobType.PublishChangeDetection
    //         ) {
    //             const rasterFunctionTemplate =
    //                 selectedOption4ChangeDetectionTool === 'log difference'
    //                     ? rasterFunction4LogDiff
    //                     : getSentinel1RasterFunctionNameByIndex(
    //                           selectedOption4ChangeDetectionTool
    //                       );

    //             rasterFunction = createChangeDetectionRasterFunction({
    //                 serviceUrl: SENTINEL_1_ORIGINAL_SERVICE_URL,
    //                 objectId4EarlierScene: objectIdOfSelectedSceneInEarlierDate,
    //                 objectId4LaterScene: objectIdOfSelectedSceneInLater,
    //                 token,
    //                 rasterFunctionTemplate,
    //                 clippingGeometry,
    //                 pixelValueRange: selectedRange4ChangeDetectionTool,
    //                 fullPixelValueRange: maskToolFullPixelValueRange,
    //                 logDiff:
    //                     selectedOption4ChangeDetectionTool === 'log difference',
    //             });
    //         }

    //         if (!rasterFunction) {
    //             throw new Error('Failed to create raster function');
    //         }

    //         const response = await publishSceneAsHostedImageryLayer({
    //             title, //'hosted-imagery-service-' + new Date().getTime(),
    //             snippet,
    //             rasterFunction,
    //         });
    //         // console.log('Generate Raster Job submitted', response);

    //         dispatch(
    //             updatePublishAndDownloadJob({
    //                 ...job,
    //                 rasterAnanlysisJobId: response.rasterAnalysisJobId,
    //                 rasterAnalysisTaskName: 'GenerateRaster',
    //                 outputURL: response.outputServiceUrl,
    //                 outputItemId: response.outputItemId,
    //             })
    //         );
    //     } catch (err) {
    //         dispatch(
    //             updatePublishAndDownloadJob({
    //                 ...job,
    //                 status: PublishAndDownloadJobStatus.Failed,
    //                 errormessage: `Failed to publish scene: ${
    //                     err.message || 'unknown error'
    //                 }`,
    //             })
    //         );
    //     }
    // };

    const { publishOptions } = useSentinel1PublishOptions();

    const [clippingGeometry, setClippingGeometry] = useState<Geometry | null>(
        null
    );

    const token = getToken();

    useEffect(() => {
        (async () => {
            if (
                !queryParams4MainScene ||
                !queryParams4MainScene?.objectIdOfSelectedScene
            ) {
                setClippingGeometry(null);
                return;
            }

            const feature = await getSentinel1FeatureByObjectId(
                queryParams4MainScene.objectIdOfSelectedScene
            );

            const clippingGeometry = feature?.geometry as Geometry;

            setClippingGeometry(clippingGeometry);
        })();
    }, [queryParams4MainScene]);

    const publishSceneRasterFunction = usePublishSceneRasterFunction({
        originalServiceUrl: SENTINEL_1_ORIGINAL_SERVICE_URL,
        clippingGeometry,
        token,
    });

    const publishIndexMaskRasterFunction = usePublishMaskIndexRasterFunction({
        originalServiceUrl: SENTINEL_1_ORIGINAL_SERVICE_URL,
        clippingGeometry,
        fullPixelValueRange: maskToolFullPixelValueRange,
        rasterFunctionName: maskToolRaserFunctionName,
        token,
    });

    const publishChangeDetectionRasterFunction =
        usePublishChangeDetectionRasterFunction({
            originalServiceUrl: SENTINEL_1_ORIGINAL_SERVICE_URL,
            clippingGeometry,
            rasterFunctionName: rasterFunctionName4ChangeDetection,
            logDiff: selectedOption4ChangeDetectionTool === 'log difference',
            token,
        });

    return (
        <SavePanel
            originalServiceUrl={SENTINEL_1_ORIGINAL_SERVICE_URL}
            sceneId={sentinel1Scene?.name}
            publishOptions={publishOptions}
            serviceName={'Sentinel-1'}
            tags={TAGS}
            publishSceneRasterFunction={publishSceneRasterFunction}
            publishIndexMaskRasterFunction={publishIndexMaskRasterFunction}
            publishChangeDetectionRasterFunction={
                publishChangeDetectionRasterFunction
            }
        />
    );
};
