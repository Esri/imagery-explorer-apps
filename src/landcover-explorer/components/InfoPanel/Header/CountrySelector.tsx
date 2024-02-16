import React, { FC, useEffect, useState } from 'react';
import { getCountries } from '@landcover-explorer/services/landcover-statistics/query';
import SelectorList, { SelectorListData } from './SelectorList';

type Props = {
    selectedCountry: string;
    onChange: (country: string) => void;
};

const CountrySelector: FC<Props> = ({ selectedCountry, onChange }) => {
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
            title="Region"
            data={listData}
            valueOfSelectedItem={selectedCountry}
            placeholderText={'Current Map Extent'}
            searchable={true}
            onChange={onChange}
        />
    );
};

export default CountrySelector;
