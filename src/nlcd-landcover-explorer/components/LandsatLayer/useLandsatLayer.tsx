import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectSatelliteImageryLayerAquisitionMonth,
    selectSatelliteImageryLayerRasterFunction,
} from '@shared/store/LandcoverExplorer/selectors';
import React, { useEffect, useRef, useState } from 'react';
import { getLandsatMosaicRuleByAcquisitionDate } from './helper';

type Params = {
    year: number;
    visible: boolean;
    // mapView?: IMapView;
};

const createMosaicRuleByYear = (year: number, month: number) => {
    // const monthStr = month < 10 ? '0' + month : month.toString();

    const { where, sortField, sortValue, ascending } =
        getLandsatMosaicRuleByAcquisitionDate(year, month);

    return {
        method: `attribute`,
        where,
        sortField,
        sortValue,
        ascending,
    };
};

export const useLandsatLayer = ({
    year,
    visible,
}: // mapView,
Params) => {
    const layerRef = useRef<ImageryLayer>(null);

    const [landsatLayer, setLandsatLayer] = useState<ImageryLayer>();

    const selectedRasterFunction = useAppSelector(
        selectSatelliteImageryLayerRasterFunction
    );

    const aquisitionMonth = useAppSelector(
        selectSatelliteImageryLayerAquisitionMonth
    );

    /**
     * get sentinel 2 layer using mosaic created using the input year
     */
    const getSentinel2Layer = async () => {
        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: LANDSAT_LEVEL_2_SERVICE_URL,
            mosaicRule: createMosaicRuleByYear(year, aquisitionMonth) as any,
            rasterFunction: {
                functionName: selectedRasterFunction,
            },
            visible,
            // blendMode: 'multiply'
        });

        setLandsatLayer(layerRef.current);
    };

    useEffect(() => {
        if (!layerRef.current) {
            getSentinel2Layer();
        } else {
            layerRef.current.mosaicRule = createMosaicRuleByYear(
                year,
                aquisitionMonth
            ) as any;
        }
    }, [year, aquisitionMonth]);

    useEffect(() => {
        // console.log(selectedRasterFunction);

        if (layerRef.current) {
            layerRef.current.rasterFunction = {
                functionName: selectedRasterFunction || '',
            } as any;
        }
    }, [selectedRasterFunction]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    return landsatLayer;
};
