import React, { FC } from 'react';

type Props = {
    direction: 'previous' | 'next';
    disabled: boolean;
    onClick: () => void;
};

export const PaginationButton: FC<Props> = ({
    direction,
    disabled,
    onClick,
}) => {
    return (
        <calcite-button
            appearance="transparent"
            kind="neutral"
            disabled={disabled}
            onClick={onClick}
            iconStart={direction === 'previous' ? 'chevron-left' : undefined}
            iconEnd={direction === 'next' ? 'chevron-right' : undefined}
            scale="l"
        ></calcite-button>
    );
};
