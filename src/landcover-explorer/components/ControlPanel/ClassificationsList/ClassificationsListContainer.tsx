import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLandCoverClassifications } from '@landcover-explorer/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { activeLandCoverTypeChanged } from '@landcover-explorer/store/Map/reducer';
import { selectActiveLandCoverType } from '@landcover-explorer/store/Map/selectors';
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
