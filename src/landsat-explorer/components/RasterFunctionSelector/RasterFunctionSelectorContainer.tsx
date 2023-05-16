import React, { useEffect, useState } from 'react';
import { RasterFunctionInfo } from '../../../shared/services/imagery-service/rasterFunctionInfos';
import { fetchRasterFunctionInfos } from '../../../shared/services/imagery-service/rasterFunctionInfos';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '../../config';
import { RasterFunctionSelector } from '../../../shared/components/RasterFunctionSelector';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectLandsatQueryParams4SelectedMode } from '../../../shared/store/Landsat/selectors';
import { updateRasterFunctionName } from '../../../shared/store/Landsat/thunks';

const RasterFunctionSelectorContainer = () => {
    const dispatch = useDispatch();

    const [rasterFunctionInfos, setRasterFunctionInfos] =
        useState<RasterFunctionInfo[]>();

    const {
        rasterFunctionName,
        // objectIdOfSelectedScene
    } = useSelector(selectLandsatQueryParams4SelectedMode);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchRasterFunctionInfos(
                    LANDSAT_LEVEL_2_SERVICE_URL
                );
                setRasterFunctionInfos(res.rasterFunctionInfos);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    if (!rasterFunctionInfos || !rasterFunctionInfos.length) {
        return null;
    }

    return (
        <RasterFunctionSelector
            rasterFunctionInfos={rasterFunctionInfos}
            nameOfSelectedRasterFunction={rasterFunctionName}
            onChange={(rasterFunctionName) => {
                dispatch(updateRasterFunctionName(rasterFunctionName));
            }}
        />
    );
};

export default RasterFunctionSelectorContainer;
