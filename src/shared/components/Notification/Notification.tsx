import React, { FC } from 'react';

type Props = {
    closeButtonOnClick: () => void;
    children?: React.ReactNode;
};

export const Notification: FC<Props> = ({ closeButtonOnClick, children }) => {
    return (
        <div
            className=" absolute left-0 right-0 bottom-bottom-panel-height text-custom-background flex justify-center py-1"
            style={{
                background: `linear-gradient(90deg, rgba(191,238,254,0) 0%, rgba(191,238,254,1) 20%, rgba(191,238,254,1) 80%, rgba(191,238,254,0) 100%)`,
            }}
        >
            {children}

            <div className="cursor-pointer" onClick={closeButtonOnClick}>
                <calcite-icon icon="x" scale="m" />
            </div>
        </div>
    );
};
