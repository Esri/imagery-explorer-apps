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

import React, { FC, useEffect, useState } from 'react';
import { getCountries } from '@landcover-explorer/services/landcover-statistics/query';
import SelectorList, { SelectorListData } from './SelectorList';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

type Props = {
    selectedCountry: string;
    onChange: (country: string) => void;
};

const CountrySelector: FC<Props> = ({ selectedCountry, onChange }) => {
    const { t } = useTranslation();

    const [countries, setCountries] = useState<string[]>([]);

    const [listData, setListData] = useState<SelectorListData[]>([]);

    useEffect(() => {
        (async () => {
            const countries = await getCountries();
            setCountries(countries);
        })();
    }, []);

    useEffect(() => {
        if (countries) {
            const listData: SelectorListData[] = countries.map((value) => {
                return {
                    value,
                    label: value,
                };
            });

            setListData(listData);
        }
    }, [countries]);

    return (
        <SelectorList
            title={t('region', { ns: APP_NAME })}
            data={listData}
            valueOfSelectedItem={selectedCountry}
            placeholderText={t('current_map_extent', { ns: APP_NAME })}
            searchable={true}
            onChange={onChange}
        />
    );
};

export default CountrySelector;
