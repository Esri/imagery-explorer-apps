import { selectQueryParams4MainScene } from '@shared/store/ImageryScene/selectors';
import { getToken } from '@shared/utils/esri-oauth';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Extent, Geometry } from '@arcgis/core/geometry';
import { getFeatureByObjectId } from '@shared/services/helpers/getFeatureById';

export const useClippingGeometry = (serviceUrl: string) => {
    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const [clippingGeometry, setClippingGeometry] = useState<Geometry | null>(
        null
    );

    useEffect(() => {
        (async () => {
            if (
                !queryParams4MainScene ||
                !queryParams4MainScene?.objectIdOfSelectedScene
            ) {
                setClippingGeometry(null);
                return;
            }

            const token = getToken();

            if (!token) {
                setClippingGeometry(null);
                return;
            }

            try {
                const feature = await getFeatureByObjectId(
                    serviceUrl,
                    queryParams4MainScene.objectIdOfSelectedScene,
                    {
                        token,
                    }
                );

                const clippingGeometry = feature?.geometry as Geometry;

                setClippingGeometry(clippingGeometry);
            } catch (error) {
                console.error('failed to get clipping geometry', error);
                setClippingGeometry(null);
            }
        })();
    }, [queryParams4MainScene?.objectIdOfSelectedScene]);

    return clippingGeometry;
};
