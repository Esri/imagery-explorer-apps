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

import { watch } from '@arcgis/core/core/reactiveUtils';
import { Extent, Point } from '@arcgis/core/geometry';
import MapView from '@arcgis/core/views/MapView';
import { updateLocationOfSpectralSamplingPoint } from '@shared/store/SpectralSamplingTool/thunks';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
    mapView?: MapView;
};

export const CustomEventHandlers: FC<Props> = ({ mapView }) => {
    const dispatch = useDispatch();

    const initEventHandlers = async () => {
        mapView.on('click', (evt) => {
            dispatch(updateLocationOfSpectralSamplingPoint(evt.mapPoint));
            console.log(evt.mapPoint);
            // onClickHandler(evt.mapPoint);
        });
    };

    useEffect(() => {
        if (!mapView) {
            return;
        }

        initEventHandlers();
    }, [mapView]);

    return null;
};
