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

import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLandCoverClassifications } from '@landcover-explorer/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { activeLandCoverTypeChanged } from '@landcover-explorer/store/LandcoverExplorer/reducer';
import { selectActiveLandCoverType } from '@landcover-explorer/store/LandcoverExplorer/selectors';
import { tooltipDataChanged } from '@landcover-explorer/store/UI/reducer';
import { selectAnimationMode } from '@landcover-explorer/store/UI/selectors';
import { updateTooltipData } from '@landcover-explorer/store/UI/thunks';
import { saveActiveLandCoverTypeToHashParams } from '@landcover-explorer/utils/URLHashParams';
import ClassificationsList from './ClassificationsList';

const ClassificationsListContainer = () => {
    const dispatch = useDispatch();

    const activeLandCoverType = useSelector(selectActiveLandCoverType);

    const animationMode = useSelector(selectAnimationMode);

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
