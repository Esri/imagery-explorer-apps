import { CalciteIcon } from '@esri/calcite-components-react';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { animationStatusChanged } from '@shared/store/UI/reducer';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const AnimationStartButtonOnMap: FC = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    return (
        <div className="aboslute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
            <div
                className="pointer-events-auto z-10 flex items-center justify-center p-2 bg-custom-background-20 hover:bg-custom-background-50 border-4 border-custom-light-blue-80 rounded-full shadow-md cursor-pointer"
                title={t('start_animation')}
                onClick={() => {
                    dispatch(animationStatusChanged('loading'));
                }}
            >
                <CalciteIcon icon="play-f" scale="l" />
            </div>
        </div>
    );
};
