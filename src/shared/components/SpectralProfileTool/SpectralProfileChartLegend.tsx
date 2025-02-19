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

import React, { FC } from 'react';

type Props = {
    /**
     * Name of the matched or user-selected feature of interest to be displayed along with the
     * spectral profile fetched from the selected location.
     */
    featureOfInterestName: string;
    /**
     * Fill color of the matched or user-selected feature of interest.
     */
    featureOfInterestFillColor: string;
};

type LegendItemProps = {
    label: string;
    fill: string;
    strokeDasharray?: string;
};

const LegendLineWidth = 16;
const LegendLineHeight = 2;

const LegendItem: FC<LegendItemProps> = ({ label, fill, strokeDasharray }) => {
    return (
        <div className="flex items-center">
            <svg
                height={LegendLineHeight}
                width={LegendLineWidth}
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <line
                    stroke={fill}
                    strokeWidth={3}
                    strokeDasharray={strokeDasharray}
                    x1="0"
                    x2={LegendLineWidth}
                    y1="0"
                    y2="0"
                />
            </svg>
            <span className="ml-2 text-xs text-custom-light-blue-80">
                {label}
            </span>
        </div>
    );
};

export const SpectralProfileChartLegend: FC<Props> = ({
    featureOfInterestName,
    featureOfInterestFillColor,
}) => {
    if (!featureOfInterestName) {
        return null;
    }

    return (
        <div className="w-full mt-3">
            <LegendItem
                label="Spectral profile of selected location"
                fill="var(--custom-light-blue-90)"
            />

            <LegendItem
                label={'Spectral profile of ' + featureOfInterestName}
                fill={featureOfInterestFillColor} //"var(--custom-light-blue-50)"
                strokeDasharray="3 1"
            />
        </div>
    );
};
