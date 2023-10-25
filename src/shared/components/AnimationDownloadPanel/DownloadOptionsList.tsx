import React, { FC, useRef } from 'react';
import { VIDEO_SIZE_OPTIONS } from './config';

type DimensionInfoProps = {
    width: number;
    height: number;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};

/**
 * size of the icon that will be used to preview the dimension
 */
const DIMENSION_ICON_SIZE = 32;

/**
 * this is the max size of the output video that we support
 */
const MAX_SIZE_OUTPUT_VIDEO = 1920;

const DimensionInfo: FC<DimensionInfoProps> = ({
    width,
    height,
    onClick,
    onMouseEnter,
    onMouseLeave,
}) => {
    // const mouseLeaveDelay = useRef<NodeJS.Timeout>()

    // const handleMouseEnter = ()=>{
    //     clearTimeout(mouseLeaveDelay.current)
    //     onMouseEnter()
    // }

    // const handlerMouseLeave = ()=>{
    //     mouseLeaveDelay.current = setTimeout(()=>{
    //         onMouseLeave()
    //     }, 1000)
    // }

    const getDimensionIcon = () => {
        return (
            <div className="flex items-center justify-center w-[32px] h-[32px] mr-2">
                <div
                    className="bg-custom-light-blue-90"
                    style={{
                        width:
                            DIMENSION_ICON_SIZE *
                            (width / MAX_SIZE_OUTPUT_VIDEO),
                        height:
                            DIMENSION_ICON_SIZE *
                            (height / MAX_SIZE_OUTPUT_VIDEO),
                    }}
                ></div>
            </div>
        );
    };

    return (
        <div
            className="flex items-center opacity-70 hover:opacity-100 cursor-pointer"
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {getDimensionIcon()}
            <span className=" text-xs hover:underline">
                {width} x {height}
            </span>
        </div>
    );
};

type Props = {
    /**
     * emits when user hovers an option list item
     * @param size [width, height] of output video
     * @returns void
     */
    onMouseEnter: (sizes?: number[]) => void;
    onMouseLeave: () => void;
    /**
     * emits when user clicks an option list item
     * @param size [width, height] of output video
     * @returns void
     */
    onClick: (sizes?: number[]) => void;
};

export const DownloadOptionsList: FC<Props> = ({
    onMouseEnter,
    onMouseLeave,
    onClick,
}) => {
    return (
        <div className="relative w-full p-2">
            {VIDEO_SIZE_OPTIONS.map((d) => {
                const { title, dimensions } = d;

                return (
                    <div className="text-center mb-3" key={title}>
                        <h4 className="uppercase text-sm text-custom-light-blue-50">
                            {title}
                        </h4>
                        <div className="pl-6">
                            {dimensions.map((size) => {
                                const [w, h] = size;

                                return (
                                    <DimensionInfo
                                        key={`${w}-${h}`}
                                        width={w}
                                        height={h}
                                        onClick={onClick.bind(null, size)}
                                        onMouseEnter={onMouseEnter.bind(
                                            null,
                                            size
                                        )}
                                        onMouseLeave={onMouseLeave}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
