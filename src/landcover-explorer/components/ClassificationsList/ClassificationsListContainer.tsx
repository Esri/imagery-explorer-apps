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

import React, { FC, useEffect, useMemo } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
// import { getLandCoverClassifications } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { activeLandCoverTypeChanged } from '@shared/store/LandcoverExplorer/reducer';
import { selectActiveLandCoverType } from '@shared/store/LandcoverExplorer/selectors';
// import { tooltipDataChanged } from '@shared/store/UI/reducer';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import { updateTooltipData } from '@shared/store/UI/thunks';
import { saveActiveLandCoverTypeToHashParams } from '@landcover-explorer/utils/URLHashParams';
import ClassificationsList from './ClassificationsList';
// import { getSentinel2LandCoverClassifications } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { LandcoverClassificationData } from '@typing/landcover';

type Props = {
    classificationData: LandcoverClassificationData[];
    /**
     * number of columns in the grid, default is 3
     */
    numberOfColumns?: 2 | 3; // Optional prop to specify the number of columns in the grid
    /**
     * The scale of the component, can be 's' for small or 'm' for medium
     */
    scale?: 's' | 'm'; // The scale of the component, can be 's' for small or 'm' for medium
};

export const ClassificationsListContainer: FC<Props> = ({
    classificationData,
    // numberOfColumns = 3, // Default to 3 columns if not provided
    scale = 'm', // Default to medium scale if not provided
}) => {
    const dispatch = useAppDispatch();

    const activeLandCoverType = useAppSelector(selectActiveLandCoverType);

    const animationMode = useAppSelector(selectAnimationStatus);

    // const data = useMemo(() => {
    //     return getSentinel2LandCoverClassifications();
    // }, []);

    useEffect(() => {
        saveActiveLandCoverTypeToHashParams(activeLandCoverType);
    }, [activeLandCoverType]);

    return (
        <ClassificationsList
            selectedLandCover={activeLandCoverType}
            disabled={animationMode !== null}
            // numberOfColumns={numberOfColumns}
            activeLandCoverOnChange={(newVal) => {
                dispatch(activeLandCoverTypeChanged(newVal));
            }}
            data={classificationData}
            itemOnHover={(data) => {
                dispatch(updateTooltipData(data));
            }}
            scale={scale}
        />
    );
};

// export default ClassificationsListContainer;
