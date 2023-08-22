import React, { useEffect, useState } from 'react';

import { data } from './data';
import { InterestingPlaces } from './InterestingPlaces';
import { batch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { centerChanged, zoomChanged } from '@shared/store/Map/reducer';
import { updateRasterFunctionName } from '@shared/store/Landsat/thunks';

export const InterestingPlacesContainer = () => {
    const dispatch = useDispatch();

    const getData = () => {
        return data.map((d) => {
            const { name, thumbnail } = d;

            return {
                thumbnail,
                name,
                label: '',
            };
        });
    };

    return (
        <InterestingPlaces
            data={getData()}
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
        />
    );
};
