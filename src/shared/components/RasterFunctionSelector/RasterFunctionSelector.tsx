import React, { FC } from 'react';
import { RasterFunctionInfo } from '../../services/imagery-service/rasterFunctionInfos';

type Props = {
    /**
     * name of selected raster function
     */
    nameOfSelectedRasterFunction: string;
    /**
     * list of available raster functions
     */
    rasterFunctionInfo: RasterFunctionInfo[];
    /**
     * Fires when user selects a new raster function
     * @param name name of new raster function
     * @returns
     */
    onChange: (name: string) => void;
};

const RasterFunctionSelector: FC<Props> = ({
    nameOfSelectedRasterFunction,
    rasterFunctionInfo,
    onChange,
}) => {
    return <div>RasterFunctionSelector</div>;
};

export default RasterFunctionSelector;
