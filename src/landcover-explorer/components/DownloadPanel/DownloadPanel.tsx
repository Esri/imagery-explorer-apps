import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DWONLOAD_MODE_WEB_MAP_ID } from '@landcover-explorer/constants/map';
import { getAvailableYears } from '@landcover-explorer/services/sentinel-2-10m-landcover/timeInfo';
import { selectMapCenterAndZoom } from '@landcover-explorer/store/Map/selectors';
import { showDownloadPanelToggled } from '@landcover-explorer/store/UI/reducer';
import { selectShowDownloadPanel } from '@landcover-explorer/store/UI/selectors';
import { saveDonwloadModeToHashParams } from '@landcover-explorer/utils/URLHashParams';
import Header from './Header';
import LulcFootprintsLayer from './LulcFootprintsLayer';
import { CloseButton } from '@shared/components/CloseButton';
import MapView from '@shared/components/MapView/MapView';

const DownloadPanel = () => {
    const dispatch = useDispatch();

    const showDownloadPanel = useSelector(selectShowDownloadPanel);

    const { center } = useSelector(selectMapCenterAndZoom);

    const availableYears = getAvailableYears();

    useEffect(() => {
        saveDonwloadModeToHashParams(showDownloadPanel);
    }, [showDownloadPanel]);

    if (showDownloadPanel === false) {
        return null;
    }

    return (
        <div className="download-panel absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-custom-background-95 z-20">
            <div
                className="h-full w-full max-w px-10 flex flex-col"
                style={{
                    maxHeight: '90%',
                    maxWidth: '90%',
                }}
            >
                <Header />

                <CloseButton
                    onClick={() => {
                        dispatch(showDownloadPanelToggled(false));
                    }}
                />

                <div
                    className="relative w-full flex-grow"
                    style={{
                        filter: `drop-shadow(1px 1px 8px #000)`,
                    }}
                >
                    <MapView
                        webmapId={DWONLOAD_MODE_WEB_MAP_ID}
                        center={[center.lon, center.lat]}
                        zoom={3}
                    >
                        <LulcFootprintsLayer availableYears={availableYears} />
                    </MapView>
                </div>

                <div className="mt-4">
                    <p className="text-sm text-custom-light-blue">
                        This dataset is available under a Creative Commons by
                        Attribution (CC BY 4.0) license. See{' '}
                        <a
                            href="https://www.arcgis.com/home/item.html?id=cfcb7609de5f478eb7666240902d4d3d"
                            target={'_blank'}
                            className="underline"
                            rel="noreferrer"
                        >
                            Terms of Use and Credits
                        </a>{' '}
                        to cite the work.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DownloadPanel;
