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

import { selectIsMapUpdating } from '@shared/store/Map/selectors';
import { selectTotalVisibleArea } from '@shared/store/Map/selectors';
import { numberWithCommas } from 'helper-toolkit-ts';
import React, { FC } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { useTranslation } from 'react-i18next';
import { CalciteLoader } from '@esri/calcite-components-react';

type Props = {
    /**
     * label text to be place next to the number of total area
     * that provide some context about what this total area is for (e.g. 'Estimated Mask Area')
     */
    label: string;
};

export const TotalVisibleAreaInfo: FC<Props> = ({ label }: Props) => {
    const totalArea = useAppSelector(selectTotalVisibleArea);

    const isMapUpdating = useAppSelector(selectIsMapUpdating);

    const { t } = useTranslation();

    if (totalArea === null) {
        return null;
    }

    const getFormattedArea = () => {
        if (!totalArea) {
            return 0;
        }

        if (totalArea > 100) {
            return numberWithCommas(Math.floor(totalArea));
        }

        return totalArea.toFixed(2);
    };

    return (
        <div className="relative text-xs">
            {isMapUpdating ? (
                <div className="flex justify-end">
                    <CalciteLoader inline />
                    <span className="ml-1">{t('loading')}...</span>
                </div>
            ) : (
                <p>
                    {label}: {getFormattedArea()} km²
                </p>
            )}
        </div>
    );
};
