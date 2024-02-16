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

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { shouldShowSentinel2LayerToggled } from '@landcover-explorer/store/LandcoverExplorer/reducer';
import { selectShouldShowSentinel2Layer } from '@landcover-explorer/store/LandcoverExplorer/selectors';
import {
    showDownloadPanelToggled,
    showSaveWebMapToggled,
} from '@landcover-explorer/store/UI/reducer';
import { selectAnimationMode } from '@landcover-explorer/store/UI/selectors';
import { saveshowImageryLayerToHashParams } from '@landcover-explorer/utils/URLHashParams';
import LayerSelector from './LayerSelector';

const LayerSelectorContainer = () => {
    const dispatch = useDispatch();

    const animationMode = useSelector(selectAnimationMode);

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    useEffect(() => {
        saveshowImageryLayerToHashParams(shouldShowSentinel2Layer);
    }, [shouldShowSentinel2Layer]);

    return (
        <LayerSelector
            shouldShowSentinel2Layer={shouldShowSentinel2Layer}
            disabled={animationMode !== null}
            imageryButtonOnClick={() => {
                dispatch(shouldShowSentinel2LayerToggled(true));
            }}
            landcoverButtonOnClick={() => {
                dispatch(shouldShowSentinel2LayerToggled(false));
            }}
            downloadLandcoverButtonOnClick={() => {
                dispatch(showDownloadPanelToggled(true));
            }}
            saveWebMapButtonOnClick={() => {
                dispatch(showSaveWebMapToggled());
            }}
        />
    );
};

export default LayerSelectorContainer;
