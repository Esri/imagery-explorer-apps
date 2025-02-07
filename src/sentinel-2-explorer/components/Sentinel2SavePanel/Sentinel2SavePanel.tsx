import React, { useEffect, useMemo, useState } from 'react';
import { SavePanel } from '@shared/components/SavePanel';
import { useDownloadAndPublishOptions } from '@shared/components/SavePanel/useDownloadAndPublishOptions';
import { useAppSelector } from '@shared/store/configureStore';
import { getToken } from '@shared/utils/esri-oauth';
import { usePublishSceneRasterFunction } from '@shared/components/SavePanel/usePublishSceneRasterFunction';
import { usePublishMaskIndexRasterFunction } from '@shared/components/SavePanel/usePublishMaskIndexRasterFunction';
import { usePublishChangeDetectionRasterFunction } from '@shared/components/SavePanel/usePublishChangeDetectionRasterFunction';
import { selectSelectedIndex4MaskTool } from '@shared/store/MaskTool/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import { selectSelectedOption4ChangeCompareTool } from '@shared/store/ChangeCompareTool/selectors';
import { useClippingGeometry } from '@shared/components/SavePanel/useClippingGeometry';
import {
    PublishAndDownloadJobType,
    PublishJob,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import { useSelectedSentinel2Scene } from '@sentinel2-explorer/hooks/useSelectedSentinel2Scene';
import { SENTINEL_2_ORIGINAL_SERVICE_URL } from '@shared/services/sentinel-2/config';
import { getBandIndexesBySpectralIndex } from '@shared/services/sentinel-2/helpers';
import { useSentinel2MaskToolFullPixelValueRange } from '../MaskTool/useSentinel2MaskToolFullPixelValueRange';

/**
 * Estimated cost of the raster analysis job for Sentinel-2 service.
 * The cost is in credits.
 */
export const EstimatedRasterAnalysisJobCost: Record<PublishJob, number> = {
    [PublishAndDownloadJobType.PublishScene]: 3,
    [PublishAndDownloadJobType.PublishIndexMask]: 4,
    [PublishAndDownloadJobType.PublishChangeDetection]: 5,
};

const TAGS = ['Esri Sentinel-2 Explorer', 'Sentinel-2 ', 'Remote Sensing'];

export const Sentinel2SavePanel = () => {
    const sentinel2Scene = useSelectedSentinel2Scene();

    const sceneIds = useMemo(() => {
        return sentinel2Scene ? [sentinel2Scene.name] : [];
    }, [sentinel2Scene]);

    const publishOptions = useDownloadAndPublishOptions();

    const maskToolFullPixelValueRange =
        useSentinel2MaskToolFullPixelValueRange();

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
        SENTINEL_2_ORIGINAL_SERVICE_URL
    );

    const publishSceneRasterFunction = usePublishSceneRasterFunction({
        originalServiceUrl: SENTINEL_2_ORIGINAL_SERVICE_URL,
        clippingGeometry,
        token,
    });

    const publishIndexMaskRasterFunction = usePublishMaskIndexRasterFunction({
        originalServiceUrl: SENTINEL_2_ORIGINAL_SERVICE_URL,
        clippingGeometry,
        fullPixelValueRange: maskToolFullPixelValueRange,
        bandIndexes: maskToolBandIndexes,
        token,
    });

    const publishChangeDetectionRasterFunction =
        usePublishChangeDetectionRasterFunction({
            originalServiceUrl: SENTINEL_2_ORIGINAL_SERVICE_URL,
            clippingGeometry,
            bandIndexes: changeDetectionToolBandIndexes,
            token,
        });

    return (
        <SavePanel
            sceneIds={sceneIds}
            publishOptions={publishOptions}
            originalServiceUrl={SENTINEL_2_ORIGINAL_SERVICE_URL}
            serviceName={'Sentinel2'}
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
