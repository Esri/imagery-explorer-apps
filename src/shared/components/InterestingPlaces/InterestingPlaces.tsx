import classNames from 'classnames';
import React, { FC } from 'react';
import { GirdCard } from '../GirdCard/GirdCard';

type Props = {
    data: {
        name: string;
        thumbnail: string;
        label: string;
    }[];
    nameOfSelectedPlace: string;
    onChange: (name: string) => void;
};

export const InterestingPlaces: FC<Props> = ({
    data,
    nameOfSelectedPlace,
    onChange,
}) => {
    return (
        <div
            className={classNames(
                'h-full w-auto mx-8 pr-8 border-r border-custom-light-blue-25'
            )}
        >
            <div className="text-center mb-3">
                <span className="uppercase text-sm">Interesting Places</span>
            </div>

            <div className="grid grid-cols-4 gap-[5px] pr-1">
                {data.map((d) => {
                    const { name, thumbnail, label } = d;

                    const selected = nameOfSelectedPlace === name;

                    return (
                        <GirdCard
                            key={name}
                            label={label || name}
                            thumbnail={thumbnail}
                            selected={selected}
                            onClick={() => {
                                onChange(name);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
