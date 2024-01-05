import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';
import { formatFormattedDateStrInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import React, { FC, useMemo } from 'react';

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
    const formattedAcquisitionDate = useMemo(() => {
        if (!acquisitionDate) {
            return '';
        }

        // return format(timestamp, DATE_FORMAT);
        return formatFormattedDateStrInUTCTimeZone(acquisitionDate);
    }, [acquisitionDate]);

    if (!acquisitionDate) {
        return null;
    }

    return (
        <div className="text-xs mx-2 flex items-center">
            <div className="mr-1">
                {/* <span className="opacity-50 mr-2 uppercase">Date</span> */}
                <span className="">{formattedAcquisitionDate}</span>
            </div>

            <div className="cursor-pointer" onClick={closeBtnOnClick}>
                <calcite-icon icon="x-circle" scale="s" />
            </div>
        </div>
    );
};
