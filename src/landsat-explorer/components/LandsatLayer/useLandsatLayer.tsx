import React, { useEffect, useRef, useState } from 'react';
import IImageryLayer from 'esri/layers/ImageryLayer';
import { loadModules } from 'esri-loader';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '../../config';

type Props = {
    visible?: boolean;
    /**
     * name of selected raster function that will be used to render the landsat layer
     */
    rasterFunction: string;
    // mapView?: IMapView;
};

const useLandsatLayer = ({ visible = true, rasterFunction }: Props) => {
    const layerRef = useRef<IImageryLayer>();

    const [landsatLayer, setLandsatLayer] = useState<IImageryLayer>();

    /**
     * initialize landsat layer using mosaic created using the input year
     */
    const init = async () => {
        type Modules = [typeof IImageryLayer];

        const [ImageryLayer] = await (loadModules([
            'esri/layers/ImageryLayer',
        ]) as Promise<Modules>);

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: LANDSAT_LEVEL_2_SERVICE_URL,
            // mosaicRule: createMosaicRuleByYear(year, aquisitionMonth) as any,
            renderingRule: {
                functionName: rasterFunction,
            },
            visible,
            // blendMode: 'multiply'
        });

        setLandsatLayer(layerRef.current);
    };

    useEffect(() => {
        if (!layerRef.current) {
            init();
        } else {
            // layerRef.current.mosaicRule = createMosaicRuleByYear(
            //     year,
            //     aquisitionMonth
            // ) as any;
        }
    }, []);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.renderingRule = {
            functionName: rasterFunction,
        } as any;
    }, [rasterFunction]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    return landsatLayer;
};

export default useLandsatLayer;
