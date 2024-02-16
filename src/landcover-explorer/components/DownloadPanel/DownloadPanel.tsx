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

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DWONLOAD_MODE_WEB_MAP_ID } from '@landcover-explorer/constants/map';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
// import { selectMapCenterAndZoom } from '@shared/store/LandcoverExplorer/selectors';
import { showDownloadPanelToggled } from '@shared/store/UI/reducer';
import { selectShowDownloadPanel } from '@shared/store/UI/selectors';
import { saveDonwloadModeToHashParams } from '@landcover-explorer/utils/URLHashParams';
import Header from './Header';
import LulcFootprintsLayer from './LulcFootprintsLayer';
import { CloseButton } from '@shared/components/CloseButton';
import MapView from '../MapView/MapView';
import { selectMapCenter } from '@shared/store/Map/selectors';

const DownloadPanel = () => {
    const dispatch = useDispatch();

    const showDownloadPanel = useSelector(selectShowDownloadPanel);

    const center = useSelector(selectMapCenter);

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
                        center={center}
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
