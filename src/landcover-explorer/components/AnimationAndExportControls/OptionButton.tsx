import classNames from 'classnames';
import React, { FC } from 'react';

type OptionButtonProps = {
    label: string;
    icon: string;
    /**
     * If true, the button is disabled and cannot be clicked.
     */
    disabled?: boolean;
    onClick: () => void;
};

export const OptionButton: FC<OptionButtonProps> = ({
    label,
    icon,
    disabled = false,
    onClick,
}) => {
    return (
        <div
            className={classNames('cursor-pointer flex items-center', {
                'opacity-50 pointer-events-none': disabled,
            })}
            onClick={onClick}
        >
            <calcite-icon icon={icon} scale="s" />
            <span className="ml-1 text-xs">{label}</span>
        </div>
    );
};
