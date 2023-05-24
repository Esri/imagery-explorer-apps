import React, { FC } from 'react';
import classNames from 'classnames';
import { RasterFunctionInfo } from '@typing/imagery-service';

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
     * if true, Raster Function selector should be disabled
     */
    disabled: boolean;
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
    disabled,
    onChange,
}) => {
    return (
        <div
            className={classNames('h-full w-auto mx-2', {
                'is-disabled': disabled,
            })}
        >
            <div className="text-center mb-3">
                <span className="uppercase text-sm">Renderer</span>
            </div>

            <div className="grid grid-cols-3 gap-[5px]">
                {rasterFunctionInfos.slice(0, 9).map((d) => {
                    const { name, thumbnail, label } = d;

                    const selected = nameOfSelectedRasterFunction === name;

                    return (
                        <div
                            className={classNames(
                                'relative w-24 h-12 bg-cover cursor-pointer',
                                {
                                    'drop-shadow-custom-light-blue-90':
                                        selected,
                                }
                            )}
                            style={{
                                background: `url(${thumbnail})`,
                            }}
                            key={name}
                            onClick={onChange.bind(null, name)}
                        >
                            <div
                                className={classNames(
                                    'absolute top-0 left-0 w-full h-full bg-black ',
                                    {
                                        'bg-opacity-40': !selected,
                                        'bg-opacity-10': selected,
                                    }
                                )}
                            ></div>

                            <div className="absolute bottom-0 left-0 right-0 text-center text-ellipsis whitespace-nowrap overflow-hidden bg-gradient-to-t from-custom-background-85 z-10">
                                <span
                                    className="text-xs"
                                    // style={{
                                    //     textShadow: '1px 1px 2px rgba(191,238,255, .5)'
                                    // }}
                                >
                                    {label || name}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RasterFunctionSelector;
