/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    formatFormattedDateStrInUTCTimeZone,
    formatInUTCTimeZone,
} from '@shared/utils/date-time/formatInUTCTimeZone';
import React, { FC, useMemo } from 'react';
import { getFormattedDateTimeStrInUTC } from '../../utils/getFormattedTimestampInUTC';

type Props = {
    /**
     * acquisition timestamp of selected scene
     */
    acquisitionTimestamp: number;
    /**
     * fires when user clicks on the close button
     * @returns
     */
    closeBtnOnClick: () => void;
};

export const AcquisitionTimestampLabel: FC<Props> = ({
    acquisitionTimestamp,
    closeBtnOnClick,
}) => {
    const formattedAcquisitionTimestamp = useMemo(() => {
        if (!acquisitionTimestamp) {
            return '';
        }

        return getFormattedDateTimeStrInUTC(acquisitionTimestamp);
    }, [acquisitionTimestamp]);

    if (!formattedAcquisitionTimestamp) {
        return null;
    }

    return (
        <div
            className="text-xs mx-2 flex items-center"
            data-testid="acquisition-date-label"
            data-aququisition-timestamp={formattedAcquisitionTimestamp}
        >
            <div className="mr-1">
                {/* <span className="opacity-50 mr-2 uppercase">Date</span> */}
                <span className="">{formattedAcquisitionTimestamp}</span>
            </div>

            <div
                className="cursor-pointer"
                data-testid="reset-selected-date-btn"
                onClick={closeBtnOnClick}
            >
                <calcite-icon icon="x-circle" scale="s" />
            </div>
        </div>
    );
};
