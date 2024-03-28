/* Copyright 2024 Esri
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

import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import { Sentinel1OrbitDirection } from '@typing/imagery-service';
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
        <div>
            <Dropdown
                data={data}
                onChange={(val) => {
                    orbitDirectionOnChange(val as Sentinel1OrbitDirection);
                }}
            />
        </div>
    );
};
