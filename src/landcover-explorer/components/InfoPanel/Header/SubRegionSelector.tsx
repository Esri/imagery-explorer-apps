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
