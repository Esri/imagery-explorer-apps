import { saveSentinel2RasterFunctionToHashParams } from '@landcover-explorer/utils/URLHashParams';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { selectSatelliteImageryLayerRasterFunction } from '@shared/store/LandcoverExplorer/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import React, { FC, useEffect } from 'react';
import {
    SatelliteImageryRendererData,
    SatelliteImageryRenderersList,
} from './SatelliteImageryRenderersList';
import { satelliteImageryLayerRasterFunctionChanged } from '@shared/store/LandcoverExplorer/reducer';
import { updateTooltipData } from '@shared/store/UI/thunks';

type Props = {
    data: SatelliteImageryRendererData[];
};

export const SatelliteImageryRenderersListContainer: FC<Props> = ({ data }) => {
    const dispatch = useAppDispatch();

    const animationMode = useAppSelector(selectAnimationStatus);

    const selectedRasterFunction = useAppSelector(
        selectSatelliteImageryLayerRasterFunction
    );

    useEffect(() => {
        saveSentinel2RasterFunctionToHashParams(selectedRasterFunction);
    }, [selectedRasterFunction]);

    return (
        <SatelliteImageryRenderersList
            selectedRasterFunction={selectedRasterFunction}
            data={data}
            disabled={animationMode !== null}
            onSelect={(rasterFunction) => {
                dispatch(
                    satelliteImageryLayerRasterFunctionChanged(rasterFunction)
                );
            }}
            itemOnHover={(data) => {
                dispatch(updateTooltipData(data));
            }}
        />
    );
};
