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

export const Sentinel1InterestingPlaces = () => {
    const { t } = useTranslation();

    const translatedData = useMemo(() => {
        return data.map((place) => ({
            ...place,
            name: t(place.name, { ns: APP_NAME }),
            label: t(place.label, { ns: APP_NAME }),
            description: t(place.description, { ns: APP_NAME }),
        }));
    }, [data]);

    return <InterestingPlaces data={translatedData} isThreeColumnGrid={true} />;
};
