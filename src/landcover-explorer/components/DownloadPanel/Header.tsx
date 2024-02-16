import React, { FC } from 'react';
import { getAvailableYears } from '@landcover-explorer/services/sentinel-2-10m-landcover/timeInfo';
import { LULC_TIMESERIES_STORE } from '@landcover-explorer/constants';

type Props = {
    // closeButtonOnClick: () => void;
};

const Header: FC<Props> = () => {
    const years = getAvailableYears();

    const getBulkDownloadLinks = () => {
        const links = years.map((year, index) => {
            const url = `${LULC_TIMESERIES_STORE}/lc${year}/lulc${year}.zip`;

            const separator = index === years.length - 1 ? ' ' : ', ';

            return (
                <>
                    <a
                        className="underline"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {year}
                    </a>
                    {separator}
                </>
            );
        });

        return (
            <span>
                Alternatively, click on the following links to bulk download all
                tiles for each year as a zip file: <br /> {links}(Each annual
                zip download is approximately 60 GB).
            </span>
        );
    };

    return (
        <div className="relative text-custom-light-blue flex justify-between items-center mb-4 z-10">
            <div className="flex items-center justify-between w-full">
                <h5 className="uppercase mr-4 mb-2 text-xl">
                    Sentinel-2 10m Land Use/Land Cover Download
                </h5>

                <div className="text-sm text-left">
                    <span>
                        Click on the map to select a tile and year to download
                        individual GeoTIFF files.
                    </span>{' '}
                    <br />
                    {getBulkDownloadLinks()}
                </div>
            </div>
        </div>
    );
};

export default Header;
