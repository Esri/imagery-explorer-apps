import React, { FC, useEffect, useRef, useState } from 'react';
import IImageryLayer from 'esri/layers/ImageryLayer';
import { loadModules } from 'esri-loader';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '@shared/services/landsat/config';
import MapView from 'esri/views/MapView';
import IRasterFunction from 'esri/layers/support/RasterFunction';
import PixelBlock from 'esri/layers/support/PixelBlock';
import GroupLayer from 'esri/layers/GroupLayer';
import { getBandIndexesBySpectralIndex } from '@shared/services/landsat/helpers';
import { SpectralIndex } from '@typing/imagery-service';
import { QueryParams4ImageryScene } from '@shared/store/Landsat/reducer';
import { getLandsatFeatureByObjectId } from '@shared/services/landsat/getLandsatScenes';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
    /**
     * name of selected spectral index
     */
    spectralIndex: SpectralIndex;
    /**
     * query params of the first selected Landsat scene
     */
    queryParams4SceneA: QueryParams4ImageryScene;
    /**
     * query params of the second selected Landsat scene
     */
    queryParams4SceneB: QueryParams4ImageryScene;
    /**
     * visibility of the landsat layer
     */
    visible?: boolean;
    /**
     * user selected mask index range
     */
    selectedRange: number[];
};

type PixelData = {
    pixelBlock: PixelBlock;
};

export const getRasterFunction4ChangeLayer = async (
    /**
     * name of selected spectral index
     */
    spectralIndex: SpectralIndex,
    /**
     * query params of the first selected Landsat scene
     */
    queryParams4SceneA: QueryParams4ImageryScene,
    /**
     * query params of the second selected Landsat scene
     */
    queryParams4SceneB: QueryParams4ImageryScene
): Promise<IRasterFunction> => {
    if (!spectralIndex) {
        return null;
    }

    if (
        !queryParams4SceneA?.objectIdOfSelectedScene ||
        !queryParams4SceneB?.objectIdOfSelectedScene
    ) {
        return null;
    }

    try {
        type Modules = [typeof IRasterFunction];

        const [RasterFunction] = await (loadModules([
            'esri/layers/support/RasterFunction',
        ]) as Promise<Modules>);

        const bandIndex = getBandIndexesBySpectralIndex(spectralIndex);

        const feature = await getLandsatFeatureByObjectId(
            queryParams4SceneA?.objectIdOfSelectedScene
        );

        return new RasterFunction({
            // the Clip function clips a raster using a rectangular shape according to the extents defined,
            // or clips a raster to the shape of an input polygon feature class.
            functionName: 'Clip',
            functionArguments: {
                // a polygon or envelope
                ClippingGeometry: feature.geometry,
                // use 1 to keep image inside of the geometry
                ClippingType: 1,
                Raster: {
                    rasterFunction: 'Arithmetic',
                    rasterFunctionArguments: {
                        Raster: {
                            rasterFunction: 'BandArithmetic',
                            rasterFunctionArguments: {
                                Raster: `$${queryParams4SceneA.objectIdOfSelectedScene}`,
                                Method: 0,
                                BandIndexes: bandIndex,
                            },
                            outputPixelType: 'F32',
                        },
                        Raster2: {
                            rasterFunction: 'BandArithmetic',
                            rasterFunctionArguments: {
                                Raster: `$${queryParams4SceneB.objectIdOfSelectedScene}`,
                                Method: 0,
                                BandIndexes: bandIndex,
                            },
                            outputPixelType: 'F32',
                        },
                        // 1=esriRasterPlus, 2=esriRasterMinus, 3=esriRasterMultiply, 4=esriRasterDivide, 5=esriRasterPower, 6=esriRasterMode
                        Operation: 2,
                        // default 0; 0=esriExtentFirstOf, 1=esriExtentIntersectionOf, 2=esriExtentUnionOf, 3=esriExtentLastOf
                        ExtentType: 1,
                        // 0=esriCellsizeFirstOf, 1=esriCellsizeMinOf, 2=esriCellsizeMaxOf, 3=esriCellsizeMeanOf, 4=esriCellsizeLastOf
                        CellsizeType: 0,
                    },
                    outputPixelType: 'F32',
                },
            },
        });
    } catch (err) {
        return null;
    }
};

export const ChangeLayer: FC<Props> = ({
    mapView,
    groupLayer,
    spectralIndex,
    queryParams4SceneA,
    queryParams4SceneB,
    visible,
    selectedRange,
}) => {
    const layerRef = useRef<IImageryLayer>();

    const selectedRangeRef = useRef<number[]>();

    const colorRef = useRef<number[]>();

    /**
     * initialize landsat layer using mosaic created using the input year
     */
    const init = async () => {
        type Modules = [typeof IImageryLayer];

        const [ImageryLayer] = await (loadModules([
            'esri/layers/ImageryLayer',
        ]) as Promise<Modules>);

        const renderingRule = await getRasterFunction4ChangeLayer(
            spectralIndex,
            queryParams4SceneA,
            queryParams4SceneB
        );

        console.log(renderingRule);

        layerRef.current = new ImageryLayer({
            // URL to the imagery service
            url: LANDSAT_LEVEL_2_SERVICE_URL,
            mosaicRule: null,
            format: 'lerc',
            renderingRule,
            visible,
            pixelFilter: maskPixels,
            effect: 'drop-shadow(2px, 2px, 3px, #000)',
        });

        groupLayer.add(layerRef.current);
    };

    const maskPixels = (pixelData: PixelData) => {
        const color = colorRef.current || [255, 255, 255];

        const { pixelBlock } = pixelData || {};

        if (!pixelBlock) {
            return;
        }

        const { pixels, width, height } = pixelBlock;

        if (!pixels) {
            return;
        }

        const p1 = pixels[0];

        const n = pixels[0].length;

        if (!pixelBlock.mask) {
            pixelBlock.mask = new Uint8Array(n);
        }

        const pr = new Uint8Array(n);
        const pg = new Uint8Array(n);
        const pb = new Uint8Array(n);

        const numPixels = width * height;

        const [min, max] = selectedRangeRef.current || [0, 0];

        for (let i = 0; i < numPixels; i++) {
            if (p1[i] < min || p1[i] > max || p1[i] === 0) {
                // should exclude pixels that are outside of the user selected range and
                // pixels with value of 0 since those are pixels
                // outside of the mask layer's actual boundary
                pixelBlock.mask[i] = 0;
                continue;
            }

            pixelBlock.mask[i] = 1;

            pr[i] = color[0];
            pg[i] = color[1];
            pb[i] = color[2];
        }

        pixelBlock.pixels = [pr, pg, pb];

        pixelBlock.pixelType = 'u8';
    };

    useEffect(() => {
        if (groupLayer && !layerRef.current) {
            init();
        }
    }, [groupLayer]);

    useEffect(() => {
        (async () => {
            if (!layerRef.current) {
                return;
            }

            layerRef.current.renderingRule =
                (await getRasterFunction4ChangeLayer(
                    spectralIndex,
                    queryParams4SceneA,
                    queryParams4SceneB
                )) as any;
        })();
    }, [spectralIndex, queryParams4SceneA, queryParams4SceneB]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;

        if (visible) {
            // reorder it to make sure it is the top most layer on the map
            groupLayer.reorder(layerRef.current, mapView.map.layers.length - 1);
        }
    }, [visible]);

    useEffect(() => {
        selectedRangeRef.current = selectedRange;

        if (layerRef.current) {
            layerRef.current.redraw();
        }
    }, [selectedRange]);

    return null;
};
