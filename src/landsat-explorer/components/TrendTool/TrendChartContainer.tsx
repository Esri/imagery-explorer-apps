import {
    selectTrendToolData,
    selectQueryLocation4TrendTool,
    selectSpectralIndex4TrendTool,
    selectAcquisitionYear4TrendTool,
    selectTrendToolOption,
    selectIsLoadingData4TrendingTool,
} from '@shared/store/TrendTool/selectors';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TemporalProfileChart } from './TrendChart';
import {
    updateAcquisitionDate,
    updateObjectIdOfSelectedScene,
} from '@shared/store/ImageryScene/thunks';

import { centerChanged } from '@shared/store/Map/reducer';
import { batch } from 'react-redux';
import { selectQueryParams4MainScene } from '@shared/store/ImageryScene/selectors';

export const TrendChartContainer = () => {
    const dispatch = useDispatch();

    const queryLocation = useSelector(selectQueryLocation4TrendTool);

    const acquisitionYear = useSelector(selectAcquisitionYear4TrendTool);

    const temporalProfileData = useSelector(selectTrendToolData);

    const spectralIndex = useSelector(selectSpectralIndex4TrendTool);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const trendToolOption = useSelector(selectTrendToolOption);

    const isLoading = useSelector(selectIsLoadingData4TrendingTool);

    const message = useMemo(() => {
        if (isLoading) {
            return 'fetching temporal profile data';
        }

        if (!temporalProfileData.length) {
            return 'Select a scene and click a location within that scene to generate a temporal profile for the selected category.';
        }

        return '';
    }, [temporalProfileData, isLoading]);

    if (message) {
        return (
            <div className="h-full w-full flex items-center justify-center text-center">
                {isLoading && <calcite-loader inline />}
                <p className="text-sm opacity-50">{message}</p>
            </div>
        );
    }

    return (
        <TemporalProfileChart
            data={temporalProfileData}
            spectralIndex={spectralIndex}
            trendToolOption={trendToolOption}
            acquisitionYear={acquisitionYear}
            selectedAcquisitionDate={queryParams4MainScene?.acquisitionDate}
            onClickHandler={(index) => {
                // select user clicked temporal profile chart data element
                const clickedDataItem = temporalProfileData[index];

                if (!clickedDataItem) {
                    return;
                }

                batch(() => {
                    // update the center of the map using user selected query location to
                    // invoke query that fetches the landsat scenes that intersects with the query location
                    dispatch(centerChanged([queryLocation.x, queryLocation.y]));

                    // unselect the selected imagery scene so that a new scene can be selected
                    dispatch(updateObjectIdOfSelectedScene(null));

                    dispatch(
                        updateAcquisitionDate(
                            clickedDataItem.formattedAcquisitionDate,
                            true
                        )
                    );
                });
            }}
        />
    );
};
