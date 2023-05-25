import React, { FC } from 'react';

type Props = {
    /**
     * selected acquisition date in format of `yyyy-mm-dd`
     */
    acquisitionDate: string;
    /**
     * fires when user clicks on the close button
     * @returns
     */
    closeBtnOnClick: () => void;
};

export const AcquisitionDateLabel: FC<Props> = ({
    acquisitionDate,
    closeBtnOnClick,
}) => {
    if (!acquisitionDate) {
        return null;
    }

    return (
        <div className="text-xs mx-2 flex items-center">
            <div className="mr-1">
                <span className="opacity-50 mr-2">Date</span>
                <span>{acquisitionDate}</span>
            </div>

            <div className="cursor-pointer" onClick={closeBtnOnClick}>
                <calcite-icon icon="x-circle" scale="s" />
            </div>
        </div>
    );
};
