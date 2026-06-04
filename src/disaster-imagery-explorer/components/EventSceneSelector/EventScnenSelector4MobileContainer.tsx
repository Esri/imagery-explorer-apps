import React, { useMemo } from 'react';
import { EventSelector } from '../EventSelector';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useShouldDisableCalendar } from '@shared/components/Calendar/useShouldDisableCalendar';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectDisasterResponseScenes,
    selectIsLoadingScenes,
    selectObjectIdsOfScenesInCurrentMapExtent,
    selectSelectedEventName,
} from '@shared/store/DisasterImageryExplorer/selectors';
import { EventScenesLoadingIndicator } from './EventScenesLoadingIndicator';
import { NoAvilableSceneMessage } from './NoAvilableSceneMessage';
import { EventSceneSelector4Mobile } from './EventSceneSelector4Mobile';
import { selectDisasterResponseEventScene } from '@shared/store/DisasterImageryExplorer/thunks';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';

export const EventScnenSelector4MobileContainer = () => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const shouldBeDisabled = useShouldDisableCalendar();

    const selectedEventName = useAppSelector(selectSelectedEventName);

    const isLoadingScenes = useAppSelector(selectIsLoadingScenes);

    const disasterResponseScenes = useAppSelector(selectDisasterResponseScenes);

    const objectIdsOfScenesInCurrentMapExtent = useAppSelector(
        selectObjectIdsOfScenesInCurrentMapExtent
    );

    const queryParams = useAppSelector(selectQueryParams4SceneInSelectedMode);

    const getContent = () => {
        if (isLoadingScenes) {
            return <EventScenesLoadingIndicator />;
        }

        if (!selectedEventName || !disasterResponseScenes?.length) {
            return (
                <NoAvilableSceneMessage selectedEventName={selectedEventName} />
            );
        }

        return (
            <EventSceneSelector4Mobile
                data={disasterResponseScenes}
                objectIdsOfScenesInCurrentMapExtent={
                    objectIdsOfScenesInCurrentMapExtent
                }
                objectIdOfSelectedScene={queryParams?.objectIdOfSelectedScene}
                handleSceneSelect={(scene) => {
                    dispatch(selectDisasterResponseEventScene(scene));
                }}
            />
        );
    };

    return (
        <div
            className={classNames('select-none', {
                'is-disabled': shouldBeDisabled,
            })}
        >
            <div className="text-center mb-2 w-full">
                <span className="uppercase text-sm">
                    {t('scene_selection')}
                </span>
            </div>

            <div className="flex mb-2 items-center justify-between w-full">
                <div className="flex items-center flex-grow">
                    <div
                        className="relative w-full"
                        data-testid="event-selection-dropdown"
                    >
                        <EventSelector />
                    </div>
                </div>
            </div>

            <div>{getContent()}</div>
        </div>
    );
};
