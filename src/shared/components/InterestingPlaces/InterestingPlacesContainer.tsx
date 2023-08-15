import React from 'react';
import { InterestingPlaces } from './InterestingPlaces';

import PlaceHolder from './thumbnails/placeholder.jpg';

export const InterestingPlacesContainer = () => {
    return (
        <div className="mx-10">
            <InterestingPlaces
                data={[
                    {
                        thumbnail: PlaceHolder,
                        name: 'a',
                        label: '',
                    },
                    {
                        thumbnail: PlaceHolder,
                        name: 'b',
                        label: '',
                    },
                    {
                        thumbnail: PlaceHolder,
                        name: 'c',
                        label: '',
                    },
                ]}
                nameOfSelectedPlace="a"
            />
        </div>
    );
};
