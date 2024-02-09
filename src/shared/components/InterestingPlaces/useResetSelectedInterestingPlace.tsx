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

import { selectMapCenter, selectMapZoom } from '@shared/store/Map/selectors';
import { nameOfSelectedInterestingPlaceChanged } from '@shared/store/UI/reducer';
import { InterestingPlaceData } from '@typing/shared';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useResetSelectedInterestingPlace = (
    selectedInterestingPlace: InterestingPlaceData
): void => {
    const dispatch = useDispatch();

    const mapCenter = useSelector(selectMapCenter);

    const zoom = useSelector(selectMapZoom);

    useEffect(() => {
        if (!selectedInterestingPlace) {
            return;
        }

        const { location } = selectedInterestingPlace;

        if (
            Math.abs(mapCenter[0] - location.center[0]) > 0.01 ||
            Math.abs(mapCenter[1] - location.center[1]) > 0.01 ||
            Math.abs(zoom - location.zoom) > 0.5
        ) {
            // console.log()
            dispatch(nameOfSelectedInterestingPlaceChanged(''));
        }
    }, [mapCenter, zoom]);

    useEffect(() => {
        return () => {
            // reset selected interesting place when component is unmounted
            dispatch(nameOfSelectedInterestingPlaceChanged(''));
        };
    }, []);
};
