import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { useImageryLayerByObjectId } from '@shared/components/ImageryLayer/useImageLayer';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { SENTINEL_2_SERVICE_URL } from '@shared/services/sentinel-2/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { SpectralSamplingToolSupportedService } from '@shared/store/SpectralSamplingTool/reducer';
import React, { FC, useEffect, useMemo } from 'react';

type Props = {
    targetService: SpectralSamplingToolSupportedService;
    groupLayer?: GroupLayer;
};

export const ImageryLayerByTargetService: FC<Props> = ({
    targetService,
    groupLayer,
}) => {
    const { rasterFunctionName, objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const visibilityOfLandsatLayer = useMemo(() => {
        return targetService === 'landsat' && objectIdOfSelectedScene !== null;
    }, [objectIdOfSelectedScene, targetService]);

    const visibilityOfSentinel2Layer = useMemo(() => {
        return (
            targetService === 'sentinel-2' && objectIdOfSelectedScene !== null
        );
    }, [objectIdOfSelectedScene, targetService]);

    const landsatLayer = useImageryLayerByObjectId({
        url: LANDSAT_LEVEL_2_SERVICE_URL,
        visible: visibilityOfLandsatLayer,
        rasterFunction: rasterFunctionName,
        objectId: objectIdOfSelectedScene,
        defaultMosaicRule: null,
    });

    const sentinel2Layer = useImageryLayerByObjectId({
        url: SENTINEL_2_SERVICE_URL,
        visible: visibilityOfSentinel2Layer,
        rasterFunction: rasterFunctionName,
        objectId: objectIdOfSelectedScene,
        defaultMosaicRule: null,
    });

    useEffect(() => {
        if (!groupLayer) return;

        if (landsatLayer) {
            groupLayer.add(landsatLayer, 0);
        }
    }, [landsatLayer, groupLayer]);

    useEffect(() => {
        if (!groupLayer) return;

        if (sentinel2Layer) {
            groupLayer.add(sentinel2Layer, 0);
        }
    }, [sentinel2Layer, groupLayer]);

    return null;
};
