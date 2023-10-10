import MapView from 'esri/views/MapView';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/Landsat/selectors';
import GroupLayer from 'esri/layers/GroupLayer';
import { ChangeLayer } from './ChangeLayer';
import {
    selectIsViewingChangeInChangeCompareTool,
    selectSpectralIndex4ChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const ChangeLayerContainer: FC<Props> = ({ mapView, groupLayer }) => {
    const mode = useSelector(selectAppMode);

    const spectralIndex = useSelector(selectSpectralIndex4ChangeCompareTool);

    const isViewingChange = useSelector(
        selectIsViewingChangeInChangeCompareTool
    );

    const queryParams4SceneA = useSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useSelector(selectQueryParams4SecondaryScene);

    const anailysisTool = useSelector(selectActiveAnalysisTool);

    const isVisible = useMemo(() => {
        if (mode !== 'analysis') {
            return false;
        }

        if (anailysisTool !== 'change') {
            return false;
        }

        if (
            !queryParams4SceneA?.objectIdOfSelectedScene ||
            !queryParams4SceneB?.objectIdOfSelectedScene
        ) {
            return false;
        }

        return isViewingChange;
    }, [
        mode,
        anailysisTool,
        isViewingChange,
        queryParams4SceneA,
        queryParams4SceneB,
    ]);

    return (
        <ChangeLayer
            mapView={mapView}
            groupLayer={groupLayer}
            spectralIndex={spectralIndex}
            visible={isVisible}
            queryParams4SceneA={queryParams4SceneA}
            queryParams4SceneB={queryParams4SceneB}
            selectedRange={[-2, 2]}
        />
    );
};
