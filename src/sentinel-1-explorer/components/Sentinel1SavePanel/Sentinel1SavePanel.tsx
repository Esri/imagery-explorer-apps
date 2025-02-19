/* Copyright 2025 Esri
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

import {
    SavePanel,
    // SaveJobButtonOnClickParams,
} from '@shared/components/SavePanel';
import { getToken } from '@shared/utils/esri-oauth';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
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
import { useSceneIdsFromSelectedSentinel1Scenes } from './useSceneIds';
import {
    SENTINEL1_SERVICE_ACCESS_INFOMRATION,
    SENTINEL1_SERVICE_DESCRIPTION,
    SENTINEL1_SERVICE_LICENSE_INFO_HOSTED_IMAGERY_SERVICE,
    SENTINEL1_SERVICE_LICENSE_INFO_WEB_MAP,
    TAGS,
} from './config';

/**
 * Estimated cost of the raster analysis job for Sentinel-1 service.
 * The cost is in credits.
 */
export const EstimatedRasterAnalysisJobCost: Record<PublishJob, number> = {
    [PublishAndDownloadJobType.PublishScene]: 5,
    [PublishAndDownloadJobType.PublishIndexMask]: 7,
    [PublishAndDownloadJobType.PublishChangeDetection]: 13,
};

export const Sentinel1SavePanel = () => {
    // const sentinel1Scene = useSelectedSentinel1Scene();

    const sceneIds = useSceneIdsFromSelectedSentinel1Scenes();

    // const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const selectedOption4ChangeDetectionTool: ChangeCompareToolOption4Sentinel1 =
        useAppSelector(
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

    const maskToolRadarIndex = useAppSelector(
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
            sceneIds={sceneIds}
            publishOptions={publishOptions}
            serviceName={'Sentinel-1'}
            tags={TAGS}
            description={SENTINEL1_SERVICE_DESCRIPTION}
            accessInformation={SENTINEL1_SERVICE_ACCESS_INFOMRATION}
            licenseInfo={SENTINEL1_SERVICE_LICENSE_INFO_WEB_MAP}
            licenseInfoForHostedImageryService={
                SENTINEL1_SERVICE_LICENSE_INFO_HOSTED_IMAGERY_SERVICE
            }
            estimatedCostByJobType={EstimatedRasterAnalysisJobCost}
            publishSceneRasterFunction={publishSceneRasterFunction}
            publishIndexMaskRasterFunction={publishIndexMaskRasterFunction}
            publishChangeDetectionRasterFunction={
                publishChangeDetectionRasterFunction
            }
        />
    );
};
