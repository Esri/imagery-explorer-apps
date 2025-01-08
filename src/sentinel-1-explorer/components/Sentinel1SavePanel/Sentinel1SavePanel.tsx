import {
    SavePanel,
    // SaveJobButtonOnClickParams,
} from '@shared/components/SavePanel';
import { getToken } from '@shared/utils/esri-oauth';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    // selectMaskLayerPixelValueRange,
    selectSelectedIndex4MaskTool,
} from '@shared/store/MaskTool/selectors';
import { RadarIndex } from '@typing/imagery-service';

import {
    // selectFullPixelValuesRangeInChangeCompareTool,
    selectSelectedOption4ChangeCompareTool,
    // selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import {
    SENTINEL_1_ORIGINAL_SERVICE_URL,
    // SENTINEL_1_SERVICE_URL,
} from '@shared/services/sentinel-1/config';
import { useSelectedSentinel1Scene } from '../../hooks/useSelectedSentinel1Scene';
import { getSentinel1RasterFunctionNameByIndex } from '@shared/services/sentinel-1/helper';
import { useSentinel1PublishOptions } from './useDownloadAndPublishOptions';
import { useSentinel1MaskToolFullPixelValueRange } from '../MaskTool/useSentinel1MaskToolFullPixelValueRange';
import { ChangeCompareToolOption4Sentinel1 } from '../ChangeCompareTool/ChangeCompareToolContainer';
import { useSentinel1RasterFunction4LogDiff } from '../ChangeCompareLayer/useSentinel1RasterFunction4LogDiff';
import { usePublishSceneRasterFunction } from '@shared/components/SavePanel/usePublishSceneRasterFunction';
import { usePublishMaskIndexRasterFunction } from '@shared/components/SavePanel/usePublishMaskIndexRasterFunction';
import { usePublishChangeDetectionRasterFunction } from '@shared/components/SavePanel/usePublishChangeDetectionRasterFunction';
import { useClippingGeometry } from '@shared/components/SavePanel/useClippingGeometry';
import {
    PublishAndDownloadJobType,
    PublishJob,
} from '@shared/store/PublishAndDownloadJobs/reducer';

/**
 * Estimated cost of the raster analysis job for Sentinel-1 service.
 * The cost is in credits.
 */
export const EstimatedRasterAnalysisJobCost: Record<PublishJob, number> = {
    [PublishAndDownloadJobType.PublishScene]: 5,
    [PublishAndDownloadJobType.PublishIndexMask]: 7,
    [PublishAndDownloadJobType.PublishChangeDetection]: 13,
};

const TAGS = ['Esri Sentinel-1 Explorer', 'Sentinel-1', 'Remote Sensing'];

export const Sentinel1SavePanel = () => {
    const sentinel1Scene = useSelectedSentinel1Scene();

    // const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

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

    const { publishOptions } = useSentinel1PublishOptions();

    const token = getToken();

    const clippingGeometry = useClippingGeometry(
        SENTINEL_1_ORIGINAL_SERVICE_URL
    );

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
            estimatedCostByJobType={EstimatedRasterAnalysisJobCost}
            publishSceneRasterFunction={publishSceneRasterFunction}
            publishIndexMaskRasterFunction={publishIndexMaskRasterFunction}
            publishChangeDetectionRasterFunction={
                publishChangeDetectionRasterFunction
            }
        />
    );
};
