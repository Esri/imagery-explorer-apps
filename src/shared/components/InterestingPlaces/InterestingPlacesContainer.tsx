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

import React, { FC, useEffect, useMemo, useState } from 'react';
import { InterestingPlaces } from './InterestingPlaces';
import { batch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { centerChanged, zoomChanged } from '@shared/store/Map/reducer';
import { updateRasterFunctionName } from '@shared/store/ImageryScene/thunks';
import { updateTooltipData } from '@shared/store/UI/thunks';
import { InterestingPlaceData } from '@typing/shared';
import { nameOfSelectedInterestingPlaceChanged } from '@shared/store/UI/reducer';
import { useSelector } from 'react-redux';
import { selectNameOfSelectedInterestingPlace } from '@shared/store/UI/selectors';
import { selectMapCenter } from '@shared/store/Map/selectors';
import { useResetSelectedInterestingPlace } from './useResetSelectedInterestingPlace';

type Props = {
    /**
     * list of interesting place data
     */
    data: InterestingPlaceData[];
};

export const InterestingPlacesContainer: FC<Props> = ({ data }) => {
    const dispatch = useDispatch();

    const nameOfSelectedInterestingPlace = useSelector(
        selectNameOfSelectedInterestingPlace
    );

    const selectedInterestingPlace: InterestingPlaceData = useMemo(() => {
        if (!nameOfSelectedInterestingPlace) {
            return null;
        }

        const dataItem = data.find(
            (d) => d.name === nameOfSelectedInterestingPlace
        );
        return dataItem;
    }, [nameOfSelectedInterestingPlace]);

    useResetSelectedInterestingPlace(selectedInterestingPlace);

    useEffect(() => {
        if (!selectedInterestingPlace) {
            return;
        }

        batch(() => {
            dispatch(
                centerChanged([...selectedInterestingPlace.location.center])
            );
            dispatch(zoomChanged(selectedInterestingPlace.location.zoom));
            dispatch(
                updateRasterFunctionName(selectedInterestingPlace.renderer)
            );
        });
    }, [selectedInterestingPlace]);

    return (
        <InterestingPlaces
            data={data}
            nameOfSelectedPlace={nameOfSelectedInterestingPlace}
            onChange={(name) => {
                dispatch(nameOfSelectedInterestingPlaceChanged(name));
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
