import React, { useEffect, useRef, useState } from 'react';
import IImageryLayer from 'esri/layers/ImageryLayer';
import { loadModules } from 'esri-loader';
import IMosaicRule from 'esri/layers/support/MosaicRule';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '@shared/services/landsat/config';

type Props = {
    /**
     * name of selected raster function that will be used to render the landsat layer
     */
    rasterFunction: string;
    /**
     * object id of the selected Landsat scene
     */
    objectId?: number;
    /**
     * visibility of the landsat layer
     */
    visible?: boolean;
};

/**
 * Get the mosaic rule that will be used to define how the Landsat images should be mosaicked.
 * @param objectId - object id of the selected Landsat scene
 * @returns A Promise that resolves to an IMosaicRule object representing the mosaic rule.
 *
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-MosaicRule.html
 */
export const getMosaicRule = async (objectId: number): Promise<IMosaicRule> => {
    if (!objectId) {
        return null;
    }

    type Modules = [typeof IMosaicRule];

    const [MosaicRule] = await (loadModules([
        'esri/layers/support/MosaicRule',
    ]) as Promise<Modules>);

    // {"mosaicMethod":"esriMosaicLockRaster","where":"objectid in (2969545)","ascending":false,"lockRasterIds":[2969545]}
    return new MosaicRule({
        method: 'lock-raster',
        ascending: false,
        where: `objectid in (${objectId})`,
        lockRasterIds: [objectId],
    });
};

/**
 * A custom React hook that returns an Imagery Layer instance for the Landsat-2 service.
 * The hook also updates the Imagery Layer when the input parameters are changed.
 *
 * @returns {IImageryLayer} - The Landsat-2 Imagery Layer.
 */
const useLandsatLayer = ({ visible, rasterFunction, objectId }: Props) => {
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

        const mosaicRule = objectId ? await getMosaicRule(objectId) : null;

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: LANDSAT_LEVEL_2_SERVICE_URL,
            mosaicRule,
            rasterFunction: {
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

        layerRef.current.rasterFunction = {
            functionName: rasterFunction,
        } as any;
    }, [rasterFunction]);

    useEffect(() => {
        (async () => {
            if (!layerRef.current) {
                return;
            }

            layerRef.current.mosaicRule = await getMosaicRule(objectId);
        })();
    }, [objectId]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    return landsatLayer;
};

export default useLandsatLayer;
