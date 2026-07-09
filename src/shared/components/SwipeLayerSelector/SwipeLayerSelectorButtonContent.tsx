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
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@shared/store/configureStore';
import { selectImageryServiceRasterFunctionLabelMap } from '@shared/store/ImageryService/selectors';
import { QueryParams4ImageryScene } from '../../store/ImageryScene/reducer';
import { getTimeStrInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';

type Side4SwipeMode = 'left' | 'right';

type Props = {
    side: Side4SwipeMode;
    queryParams: QueryParams4ImageryScene;
    selectedSide: Side4SwipeMode;
    useAcquisitionTimestampAsLabel?: boolean;
};

export const SwipeLayerSelectorButtonContent: FC<Props> = ({
    side,
    queryParams,
    selectedSide,
    useAcquisitionTimestampAsLabel = false,
}) => {
    const { t } = useTranslation();

    const rasterFunctionLabelMap = useAppSelector(
        selectImageryServiceRasterFunctionLabelMap
    );

    // Additional label to be displayed under the acquisition date.
    let additionalLabel =
        rasterFunctionLabelMap.get(queryParams?.rasterFunctionName) ||
        queryParams?.rasterFunctionName;

    // If useAcquisitionTimestampAsLabel is true and acquisition timestamp is available, use the timestamp as the additional label instead of the raster function name.
    if (
        useAcquisitionTimestampAsLabel &&
        queryParams?.acquisitionTimestampOfSelectedScene
    ) {
        additionalLabel = getTimeStrInUTCTimeZone(
            queryParams.acquisitionTimestampOfSelectedScene,
            true
        );
    }

    return (
        <div
            data-testid={`swipe-layer-selector-${side}`}
            data-selected={selectedSide === side}
            data-acquisition-date={queryParams?.acquisitionDate || ''}
        >
            <div>
                <span>{t(side)}</span>
            </div>

            <div className="text-xs text-center lowercase max-w-[126px] overflow-hidden text-ellipsis whitespace-nowrap">
                {queryParams?.acquisitionDate ? (
                    <>
                        <span>{queryParams.acquisitionDate}</span>

                        <br />

                        <span className="normal-case">{additionalLabel}</span>
                    </>
                ) : (
                    <span>{t('no_scene_selected')}</span>
                )}
            </div>
        </div>
    );
};

export const SwipeLayerSelectorButtonContentForBasemap: FC<{
    side: Side4SwipeMode;
}> = ({ side }) => {
    const { t } = useTranslation();

    return (
        <div data-testid={`swipe-layer-selector-${side}`}>
            <div>
                <span>{t(side)}</span>
            </div>

            <div className="text-xs text-center normal-case max-w-[126px] overflow-hidden text-ellipsis whitespace-nowrap">
                <span>{t('world_imagery')}</span>
                <br />
                <span className="">{t('basemap')}</span>
            </div>
        </div>
    );
};
