import React, { FC, useRef } from 'react';
import classNames from 'classnames';
import { RasterFunctionInfo } from '@typing/imagery-service';
import { GirdCard } from '../GirdCard/GirdCard';
import useGetTooltipPositionOnHover from '@shared/hooks/useGetTooltipPositionOnHover';
import { Tooltip } from '../Tooltip';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';

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
     * if true, Raster Function selector should be disabled
     */
    disabled: boolean;
    /**
     * Fires when user selects a new raster function
     * @param name name of new raster function
     * @returns
     */
    onChange: (name: string) => void;
    /**
     * Emits when users hovers a grid item in th list
     */
    itemOnHover: (data?: RasterFunctionInfo) => void;
};

export const RasterFunctionSelector: FC<Props> = ({
    nameOfSelectedRasterFunction,
    rasterFunctionInfo,
    disabled,
    onChange,
    itemOnHover,
}) => {
    const containerRef = useRef<HTMLDivElement>();
    useGetTooltipPositionOnHover(containerRef);

    return (
        <div
            className={classNames('h-full w-auto select-none', {
                'is-disabled': disabled,
                'mx-4': IS_MOBILE_DEVICE,
            })}
            ref={containerRef}
        >
            <div className="text-center mb-3 flex items-center justify-center">
                <Tooltip
                    content={`Landsat sensors collect imagery at distinct ranges along the electromagnetic spectrum. These “bands” of imagery can be combined to create renderings of the Earth for a variety of applications.`}
                    width={240}
                >
                    <calcite-icon scale="s" icon="information" />
                </Tooltip>

                <span className="uppercase ml-2 text-sm">Renderer</span>
            </div>

            <div className="grid grid-cols-3 gap-[5px] h-[155px] pr-1 overflow-x-hidden overflow-y-auto fancy-scrollbar">
                {rasterFunctionInfo.map((d) => {
                    const { name, thumbnail, label } = d;

                    const selected =
                        disabled === false &&
                        nameOfSelectedRasterFunction === name;

                    return (
                        // <div
                        //     className={classNames(
                        //         'relative w-24 h-12 bg-cover cursor-pointer'
                        //     )}
                        //     style={{
                        //         background: `url(${thumbnail})`,
                        //     }}
                        //     key={name}
                        //     onClick={onChange.bind(null, name)}
                        // >
                        //     <div
                        //         className={classNames(
                        //             'absolute top-0 left-0 w-full h-full',
                        //             {
                        //                 'border-2': selected,
                        //                 'border-custom-light-blue': selected,
                        //                 'drop-shadow-custom-light-blue':
                        //                     selected,
                        //             }
                        //         )}
                        //         style={{
                        //             background: `linear-gradient(0deg, rgba(2,28,36,1) 0%, rgba(2,28,36,0.6) 30%, rgba(2,28,36,0) 50%, rgba(2,28,36,0) 100%)`,
                        //         }}
                        //     ></div>

                        //     <div className="absolute bottom-0 left-0 right-0 text-center text-ellipsis whitespace-nowrap overflow-hidden z-10">
                        //         <span className="text-xs">{label || name}</span>
                        //     </div>
                        // </div>
                        <GirdCard
                            key={name}
                            label={label || name}
                            thumbnail={thumbnail}
                            selected={selected}
                            onClick={() => {
                                onChange(name);
                            }}
                            onMouseEnter={itemOnHover.bind(null, d)}
                            onMouseLeave={itemOnHover.bind(null, null)}
                        />
                    );
                })}
            </div>
        </div>
    );
};
