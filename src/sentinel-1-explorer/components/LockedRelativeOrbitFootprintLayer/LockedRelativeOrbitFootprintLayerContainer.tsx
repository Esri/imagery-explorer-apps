/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import GroupLayer from '@arcgis/core/layers/GroupLayer';
import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useLockedRelativeOrbit } from '../../hooks/useLockedRelativeOrbit';
import { LockedRelativeOrbitFootprintLayer } from './LockedRelativeOrbitFootprintLayer';
import { IFeature } from '@esri/arcgis-rest-feature-service';
import { getFeatureByObjectId } from '@shared/services/helpers/getFeatureById';
import { SENTINEL_1_SERVICE_URL } from '@shared/services/sentinel-1/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { selectLockedRelativeOrbit } from '@shared/store/Sentinel1/selectors';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const LockedRelativeOrbitFootprintLayerContainer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    /**
     * Locked relative orbit to be used by the different Analyze tools (e.g. temporal composite and change compare)
     */
    const { lockedRelativeOrbit, objectIdOfSceneWithLockedRelativeOrbit } =
        useAppSelector(selectLockedRelativeOrbit) || {};

    const { objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const [footPrintFeature, setFootPrintFeature] = useState<IFeature>();

    const isVisible = useMemo(() => {
        // no need to show it if user has already selected an scene
        if (objectIdOfSelectedScene) {
            return false;
        }

        return lockedRelativeOrbit !== undefined;
    }, [lockedRelativeOrbit, objectIdOfSelectedScene]);

    useEffect(() => {
        (async () => {
            const feature = objectIdOfSceneWithLockedRelativeOrbit
                ? await getFeatureByObjectId(
                      SENTINEL_1_SERVICE_URL,
                      objectIdOfSceneWithLockedRelativeOrbit
                  )
                : null;

            setFootPrintFeature(feature);
        })();
    }, [objectIdOfSceneWithLockedRelativeOrbit]);

    return (
        <LockedRelativeOrbitFootprintLayer
            mapView={mapView}
            groupLayer={groupLayer}
            visible={isVisible}
            footPrintFeature={footPrintFeature}
        />
    );
};
