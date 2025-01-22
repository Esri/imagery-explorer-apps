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

import React, { FC, useMemo, useState } from 'react';
import {
    selectAnimationStatus,
    selectIsAnimationPlaying,
} from '@shared/store/UI/selectors';
import MapView from '@arcgis/core/views/MapView';
import { useAppSelector } from '@shared/store/configureStore';
import { selectAppMode } from '@shared/store/ImageryScene/selectors';
// import {
//     getExtentOfLandsatSceneByObjectId,
//     // getLandsatFeatureByObjectId,
// } from '@shared/services/landsat-level-2/getLandsatScenes';
import { getExtentByObjectId } from '@shared/services/helpers/getExtentById';
import { OpenSavePanelButton } from './OpenSavePanelButton';
import { showSavePanelToggled } from '@shared/store/UI/reducer';
import { useAppDispatch } from '@shared/store/configureStore';

type Props = {
    // mapView?: MapView;
};

export const OpenSavePanelButtonContainer: FC<Props> = () => {
    // const animationStatus = useAppSelector(selectAnimationStatus);

    const dispatch = useAppDispatch();

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    // const mode = useAppSelector(selectAppMode);

    // const disabled = useMemo(() => {
    //     return false;
    // }, []);

    return (
        <div className=" hidden md:block">
            <OpenSavePanelButton
                disabled={false}
                hidden={isAnimationPlaying}
                showLoadingIndicator={false}
                tooltip={'Open Save Panel'}
                onClick={() => {
                    dispatch(showSavePanelToggled());
                }}
            />
        </div>
    );
};
