import classNames from 'classnames';
import React, { FC, useRef } from 'react';
import useGetTooltipPositionOnHover from '@shared/hooks/useGetTooltipPositionOnHover';
import { TooltipData } from '@landcover-explorer/store/UI/reducer';
import HeaderText from '../HeaderText/HeaderText';
import {
    RasterFunctionData,
    Sentinel2RasterFunction,
} from './Sentinel2LayerRasterFunctionsListContainer';

type Props = {
    data: RasterFunctionData[];
    selectedRasterFunction?: Sentinel2RasterFunction;
    onSelect: (data?: Sentinel2RasterFunction) => void;
    /**
     * Fires when users hovers a land cover item in th list
     */
    itemOnHover: (data?: TooltipData) => void;
    /**
     * If true, all items are disabled, this can happen when the animation mode is on
     */
    disabled?: boolean;
};

const Sentinel2LayerRasterFunctionsList: FC<Props> = ({
    data,
    selectedRasterFunction,
    disabled,
    onSelect,
    itemOnHover,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>();
    useGetTooltipPositionOnHover(containerRef);

    return (
        <div className="text-center mx-4 my-4 md:my-0" ref={containerRef}>
            <HeaderText
                title="Visual Renderings"
                subTitle="Click to Toggle Visibility"
            />

            <div
                className={classNames('grid grid-cols-2 h-28 text-sm mt-4', {
                    'disabled-when-animation-mode-is-on': disabled,
                })}
            >
                {data.map((d) => {
                    const { name, label, description, thumbnail } = d;

                    const isSelected = name === selectedRasterFunction;

                    return (
                        <div
                            key={name}
                            className={classNames(
                                'flex items-center mx-6 mb-2 cursor-pointer',
                                {
                                    'opacity-50':
                                        selectedRasterFunction &&
                                        isSelected === false,
                                }
                            )}
                            onClick={onSelect.bind(null, name)}
                            onMouseEnter={() => {
                                itemOnHover({
                                    content: description,
                                });
                            }}
                            onMouseLeave={() => {
                                itemOnHover(null);
                            }}
                        >
                            <img src={thumbnail} />
                            <span className="ml-2">{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sentinel2LayerRasterFunctionsList;
