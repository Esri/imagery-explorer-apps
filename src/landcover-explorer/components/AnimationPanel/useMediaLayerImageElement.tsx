import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAnimationMode } from '@landcover-explorer/store/UI/selectors';

import IMapView from '@arcgis/core/views/MapView';
import ImageElement from '@arcgis/core/layers/support/ImageElement';
import ExtentAndRotationGeoreference from '@arcgis/core/layers/support/ExtentAndRotationGeoreference';
import { exportImage as exportImageFromLandCoverLayer } from '../LandcoverLayer/exportImage';
import { exportImage as exportImageFromSentinel2Layer } from '../Sentinel2Layer/exportImage';
import {
    selectActiveLandCoverType,
    selectSentinel2AquisitionMonth,
    selectSentinel2RasterFunction,
    selectShouldShowSentinel2Layer,
    selectYear,
} from '@landcover-explorer/store/Map/selectors';
import { getRasterFunctionByLandCoverClassName } from '@landcover-explorer/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { getAvailableYears } from '@landcover-explorer/services/sentinel-2-10m-landcover/timeInfo';

const useMediaLayerImageElement = (mapView?: IMapView) => {
    const [imageElements, setImageElements] = useState<ImageElement[]>(null);

    const abortControllerRef = useRef<AbortController>();

    const years = getAvailableYears();

    const sentinel2AquisitionMonth = useSelector(
        selectSentinel2AquisitionMonth
    );

    const sentinel2RasterFunction = useSelector(selectSentinel2RasterFunction);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const activeLandCoverType = useSelector(selectActiveLandCoverType);

    const animationMode = useSelector(selectAnimationMode);

    const loadFrameData = async () => {
        if (!mapView) {
            return;
        }

        // use a new abort controller so the pending requests can be cancelled
        // if user quits animation mode before the responses are returned
        abortControllerRef.current = new AbortController();

        try {
            const { extent, width, height } = mapView;

            const { xmin, ymin, xmax, ymax } = extent;

            // get images via export image request from land cover layer or sentinel-2 layer
            const requests = years.map((year) => {
                return shouldShowSentinel2Layer
                    ? exportImageFromSentinel2Layer({
                          extent,
                          width,
                          height,
                          year,
                          month: sentinel2AquisitionMonth,
                          rasterFunctionName: sentinel2RasterFunction,
                          abortController: abortControllerRef.current,
                      })
                    : exportImageFromLandCoverLayer({
                          extent,
                          width,
                          height,
                          year,
                          rasterFunctionName:
                              getRasterFunctionByLandCoverClassName(
                                  activeLandCoverType
                              ),
                          abortController: abortControllerRef.current,
                      });
            });

            const responses = await Promise.all(requests);

            // once responses are received, get array of image elements using the binary data returned from export image requests
            const imageElements = responses.map((blob) => {
                return new ImageElement({
                    image: URL.createObjectURL(blob),
                    georeference: new ExtentAndRotationGeoreference({
                        extent: {
                            spatialReference: {
                                wkid: 102100,
                            },
                            xmin,
                            ymin,
                            xmax,
                            ymax,
                        },
                    }),
                    opacity: 0,
                });
            });

            setImageElements(imageElements);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!animationMode) {
            // call abort so all pending requests can be cancelled
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            // call revokeObjectURL so these image elements can be freed from the memory
            if (imageElements) {
                for (const elem of imageElements) {
                    URL.revokeObjectURL(elem.image as string);
                }
            }

            setImageElements(null);
        } else if (animationMode === 'loading') {
            loadFrameData();
        }
    }, [animationMode]);

    return imageElements;
};

export default useMediaLayerImageElement;
