import React from 'react';
import { SceneInfo } from './SceneInfo';
import { useSelector } from 'react-redux';
import { selectQueryParams4SceneInSelectedMode } from '../../../shared/store/Landsat/selectors';

export const SceneInfoContainer = () => {
    const queryParams4SelectedScene = useSelector(
        selectQueryParams4SceneInSelectedMode
    );

    if (!queryParams4SelectedScene?.objectIdOfSelectedScene) {
        return null;
    }

    return <SceneInfo data={null} />;
};
