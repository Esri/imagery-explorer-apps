import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectAppMode,
    selectSwipeSubMode,
} from '@shared/store/ImageryScene/selectors';
import classNames from 'classnames';
import React from 'react';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';
import {
    SwipeSubMode,
    swipeSubModeChanged,
} from '@shared/store/ImageryScene/reducer';

export const SwipeSubModeToggle = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectAppMode);

    const swipeSubMode = useAppSelector(selectSwipeSubMode);

    const isSceneToSceneMode = swipeSubMode === 'scene-to-scene';

    const isSceneToBasemapMode = swipeSubMode === 'scene-to-basemap';

    const onChange = (swipeSubMode: SwipeSubMode) => {
        dispatch(swipeSubModeChanged(swipeSubMode));
    };

    if (mode !== 'swipe') {
        return null;
    }

    return (
        <div>
            <div
                className={classNames('relative mb-2 w-full')}
                key={'scene-to-scene'}
            >
                <Button
                    appearance={isSceneToSceneMode ? 'solid' : 'transparent'}
                    fullHeight={true}
                    onClickHandler={onChange.bind(null, 'scene-to-scene')}
                    decorativeIndicator={isSceneToSceneMode ? 'left' : null}
                    scale="s"
                >
                    <div className="text-center text-xs">
                        {t('scene_to_scene')}
                    </div>
                </Button>
            </div>

            <div
                className={classNames('relative w-full')}
                key={'scene-to-basemap'}
            >
                <Button
                    appearance={isSceneToBasemapMode ? 'solid' : 'transparent'}
                    fullHeight={true}
                    onClickHandler={onChange.bind(null, 'scene-to-basemap')}
                    decorativeIndicator={isSceneToBasemapMode ? 'left' : null}
                    scale="s"
                >
                    <div className="text-center text-xs">
                        {t('scene_to_basemap')}
                    </div>
                </Button>
            </div>
        </div>
    );
};
