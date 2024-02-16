import React, { FC, useEffect, useState } from 'react';
import {
    getSubRegions,
    SubRegion,
} from '@landcover-explorer/services/landcover-statistics/query';
import SelectorList, { SelectorListData } from './SelectorList';

type Props = {
    selectedCountry: string;
    selectedSubRegion: string;
    onChange: (country: string) => void;
};

const SubRegionSelector: FC<Props> = ({
    selectedCountry,
    selectedSubRegion,
    onChange,
}) => {
    const [subRegions, setSubRegions] = useState<SubRegion[]>([]);

    const [listData, setListData] = useState<SelectorListData[]>([]);

    useEffect(() => {
        if (!selectedCountry) {
            return;
        }

        (async () => {
            const subRegions = await getSubRegions(selectedCountry);
            setSubRegions(subRegions);
        })();
    }, [selectedCountry]);

    useEffect(() => {
        if (subRegions) {
            const listData: SelectorListData[] = subRegions.map((item) => {
                const { name, ISOCode } = item;
                return {
                    value: ISOCode,
                    label: name,
                };
            });

            setListData(listData);
        }
    }, [subRegions]);

    return (
        <SelectorList
            title="Sub-Region"
            data={listData}
            valueOfSelectedItem={selectedSubRegion}
            placeholderText={'All'}
            searchable={true}
            onChange={onChange}
        />
    );
};

export default SubRegionSelector;
