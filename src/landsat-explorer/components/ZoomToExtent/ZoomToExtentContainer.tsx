import React, { FC, useMemo, useState } from 'react';
import {
    selectAnimationStatus,
    selectIsAnimationPlaying,
} from '@shared/store/UI/selectors';
import MapView from '@arcgis/core/views/MapView';
import { useSelector } from 'react-redux';
import { ZoomToExtent } from '@shared/components/ZoomToExtent/ZoomToExtent';
import {
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/Landsat/selectors';
import {
    getExtentOfLandsatSceneByObjectId,
    getLandsatFeatureByObjectId,
} from '@shared/services/landsat-level-2/getLandsatScenes';

type Props = {
    mapView?: MapView;
};

export const ZoomToExtentContainer: FC<Props> = ({ mapView }) => {
    // const animationStatus = useSelector(selectAnimationStatus);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const mode = useSelector(selectAppMode);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

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
            const extent = await getExtentOfLandsatSceneByObjectId(
                objectIdOfSelectedScene
            );
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
            tooltip={'Zoom to Extent'}
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
