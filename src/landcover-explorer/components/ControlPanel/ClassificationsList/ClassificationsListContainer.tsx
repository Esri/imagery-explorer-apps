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

import React, { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import { getLandCoverClassifications } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { activeLandCoverTypeChanged } from '@shared/store/LandcoverExplorer/reducer';
import { selectActiveLandCoverType } from '@shared/store/LandcoverExplorer/selectors';
// import { tooltipDataChanged } from '@shared/store/UI/reducer';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import { updateTooltipData } from '@shared/store/UI/thunks';
import { saveActiveLandCoverTypeToHashParams } from '@landcover-explorer/utils/URLHashParams';
import ClassificationsList from './ClassificationsList';

const ClassificationsListContainer = () => {
    const dispatch = useAppDispatch();

    const activeLandCoverType = useAppSelector(selectActiveLandCoverType);

    const animationMode = useAppSelector(selectAnimationStatus);

    const data = useMemo(() => {
        return getLandCoverClassifications();
    }, []);

    useEffect(() => {
        saveActiveLandCoverTypeToHashParams(activeLandCoverType);
    }, [activeLandCoverType]);

    return (
        <ClassificationsList
            selectedLandCover={activeLandCoverType}
            disabled={animationMode !== null}
            activeLandCoverOnChange={(newVal) => {
                dispatch(activeLandCoverTypeChanged(newVal));
            }}
            data={data}
            itemOnHover={(data) => {
                dispatch(updateTooltipData(data));
            }}
        />
    );
};

export default ClassificationsListContainer;
