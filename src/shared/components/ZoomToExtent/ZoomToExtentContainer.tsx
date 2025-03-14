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

import React, { FC, useMemo, useState } from 'react';
import {
    selectAnimationStatus,
    selectIsAnimationPlaying,
} from '@shared/store/UI/selectors';
import MapView from '@arcgis/core/views/MapView';
import { useAppSelector } from '@shared/store/configureStore';
import { ZoomToExtent } from './ZoomToExtent';
import {
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
// import {
//     getExtentOfLandsatSceneByObjectId,
//     // getLandsatFeatureByObjectId,
// } from '@shared/services/landsat-level-2/getLandsatScenes';
import { getExtentByObjectId } from '@shared/services/helpers/getExtentById';
import { useTranslation } from 'react-i18next';

type Props = {
    /**
     * URL of the imagery service that will be used to get the extent by object id of selected scene
     */
    serviceUrl: string;
    mapView?: MapView;
};

export const ZoomToExtentContainer: FC<Props> = ({ serviceUrl, mapView }) => {
    const { t } = useTranslation();

    // const animationStatus = useAppSelector(selectAnimationStatus);

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const mode = useAppSelector(selectAppMode);

    const { objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const [isLoadingExtent, setIsLoadingExtent] = useState<boolean>(false);

    const disabled = useMemo(() => {
        if (mode === 'dynamic') {
            return false;
        }

        // zoom button should be disabled not in dynamic mode and there is no selected scene
        if (!objectIdOfSelectedScene) {
            return true;
        }

        return false;
    }, [mode, objectIdOfSelectedScene, isLoadingExtent]);

    const zoomToExtentOfSelectedScene = async () => {
        if (!objectIdOfSelectedScene) {
            return;
        }

        setIsLoadingExtent(true);

        try {
            const extent = await getExtentByObjectId({
                serviceUrl,
                objectId: objectIdOfSelectedScene,
            });
            mapView.extent = extent as any;
        } catch (err) {
            console.log(err);
        }

        setIsLoadingExtent(false);
    };

    return (
        <ZoomToExtent
            disabled={disabled}
            hidden={isAnimationPlaying}
            showLoadingIndicator={isLoadingExtent}
            tooltip={t('zoom_to_extent')}
            onClick={() => {
                if (!mapView) {
                    return;
                }

                if (mode === 'dynamic') {
                    mapView.zoom = 3;
                    return;
                }

                zoomToExtentOfSelectedScene();
            }}
        />
    );
};
