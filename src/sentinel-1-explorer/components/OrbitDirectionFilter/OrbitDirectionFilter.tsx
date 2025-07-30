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

import { CalciteIcon } from '@esri/calcite-components-react';
import { Button } from '@shared/components/Button';
import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import { Tooltip } from '@shared/components/Tooltip';
import { APP_NAME } from '@shared/config';
import { Sentinel1OrbitDirection } from '@typing/imagery-service';
import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const data: DropdownData[] = useMemo(() => {
        const values: Sentinel1OrbitDirection[] = ['Ascending', 'Descending'];

        return values.map((val) => {
            return {
                value: val,
                label: t(val, { ns: APP_NAME }),
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
                content={t('orbit_filter_tooltip', { ns: APP_NAME })}
                width={280}
            >
                <div className="flex items-center mr-1">
                    <CalciteIcon scale="s" icon="information" />
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
                        <span className="text-xs uppercase">
                            {d.label || d.value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
