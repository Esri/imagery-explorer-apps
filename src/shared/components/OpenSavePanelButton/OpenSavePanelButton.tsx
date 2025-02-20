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

import classNames from 'classnames';
import React, { FC } from 'react';
import { MapActionButton } from '../MapActionButton/MapActionButton';
import { useAppSelector } from '@shared/store/configureStore';
import { selectPendingRasterAnalysisJobs } from '@shared/store/PublishAndDownloadJobs/selectors';

type Props = {
    /**
     * if true, this button should be disabled
     */
    disabled?: boolean;
    /**
     * if true, hide the button
     */
    hidden?: boolean;
    /**
     * if true, show loading indicator
     */
    showLoadingIndicator?: boolean;
    /**
     * tooltip text for the button
     */
    tooltip?: string;
    /**
     * emit when user click on
     * @returns void
     */
    onClick: () => void;
};

export const OpenSavePanelButton: FC<Props> = ({
    disabled,
    hidden,
    showLoadingIndicator,
    tooltip,
    onClick,
}) => {
    const pendingJobs = useAppSelector(selectPendingRasterAnalysisJobs);

    const showIndicator4PendingJobs = pendingJobs.length > 0;

    return (
        <MapActionButton
            showLoadingIndicator={showLoadingIndicator}
            tooltip={tooltip}
            disabled={disabled}
            onClickHandler={onClick}
        >
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                >
                    <path
                        fill="currentColor"
                        d="M16.765 2c1.187 0 1.363.06 1.51.168L21.662 4.7a.845.845 0 0 1 .339.677v15.78a.844.844 0 0 1-.844.844H2.844A.844.844 0 0 1 2 21.156V2.844A.844.844 0 0 1 2.844 2zM17 21v-7H7v7zM14 3v3h1V3zM7 3v6h10V3h-1v4h-3V3zM3 21h3v-8h12v8h3V5.452l-3-2.278v6.17a.769.769 0 0 1-.844.656H6.844A.769.769 0 0 1 6 9.344V3H3z"
                    />
                    <path fill="none" d="M0 0h24v24H0z" />
                </svg>
            </div>

            {showIndicator4PendingJobs && (
                <div
                    className=" absolute bottom-[-12px] right-[-12px] p-1 rounded-full bg-calcite-green-70 border border-white"
                    title={`${pendingJobs.length} pending job(s)`}
                >
                    <calcite-loader
                        inline
                        scale="s"
                        style={{
                            'padding-right': 0,
                            'margin-right': 0,
                        }}
                    />
                </div>
            )}
        </MapActionButton>
    );
};
