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
import { FormattedSpectralSamplingData } from './useFormattedSpectralSamplingData';
import classNames from 'classnames';
import { formatFormattedDateStrInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';

type Props = {
    data: FormattedSpectralSamplingData[];
    /**
     * fires when user select a sampling point
     * @param uniqueId
     * @returns
     */
    onSelect: (uniqueId: string) => void;
    /**
     * fires when user clicks on "Remove Point" button
     * @param uniqueId identifier of the sampling point to be removed
     * @returns void
     */
    onRemove: (uniqueId: string) => void;
    /**
     * emits when user mouseover/out a sampling point item in the list
     * @param uniqueId
     * @returns
     */
    item2HighlightOnToggle: (uniqueId?: string) => void;
};

export const SamplingPointsList: FC<Props> = ({
    data,
    onSelect,
    onRemove,
    item2HighlightOnToggle,
}) => {
    const getContent = (item: FormattedSpectralSamplingData) => {
        if (!item) {
            return null;
        }

        const { acquisitionDate, location, isLoading } = item;

        if (!acquisitionDate) {
            return 'Select a Date';
        }

        if (!location) {
            return 'Select a Location';
        }

        if (isLoading) {
            return (
                <div className="flex items-center justify-center">
                    <calcite-loader inline />
                    <span className="ml-1">fetching data</span>
                </div>
            );
        }

        const formattedAcquisitionDate =
            formatFormattedDateStrInUTCTimeZone(acquisitionDate);

        return (
            <div>
                <span>{formattedAcquisitionDate}</span>
                <br />
                <span>
                    {location.longitude.toFixed(4)},{' '}
                    {location.latitude.toFixed(4)}
                </span>
            </div>
        );
    };

    if (!data || !data.length) {
        return null;
    }

    return (
        <div className="max-h-[150px] fancy-scrollbar overflow-y-auto pr-1">
            {data.map((d) => {
                const { selected, uniqueId, isLoading } = d;
                return (
                    <div
                        key={uniqueId}
                        className={classNames(
                            'relative flex items-center px-1 h-[30px] mb-1',
                            'border border-custom-light-blue-80 cursor-pointer group',
                            {
                                'bg-custom-light-blue': selected,
                                'text-custom-background': selected,
                                'drop-shadow-custom-light-blue-50': selected,
                                'is-disabled': isLoading,
                            }
                        )}
                        onMouseOver={item2HighlightOnToggle.bind(
                            null,
                            uniqueId
                        )}
                        onMouseOut={item2HighlightOnToggle.bind(null, null)}
                    >
                        <div
                            className="w-full text-xs mr-1 text-center leading-[.9rem]"
                            onClick={onSelect.bind(null, uniqueId)}
                        >
                            {getContent(d)}
                        </div>

                        <div
                            // only show close icon when hover over the frame card, which is controlled by the `group-hover:block` class name
                            className="absolute top-0 right-0 hidden group-hover:block"
                            onClick={onRemove.bind(null, uniqueId)}
                        >
                            <calcite-icon
                                icon="x"
                                scale="s"
                                style={{
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
