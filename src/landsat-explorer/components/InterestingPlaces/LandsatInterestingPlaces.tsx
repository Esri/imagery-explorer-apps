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

import React, { useMemo } from 'react';
import { data } from './data';
import { InterestingPlaces } from '@shared/components/InterestingPlaces';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

export const LandsatInterestingPlaces = () => {
    const { t } = useTranslation();

    const localizedData = useMemo(() => {
        return data.map((item) => {
            return {
                ...item,
                label: t(item.label, {
                    ns: APP_NAME,
                }),
                description: t(item.description, {
                    ns: APP_NAME,
                }),
                name: t(item.name, {
                    ns: APP_NAME,
                }),
            };
        });
    }, [data]);

    return <InterestingPlaces data={localizedData} />;
};
