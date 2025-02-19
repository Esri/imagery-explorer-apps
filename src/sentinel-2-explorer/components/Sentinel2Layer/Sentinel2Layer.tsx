/* Copyright 2025 Esri
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

import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useMemo } from 'react';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import ImageryLayerByObjectID from '@shared/components/ImageryLayer/ImageryLayerByObjectID';
import MosaicRule from '@arcgis/core/layers/support/MosaicRule';
import {
    SENTINEL2_SERVICE_SORT_FIELD,
    SENTINEL2_SERVICE_SORT_VALUE,
    SENTINEL_2_SERVICE_URL,
} from '@shared/services/sentinel-2/config';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const Sentinel2Layer: FC<Props> = ({ mapView, groupLayer }: Props) => {
    const defaultMosaicRule = useMemo(() => {
        return new MosaicRule({
            ascending: true,
            method: 'attribute',
            operation: 'first',
            sortField: SENTINEL2_SERVICE_SORT_FIELD,
            sortValue: SENTINEL2_SERVICE_SORT_VALUE,
        });
    }, []);

    return (
        <ImageryLayerByObjectID
            groupLayer={groupLayer}
            serviceUrl={SENTINEL_2_SERVICE_URL}
            defaultMosaicRule={defaultMosaicRule}
        />
    );
};
