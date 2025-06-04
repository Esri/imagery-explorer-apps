import React, { FC } from 'react';

type OptionButtonProps = {
    label: string;
    icon: string;
    onClick: () => void;
};

export const OptionButton: FC<OptionButtonProps> = ({
    label,
    icon,
    onClick,
}) => {
    return (
        <div className="cursor-pointer flex items-center" onClick={onClick}>
            <calcite-icon icon={icon} scale="s" />
            <span className="ml-1 text-xs">{label}</span>
        </div>
    );
};
