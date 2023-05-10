import React, { useEffect, useState } from 'react';
import { RasterFunctionInfo } from '../../../shared/services/imagery-service/rasterFunctionInfos';
import { fetchRasterFunctionInfos } from '../../../shared/services/imagery-service/rasterFunctionInfos';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '../../config';
import { RasterFunctionSelector } from '../../../shared/components/RasterFunctionSelector';
import { useDispatch } from 'react-redux';
import { rasterFunctionNameChanged } from '../../../shared/store/Landsat/reducer';
import { useSelector } from 'react-redux';
import { selectLandsatRasterFunction } from '../../../shared/store/Landsat/selectors';

const RasterFunctionSelectorContainer = () => {
    const dispatch = useDispatch();

    const [rasterFunctionInfos, setRasterFunctionInfos] =
        useState<RasterFunctionInfo[]>();

    const nameOfSelectedRasterFunction = useSelector(
        selectLandsatRasterFunction
    );

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
            nameOfSelectedRasterFunction={nameOfSelectedRasterFunction}
            onChange={(rasterFunctionName) => {
                dispatch(rasterFunctionNameChanged(rasterFunctionName));
            }}
        />
    );
};

export default RasterFunctionSelectorContainer;
