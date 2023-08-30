import React, { useEffect, useState } from 'react';

import { data } from './data';
import { InterestingPlaces } from './InterestingPlaces';
import { batch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { centerChanged, zoomChanged } from '@shared/store/Map/reducer';
import { updateRasterFunctionName } from '@shared/store/Landsat/thunks';
import { updateTooltipData } from '@shared/store/UI/thunks';

export const InterestingPlacesContainer = () => {
    const dispatch = useDispatch();

    return (
        <InterestingPlaces
            data={data}
            nameOfSelectedPlace={''}
            onChange={(name) => {
                const dataItem = data.find((d) => d.name === name);

                if (dataItem) {
                    // setSelectedPlace(dataItem);

                    batch(() => {
                        dispatch(centerChanged([...dataItem.location.center]));
                        dispatch(zoomChanged(dataItem.location.zoom));
                        dispatch(updateRasterFunctionName(dataItem.renderer));
                    });
                }
            }}
            onHover={(interestingPlaceOnHover) => {
                const data = interestingPlaceOnHover
                    ? {
                          title:
                              interestingPlaceOnHover?.label ||
                              interestingPlaceOnHover.name,
                          content: interestingPlaceOnHover.description,
                      }
                    : null;

                dispatch(updateTooltipData(data));
            }}
        />
    );
};
