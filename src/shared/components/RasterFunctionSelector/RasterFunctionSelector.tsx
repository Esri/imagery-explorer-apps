import React, { FC } from 'react';
import { RasterFunctionInfo } from '../../services/imagery-service/rasterFunctionInfos';

type Props = {
    nameOfSelectedRasterFunction: string;
    rasterFunctionInfo: RasterFunctionInfo[];
};

const RasterFunctionSelector: FC<Props> = ({
    nameOfSelectedRasterFunction,
    rasterFunctionInfo,
}) => {
    return <div>RasterFunctionSelector</div>;
};

export default RasterFunctionSelector;
