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

import React, { FC } from 'react';
// import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { LULC_TIMESERIES_STORE } from '@landcover-explorer/constants';
import { APP_NAME } from '@shared/config';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@shared/store/configureStore';
import { selectAvaiableYearsForLandCoverLayer } from '@shared/store/LandcoverExplorer/selectors';

type Props = {
    // closeButtonOnClick: () => void;
};

const Header: FC<Props> = () => {
    const { t } = useTranslation();

    // const years = getAvailableYears();
    const years = useAppSelector(selectAvaiableYearsForLandCoverLayer);

    const getBulkDownloadLinks = () => {
        const links = years.map((year, index) => {
            const url = `${LULC_TIMESERIES_STORE}/lc${year}/lulc${year}.zip`;

            const separator = index === years.length - 1 ? ' ' : ', ';

            return (
                <span key={year}>
                    <a
                        className="underline"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        data-testid={`bulk-download-link-${year}`}
                    >
                        {year}
                    </a>
                    {separator}
                </span>
            );
        });

        return (
            <span>
                {t('bulk_download_instruction', { ns: APP_NAME })}: <br />{' '}
                {links}({t('zip_file_size_info', { ns: APP_NAME })}).
            </span>
        );
    };

    return (
        <div className="relative text-custom-light-blue flex justify-between items-center mb-4 z-10">
            <div className="flex items-center justify-between w-full">
                <h5 className="uppercase mr-4 mb-2 text-xl">
                    {t('download_panel_header', {
                        ns: APP_NAME,
                    })}
                </h5>

                <div className="text-sm text-left">
                    <span>
                        {t('download_panel_instruction', {
                            ns: APP_NAME,
                        })}
                    </span>{' '}
                    <br />
                    {getBulkDownloadLinks()}
                </div>
            </div>
        </div>
    );
};

export default Header;
