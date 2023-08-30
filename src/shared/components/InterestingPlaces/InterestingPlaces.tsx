import classNames from 'classnames';
import React, { FC, useRef } from 'react';
import { GirdCard } from '../GirdCard/GirdCard';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import useGetTooltipPositionOnHover from '@shared/hooks/useGetTooltipPositionOnHover';
import { InterestingPlaceData } from './data';

type Props = {
    data: InterestingPlaceData[];
    nameOfSelectedPlace: string;
    onChange: (name: string) => void;
    /**
     * Emits when user move mouse over/out an interesting place card
     * @param data
     * @returns
     */
    onHover: (data: InterestingPlaceData) => void;
};

export const InterestingPlaces: FC<Props> = ({
    data,
    nameOfSelectedPlace,
    onChange,
    onHover,
}) => {
    const containerRef = useRef<HTMLDivElement>();
    useGetTooltipPositionOnHover(containerRef);

    return (
        <div
            className={classNames({
                'h-full w-auto mx-8 pr-8 border-r border-custom-light-blue-25':
                    IS_MOBILE_DEVICE === false,
                'h-auto w-auto my-4 mx-4': IS_MOBILE_DEVICE === true,
            })}
            ref={containerRef}
        >
            <div className="text-center mb-3">
                <span className="uppercase text-sm">Interesting Places</span>
            </div>

            <div
                className={classNames('grid gap-[5px] pr-1', {
                    'grid-cols-4': IS_MOBILE_DEVICE === false,
                    'grid-cols-3': IS_MOBILE_DEVICE === true,
                })}
            >
                {data.map((d) => {
                    const { name, thumbnail } = d;

                    const selected = nameOfSelectedPlace === name;

                    return (
                        <div
                            key={name}
                            className="w-full he-full"
                            onMouseEnter={onHover.bind(null, d)}
                            onMouseLeave={onHover.bind(null, null)}
                        >
                            <GirdCard
                                label={name}
                                thumbnail={thumbnail}
                                selected={selected}
                                onClick={() => {
                                    onChange(name);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
