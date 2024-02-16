import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { shouldShowSentinel2LayerToggled } from '@landcover-explorer/store/Map/reducer';
import { selectShouldShowSentinel2Layer } from '@landcover-explorer/store/Map/selectors';
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
