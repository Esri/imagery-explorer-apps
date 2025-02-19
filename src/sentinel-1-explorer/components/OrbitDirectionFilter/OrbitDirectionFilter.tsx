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

import { Button } from '@shared/components/Button';
import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import { Tooltip } from '@shared/components/Tooltip';
import { Sentinel1OrbitDirection } from '@typing/imagery-service';
import classNames from 'classnames';
import React, { FC, useMemo } from 'react';

type Props = {
    selectedOrbitDirection: Sentinel1OrbitDirection;
    orbitDirectionOnChange: (val: Sentinel1OrbitDirection) => void;
};

/**
 * This is the filter to select the Orbit Direction of the Sentinel-1 imagery scenes
 * @param param0
 * @returns
 */
export const OrbitDirectionFilter: FC<Props> = ({
    selectedOrbitDirection,
    orbitDirectionOnChange,
}) => {
    const data: DropdownData[] = useMemo(() => {
        const values: Sentinel1OrbitDirection[] = ['Ascending', 'Descending'];

        return values.map((val) => {
            return {
                value: val,
                selected: val === selectedOrbitDirection,
            } as DropdownData;
        });
    }, [selectedOrbitDirection]);

    return (
        <div className="flex items-center">
            {/* <Dropdown
                data={data}
                onChange={(val) => {
                    orbitDirectionOnChange(val as Sentinel1OrbitDirection);
                }}
            /> */}

            <Tooltip
                content={
                    'Sentinel-1 imagery is collected day and night, on both the light and dark sides of the Earth. As the satellite travels around the Earth, it naturally alternates orbit directions. The pass from north to south is Descending and the pass from south to north is Ascending. Orbit direction should be considered when comparing different images of the same location. For many applications, it is best to select images with the same orbit direction.'
                }
                width={280}
            >
                <div className="flex items-center mr-1">
                    <calcite-icon scale="s" icon="information" />
                </div>
            </Tooltip>

            {data.map((d) => {
                return (
                    <div
                        key={d.value}
                        onClick={() => {
                            orbitDirectionOnChange(
                                d.value as Sentinel1OrbitDirection
                            );
                        }}
                        className={classNames('px-2 mx-1 cursor-pointer', {
                            'bg-custom-light-blue-90': d.selected === true,
                            'text-custom-background': d.selected === true,
                            'bg-custom-light-blue-5': d.selected === false,
                        })}
                    >
                        <span className="text-xs uppercase">{d.value}</span>
                    </div>
                );
            })}
        </div>
    );
};
