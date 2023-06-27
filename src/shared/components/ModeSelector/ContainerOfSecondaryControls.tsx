import React, { FC } from 'react';

type Props = {
    children?: React.ReactNode;
};

export const ContainerOfSecondaryControls: FC<Props> = ({ children }) => {
    return (
        <div className="w-36 shrink-0 ml-space-between-main-secondary-selectors pl-space-between-main-secondary-selectors border-l border-custom-light-blue-50">
            {children}
        </div>
    );
};
