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

import { selectAnimationStatus } from '@shared/store/UI/selectors';
import classNames from 'classnames';
import MapView from '@arcgis/core/views/MapView';
import React, { FC } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { MapActionButton } from '../MapActionButton/MapActionButton';

type Props = {
    /**
     * native scale of the imagery service
     */
    nativeScale: number;
    tooltip: string;
    mapView?: MapView;
};

export const Zoom2NativeScale: FC<Props> = ({
    mapView,
    tooltip,
    nativeScale,
}) => {
    const onClickHandler = () => {
        // mapView.scale = 113386;

        mapView.goTo({
            scale: nativeScale,
        });
    };

    return (
        <MapActionButton
            // topPosition={130}
            onClickHandler={onClickHandler}
            tooltip={tooltip}
        >
            <span className="text-sm italic">1:1</span>
        </MapActionButton>
    );
};
