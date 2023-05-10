import React, { useEffect, useRef, useState } from 'react';
import IImageryLayer from 'esri/layers/ImageryLayer';
import { loadModules } from 'esri-loader';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '../../config';

type Props = {
    visible?: boolean;
    // mapView?: IMapView;
};

const useLandsatLayer = ({ visible = true }: Props) => {
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
            // renderingRule: {
            //     functionName: selectedRasterFunction,
            // },
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

        layerRef.current.visible = visible;
    }, [visible]);

    return landsatLayer;
};

export default useLandsatLayer;
