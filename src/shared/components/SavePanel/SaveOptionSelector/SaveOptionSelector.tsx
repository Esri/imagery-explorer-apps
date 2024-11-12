import React, { FC } from 'react';
import { SavePanelOption } from '../SavePanelContainer';
import classNames from 'classnames';

type SaveOptionSelectorData = {
    value: SavePanelOption;
    label: string;
};

const DATA: SaveOptionSelectorData[] = [
    {
        value: 'create hosted imagery layer',
        label: 'Publish Hosted Imagery Layer',
    },
    {
        value: 'download imagery scene',
        label: 'Download Imagery Scene',
    },
    {
        value: 'create web map',
        label: 'Create Web Map',
    },
    {
        value: 'create web mapping application',
        label: 'Create Web Mapping Application',
    },
];

type SaveOptionSelectorProps = {
    selectedOption: SavePanelOption;
    selecedOptionChanged: (option: SavePanelOption) => void;
};

export const SaveOptionSelector: FC<SaveOptionSelectorProps> = ({
    selectedOption,
    selecedOptionChanged,
}) => {
    return (
        <div className="w-full grid grid-cols-4">
            {DATA.map((data: SaveOptionSelectorData) => {
                return (
                    <div
                        key={data.value}
                        className={classNames('text-center cursor-pointer', {
                            'opacity-50': selectedOption !== data.value,
                        })}
                        onClick={() => selecedOptionChanged(data.value)}
                    >
                        {data.label}
                    </div>
                );
            })}
        </div>
    );
};
