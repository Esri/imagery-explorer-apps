import {
    selectTrendToolData,
    selectQueryLocation4TrendTool,
    selectSpectralIndex4TrendTool,
    selectAcquisitionYear4TrendTool,
    selectTrendToolOption,
    selectIsLoadingData4TrendingTool,
} from '@shared/store/TrendTool/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TemporalProfileChart } from './TrendChart';
import { updateAcquisitionDate } from '@shared/store/ImageryScene/thunks';

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

    if (!temporalProfileData.length || isLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center text-center">
                {isLoading && <calcite-loader inline />}
                <p className="text-sm opacity-80">
                    {isLoading
                        ? 'fetching temporal profile data'
                        : 'Click on the map to get the temporal profile.'}
                </p>
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

                // use has selected a acquisition date from the temporal profile chart,
                // to find and display the landsat scene that was acquired on use selected date
                // at the query location, we will need to update both of them
                batch(() => {
                    dispatch(centerChanged([queryLocation.x, queryLocation.y]));

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
