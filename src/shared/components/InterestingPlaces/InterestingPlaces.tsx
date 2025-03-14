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
import React, { FC, useRef } from 'react';
import { GirdCard } from '../GirdCard/GirdCard';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import useGetTooltipPositionOnHover from '@shared/hooks/useGetTooltipPositionOnHover';
import { InterestingPlaceData } from '@typing/shared';
import { useTranslation } from 'react-i18next';

type Props = {
    data: InterestingPlaceData[];
    nameOfSelectedPlace: string;
    /**
     * if true, use 3 columns grid instead of 4 columns
     */
    isThreeColumnGrid?: boolean;
    onChange: (name: string) => void;
    /**
     * Emits when user move mouse over/out an interesting place card
     * @param data
     * @returns
     */
    onHover: (data: InterestingPlaceData) => void;
};

export const InterestingPlaces: FC<Props> = ({
    data,
    nameOfSelectedPlace,
    isThreeColumnGrid,
    onChange,
    onHover,
}) => {
    const containerRef = useRef<HTMLDivElement>();
    useGetTooltipPositionOnHover(containerRef);

    const { t } = useTranslation();

    return (
        <div
            className={classNames({
                'h-full w-auto mx-8 pr-8 border-r border-custom-light-blue-25':
                    IS_MOBILE_DEVICE === false,
                'h-auto w-auto my-4 mx-4': IS_MOBILE_DEVICE === true,
            })}
            ref={containerRef}
        >
            <div className="text-center mb-3">
                <span className="uppercase text-sm">
                    {t('interesting_places')}
                </span>
            </div>

            <div
                className={classNames('grid gap-[5px] pr-1', {
                    'grid-cols-4':
                        IS_MOBILE_DEVICE === false && !isThreeColumnGrid,
                    'grid-cols-3':
                        IS_MOBILE_DEVICE === true || isThreeColumnGrid,
                })}
            >
                {data.map((d) => {
                    const { name, thumbnail } = d;

                    const selected = nameOfSelectedPlace === name;

                    return (
                        <div
                            key={name}
                            className="w-full he-full"
                            onMouseEnter={onHover.bind(null, d)}
                            onMouseLeave={onHover.bind(null, null)}
                        >
                            <GirdCard
                                label={name}
                                thumbnail={thumbnail}
                                selected={selected}
                                onClick={() => {
                                    onChange(name);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
