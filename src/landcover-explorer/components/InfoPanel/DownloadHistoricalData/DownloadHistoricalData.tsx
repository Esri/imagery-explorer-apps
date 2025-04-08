import { APP_NAME } from '@shared/config';
import { HistoricalLandCoverData } from '@shared/services/sentinel-2-10m-landcover/computeHistograms';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { formatHistoricalData } from './formateHistoricalData';
import { downloadBlob } from '@shared/utils/snippets/downloadBlob';

type Props = {
    data: HistoricalLandCoverData[];
    /**
     * Name of selected country, if selected country is defined (and selectedSubRegion is not defined), show land cover stats for selected country
     */
    selectedCountry: string;
    /**
     * ISO Code of selected region. if selected sub region is defined, show land cover stats for selected sub region
     */
    selectedSubRegion: string;
};

/**
 * DownloadHistoricalData component allows users to download historical land cover data as a CSV file.
 *
 * @param {Object} props - The component props.
 * @param {HistoricalLandCoverData[]} props.data - The historical land cover data to be downloaded.
 * @returns {JSX.Element|null} The rendered component or null if no data is provided.
 */
export const DownloadHistoricalData: FC<Props> = ({
    data,
    selectedCountry,
    selectedSubRegion,
}: Props): JSX.Element | null => {
    const { t } = useTranslation();

    const handleDownload = () => {
        // Convert data to CSV format
        const csvData = formatHistoricalData(data);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

        const nameOfSelectedRegion =
            selectedCountry || selectedSubRegion
                ? [selectedCountry, selectedSubRegion]
                      .filter((region) => region)
                      .join('_')
                : '';

        const fileName = nameOfSelectedRegion
            ? `historical-landcover-data-${nameOfSelectedRegion}.csv`
            : 'historical-landcover-data.csv';

        downloadBlob(blob, fileName);
    };

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div
            style={
                {
                    '--calcite-button-border-color': 'var(--custom-light-blue)',
                    '--calcite-button-text-color': 'var(--custom-light-blue)',
                } as React.CSSProperties
            }
        >
            <div className="mb-2">
                {t('download_historical_data', { ns: APP_NAME })}
            </div>
            <calcite-button
                icon-start="download"
                appearance="outline"
                Kind="neutral"
                onClick={handleDownload}
            >
                {t('donwload_as_csv', {
                    ns: APP_NAME,
                })}
            </calcite-button>
        </div>
    );
};
