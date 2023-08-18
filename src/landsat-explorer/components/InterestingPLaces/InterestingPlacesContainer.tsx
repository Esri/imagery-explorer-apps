import React, { useEffect, useState } from 'react';

import { data } from './data';
import { InterestingPlaces } from '@shared/components/InterestingPlaces';
import { batch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { centerChanged, zoomChanged } from '@shared/store/Map/reducer';
import { updateRasterFunctionName } from '@shared/store/Landsat/thunks';

type InterestingPlace = {
    name: string;
    location: {
        center: number[];
        zoom: number;
    };
    renderer: string;
    thumbnail: any;
};

export const InterestingPlacesContainer = () => {
    const dispatch = useDispatch();

    const [selectedPlace, setSelectedPlace] = useState<InterestingPlace>(
        data[0]
    );

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

    useEffect(() => {
        batch(() => {
            dispatch(centerChanged([...selectedPlace.location.center]));
            dispatch(zoomChanged(selectedPlace.location.zoom));
            dispatch(updateRasterFunctionName(selectedPlace.renderer));
        });
    }, [selectedPlace]);

    return (
        <div className="mx-10">
            <InterestingPlaces
                data={getData()}
                nameOfSelectedPlace={selectedPlace.name}
                onChange={(name) => {
                    const dataItem = data.find((d) => d.name === name);

                    if (dataItem) {
                        setSelectedPlace(dataItem);
                    }
                }}
            />
        </div>
    );
};
