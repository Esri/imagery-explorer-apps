import React, { useState } from 'react';

import { data } from './data';
import { InterestingPlaces } from '@shared/components/InterestingPlaces';

export const InterestingPlacesContainer = () => {
    const [nameOfSelectedPlace, setNameOfSelectedPlace] = useState<string>(
        data[0]?.place
    );

    const getData = () => {
        return data.map((d) => {
            const { place, thumbnail } = d;

            return {
                thumbnail,
                name: place,
                label: '',
            };
        });
    };

    return (
        <div className="mx-10">
            <InterestingPlaces
                data={getData()}
                nameOfSelectedPlace={nameOfSelectedPlace}
                onChange={setNameOfSelectedPlace}
            />
        </div>
    );
};
