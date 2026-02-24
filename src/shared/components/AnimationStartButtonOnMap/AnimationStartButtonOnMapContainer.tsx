// import { CalciteIcon } from '@esri/calcite-components-react';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectAppMode,
    selectNumOfSelectedItemsInListOfQueryParams,
} from '@shared/store/ImageryScene/selectors';
import { animationStatusChanged } from '@shared/store/UI/reducer';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimationStartButtonOnMap } from './AnimationStartButtonOnMap';

export const AnimationStartButtonOnMapContainer: FC = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectAppMode);

    const animationStatus = useAppSelector(selectAnimationStatus);

    const numOfFrames = useAppSelector(
        selectNumOfSelectedItemsInListOfQueryParams
    );

    if (mode !== 'animate' || animationStatus || numOfFrames < 2) {
        return null;
    }

    return (
        <AnimationStartButtonOnMap
            startAnimationButtonOnClick={() => {
                dispatch(animationStatusChanged('loading'));
            }}
        />
    );
};
