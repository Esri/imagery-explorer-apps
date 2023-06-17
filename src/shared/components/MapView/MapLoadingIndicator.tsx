import React, { FC } from 'react';

type Props = {
    /**
     * if true, show map loading indicator
     */
    active: boolean;
};

export const MapLoadingIndicator: FC<Props> = ({ active }: Props) => {
    if (!active) {
        return null;
    }

    return (
        <div className="flex items-center w-full h-full absolute top-0 left-0 pointer-events-none">
            <calcite-loader />
        </div>
    );
};
