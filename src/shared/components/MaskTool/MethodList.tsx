import { SpectralIndex } from '@shared/store/Analysis/reducer';
import React, { FC, useMemo } from 'react';
import { Dropdown, DropdownData } from '../Dropdown';

type Props = {
    selectedSpectralIndex: SpectralIndex;
    onChange: (val: SpectralIndex) => void;
};

const MaskIndexOptions: {
    value: SpectralIndex;
    label?: string;
}[] = [
    {
        value: 'water',
        label: '',
    },
    {
        value: 'vegetation',
        label: '',
    },
    {
        value: 'moisture',
        label: '',
    },
];

export const MethodList: FC<Props> = ({
    selectedSpectralIndex,
    onChange,
}: Props) => {
    const data: DropdownData[] = useMemo(() => {
        return MaskIndexOptions.map((d) => {
            const { value, label } = d;
            return {
                value,
                label: label || value.toUpperCase(),
                selected: value === selectedSpectralIndex,
            };
        });
    }, [selectedSpectralIndex]);

    return (
        <div className="flex items-center w-full">
            <div className="flex items-center mr-4">
                <calcite-icon scale="s" icon="information" />
                <span className="uppercase text-sm ml-1">Mask Index</span>
            </div>

            <div className="flex-grow">
                <Dropdown data={data} onChange={onChange} />
            </div>

            <div className="ml-1 shrink-0 flex items-center cursor-pointer">
                <calcite-icon scale="s" icon="download-to" />
            </div>
        </div>
    );
};
