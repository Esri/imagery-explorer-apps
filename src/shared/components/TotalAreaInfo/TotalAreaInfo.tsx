import { selectIsMapUpdating } from '@shared/store/Map/selectors';
import { selectTotalVisibleArea } from '@shared/store/Map/selectors';
import { numberWithCommas } from 'helper-toolkit-ts';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

type Props = {
    /**
     * label text to be place next to the number of total area
     * that provide some context about what this total area is for (e.g. 'Estimated Mask Area')
     */
    label: string;
};

export const TotalVisibleAreaInfo: FC<Props> = ({ label }: Props) => {
    const totalArea = useSelector(selectTotalVisibleArea);

    const isMapUpdating = useSelector(selectIsMapUpdating);

    if (totalArea === null) {
        return null;
    }

    const getFormattedArea = () => {
        if (!totalArea) {
            return 0;
        }

        if (totalArea > 100) {
            return numberWithCommas(Math.floor(totalArea));
        }

        return totalArea.toFixed(2);
    };

    return (
        <div className="relative text-xs">
            {isMapUpdating ? (
                <div className="flex justify-end">
                    <calcite-loader inline />
                    <span>Loading...</span>
                </div>
            ) : (
                <p>
                    {label}: {getFormattedArea()} km²
                </p>
            )}
        </div>
    );
};
