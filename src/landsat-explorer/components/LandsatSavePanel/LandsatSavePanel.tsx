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

import React, { useEffect, useMemo, useState } from 'react';
// import { useSelectedLandsatScene } from '@landsat-explorer/hooks/useSelectedLandsatScene';
import { SavePanel } from '@shared/components/SavePanel';
import { LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { useDownloadAndPublishOptions } from '@shared/components/SavePanel/useDownloadAndPublishOptions';
import { useAppSelector } from '@shared/store/configureStore';
import { getToken } from '@shared/utils/esri-oauth';
import { usePublishSceneRasterFunction } from '@shared/components/SavePanel/usePublishSceneRasterFunction';
import { usePublishMaskIndexRasterFunction } from '@shared/components/SavePanel/usePublishMaskIndexRasterFunction';
import { usePublishChangeDetectionRasterFunction } from '@shared/components/SavePanel/usePublishChangeDetectionRasterFunction';
import { useLandsatMaskToolFullPixelValueRange } from '../MaskTool/useLandsatMaskToolFullPixelValueRange';
import { selectSelectedIndex4MaskTool } from '@shared/store/MaskTool/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import { getBandIndexesBySpectralIndex } from '@shared/services/landsat-level-2/helpers';
import { selectSelectedOption4ChangeCompareTool } from '@shared/store/ChangeCompareTool/selectors';
import { useClippingGeometry } from '@shared/components/SavePanel/useClippingGeometry';
import {
    PublishAndDownloadJobType,
    PublishJob,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import { useSceneIds } from '@shared/components/SavePanel/useSceneIds';
import { getLandsatSceneByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';
import { shortenLandsatSceneId } from './helpers';

import {
    LANDSAT_LEVEL_2_SERVICE_DESCRIPTION,
    LANDSAT_LEVEL_2_SERVICE_ACCESS_INFOMRATION,
    LANDSAT_LEVEL_2_SERVICE_LICENSE_INFO_HOSTED_IMAGERY_SERVICE,
    LANDSAT_LEVEL_2_SERVICE_LICENSE_INFO_WEB_MAP,
    TAGS,
} from './config';

/**
 * Estimated cost of the raster analysis job for Landsat service.
 * The cost is in credits.
 */
export const EstimatedRasterAnalysisJobCost: Record<PublishJob, number> = {
    [PublishAndDownloadJobType.PublishScene]: 3,
    [PublishAndDownloadJobType.PublishIndexMask]: 4,
    [PublishAndDownloadJobType.PublishChangeDetection]: 5,
};

export const LandsatSavePanel = () => {
    // const landsatScene = useSelectedLandsatScene();

    // const sceneIds = useMemo(() => {
    //     return landsatScene ? [landsatScene.name] : [];
    // }, [landsatScene]);

    const sceneIds = useSceneIds({
        getSceneByObjectId: getLandsatSceneByObjectId,
        shortenSceneId: shortenLandsatSceneId,
    });

    const publishOptions = useDownloadAndPublishOptions();

    const maskToolFullPixelValueRange = useLandsatMaskToolFullPixelValueRange();

    const spectralIndex4MaskTool = useAppSelector(
        selectSelectedIndex4MaskTool
    ) as SpectralIndex;

    const maskToolBandIndexes = useMemo(() => {
        if (!spectralIndex4MaskTool) {
            return null;
        }

        return getBandIndexesBySpectralIndex(spectralIndex4MaskTool);
    }, [spectralIndex4MaskTool]);

    const spectralIndex4ChangeDetection = useAppSelector(
        selectSelectedOption4ChangeCompareTool
    ) as SpectralIndex;

    const changeDetectionToolBandIndexes = useMemo(() => {
        return getBandIndexesBySpectralIndex(spectralIndex4ChangeDetection);
    }, [spectralIndex4ChangeDetection]);

    const token = getToken();

    const clippingGeometry = useClippingGeometry(
        LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL
    );

    const publishSceneRasterFunction = usePublishSceneRasterFunction({
        originalServiceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
        clippingGeometry,
        token,
    });

    const publishIndexMaskRasterFunction = usePublishMaskIndexRasterFunction({
        originalServiceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
        clippingGeometry,
        fullPixelValueRange: maskToolFullPixelValueRange,
        bandIndexes: maskToolBandIndexes,
        token,
    });

    const publishChangeDetectionRasterFunction =
        usePublishChangeDetectionRasterFunction({
            originalServiceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
            clippingGeometry,
            bandIndexes: changeDetectionToolBandIndexes,
            token,
        });

    return (
        <SavePanel
            sceneIds={sceneIds}
            publishOptions={publishOptions}
            originalServiceUrl={LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL}
            serviceName={'Landsat'}
            tags={TAGS}
            description={LANDSAT_LEVEL_2_SERVICE_DESCRIPTION}
            accessInformation={LANDSAT_LEVEL_2_SERVICE_ACCESS_INFOMRATION}
            licenseInfo={LANDSAT_LEVEL_2_SERVICE_LICENSE_INFO_WEB_MAP}
            licenseInfoForHostedImageryService={
                LANDSAT_LEVEL_2_SERVICE_LICENSE_INFO_HOSTED_IMAGERY_SERVICE
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
