import React, { useEffect, useRef, useState } from 'react';
import {
    getTimeExtentByYear,
    // TimeExtentData,
} from '@landcover-explorer/services/sentinel-2-10m-landcover/timeInfo';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '@landcover-explorer/services/sentinel-2-10m-landcover/config';
import {
    getRasterFunctionByLandCoverClassName,
    LandCoverClassification,
} from '@landcover-explorer/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { useSelector } from 'react-redux';
import { selectActiveLandCoverType } from '@landcover-explorer/store/Map/selectors';
// import IMapView from '@arcgis/core/views/MapView';

type UseLandCoverLayerParams = {
    year: number;
    visible?: boolean;
    // mapView?: IMapView;
};

export const LandCoverLayerEffect =
    'brightness(110%) drop-shadow(2px, 2px, 3px, #000)';

export const LandCoverLayerBlendMode = 'multiply';

const useLandCoverLayer = ({
    year,
    visible = true,
}: UseLandCoverLayerParams) => {
    const activeLandCoverType = useSelector(selectActiveLandCoverType);

    const layerRef = useRef<ImageryLayer>();

    const [landCoverLayer, setLandCoverLayer] = useState<ImageryLayer>();

    /**
     * get land cover layer using time extent for the input year
     */
    const getLandCoverLayer = async () => {
        const timeExtent = await getTimeExtentByYear(year);

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
            timeExtent,
            renderingRule: {
                functionName:
                    getRasterFunctionByLandCoverClassName(activeLandCoverType),
            },
            effect: LandCoverLayerEffect,
            blendMode: LandCoverLayerBlendMode,
            visible,
        });

        setLandCoverLayer(layerRef.current);
    };

    const updateTimeExtent = async () => {
        const timeExtent = await getTimeExtentByYear(year);
        layerRef.current.timeExtent = timeExtent as any;
    };

    useEffect(() => {
        if (!layerRef.current) {
            getLandCoverLayer();
        } else {
            updateTimeExtent();
        }
    }, [year]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.renderingRule = {
            functionName:
                getRasterFunctionByLandCoverClassName(activeLandCoverType),
        } as any;
    }, [activeLandCoverType]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    return landCoverLayer;
};

export default useLandCoverLayer;
