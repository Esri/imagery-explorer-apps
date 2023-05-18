import React, { FC } from 'react';
import { RasterFunctionInfo } from '../../services/imagery-service/rasterFunctionInfos';
import classNames from 'classnames';

type Props = {
    /**
     * name of selected raster function
     */
    nameOfSelectedRasterFunction: string;
    /**
     * list of available raster functions
     */
    rasterFunctionInfos: RasterFunctionInfo[];
    /**
     * Fires when user selects a new raster function
     * @param name name of new raster function
     * @returns
     */
    onChange: (name: string) => void;
};

const RasterFunctionSelector: FC<Props> = ({
    nameOfSelectedRasterFunction,
    rasterFunctionInfos,
    onChange,
}) => {
    return (
        <div
            className={classNames('h-full w-auto', {
                'is-disabled': !nameOfSelectedRasterFunction,
            })}
        >
            <div className="grid grid-cols-3 gap-1">
                {rasterFunctionInfos.slice(0, 9).map((d) => {
                    const { name, thumbnail } = d;

                    const selected = nameOfSelectedRasterFunction === name;

                    return (
                        <div
                            className="relative w-28 h-14 bg-cover"
                            style={{
                                background: `url(${thumbnail})`,
                            }}
                            key={name}
                        >
                            <div
                                className={classNames(
                                    'absolute top-0 left-0 w-full h-full bg-black flex items-end p-1 cursor-pointer',
                                    {
                                        'bg-opacity-60': !selected,
                                        'bg-opacity-20': selected,
                                    }
                                )}
                                onClick={onChange.bind(null, name)}
                            >
                                <div className="text-ellipsis whitespace-nowrap overflow-hidden">
                                    <span className="text-xs shadow">
                                        {name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RasterFunctionSelector;
