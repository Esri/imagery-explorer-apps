import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useMemo } from 'react';
import useLandsatLayer from './useLandsatLayer';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectActiveAnalysisTool,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import {
    selectActiveScene4ChangeCompareTool,
    selectChangeCompareLayerIsOn,
} from '@shared/store/ChangeCompareTool/selectors';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

/**
 * The change tool allows user to pick up two different Landsat scenes and compare the difference
 * between those two scenes.
 *
 * This Layer allows user to see the selected Landsat Scene on the map.
 * @param param0
 * @returns
 */
export const LandsatLayer4ChangeTool: FC<Props> = ({
    mapView,
    groupLayer,
}: Props) => {
    const mode = useSelector(selectAppMode);

    const queryParams4MainScene =
        useSelector(selectQueryParams4MainScene) || {};

    const queryParamsSecondaryScene =
        useSelector(selectQueryParams4SecondaryScene) || {};

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const changeCompareLayerIsOn = useSelector(selectChangeCompareLayerIsOn);

    const activeScene = useSelector(selectActiveScene4ChangeCompareTool);

    const queryParams4SelectedScene = useMemo(() => {
        return activeScene === 'scene a'
            ? queryParams4MainScene
            : queryParamsSecondaryScene;
    }, [queryParams4MainScene, queryParamsSecondaryScene, activeScene]);

    const getVisibility = () => {
        // no need to show it if Change Tool is inactive
        if (mode !== 'analysis' || analysisTool !== 'change') {
            return false;
        }

        // no need to show this layer if user wants to see the actual Difference comparison layer
        if (changeCompareLayerIsOn) {
            return false;
        }

        // no need to show if there is no selected scene
        if (!queryParams4SelectedScene.objectIdOfSelectedScene) {
            return false;
        }

        return true;
    };

    const layer = useLandsatLayer({
        visible: getVisibility(),
        rasterFunction: queryParams4SelectedScene?.rasterFunctionName,
        objectId: queryParams4SelectedScene?.objectIdOfSelectedScene,
    });

    useEffect(() => {
        if (groupLayer && layer) {
            groupLayer.add(layer);
        }
    }, [groupLayer, layer]);

    return null;
};
