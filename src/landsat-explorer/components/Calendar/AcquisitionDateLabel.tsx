import React, { FC } from 'react';

type Props = {
    acquisitionDate: string;
};

export const AcquisitionDateLabel: FC<Props> = ({ acquisitionDate }) => {
    if (!acquisitionDate) {
        return null;
    }

    return (
        <div className="text-xs mx-2">
            <span className="opacity-50 mr-2">Date</span>
            <span>{acquisitionDate}</span>
        </div>
    );
};
