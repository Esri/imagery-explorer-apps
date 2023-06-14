import { MaskMethod } from '@shared/store/Analysis/reducer';
import React, { FC, useMemo } from 'react';
import { Dropdown, DropdownData } from '../Dropdown';

type Props = {
    selectedMethod: MaskMethod;
    onChange: (val: MaskMethod) => void;
};

const MaskMethods: MaskMethod[] = ['water', 'vegetation', 'moisture'];

export const MethodList: FC<Props> = ({ selectedMethod, onChange }: Props) => {
    const data: DropdownData[] = useMemo(() => {
        return MaskMethods.map((method) => {
            return {
                value: method,
                label: method.toUpperCase(),
                selected: method === selectedMethod,
            };
        });
    }, [selectedMethod]);

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
