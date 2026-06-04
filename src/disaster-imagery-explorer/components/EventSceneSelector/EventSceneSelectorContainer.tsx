import { useShouldDisableCalendar } from '@shared/components/Calendar/useShouldDisableCalendar';
import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    DisasterResponseEvent,
    objectIdOfHoveredSceneUpdated,
    pageIndexUpdated,
} from '@shared/store/DisasterImageryExplorer/reducer';
import {
    selectDisasterResponseEvents,
    selectDisasterResponseScenes,
    selectDisasterResponseScenesByObjectId,
    selectIsLoadingScenes,
    selectObjectIdsOfScenesInCurrentMapExtent,
    selectScenesGroupedByAcquisitionDateForSelectedPage,
    selectSelectedEventName,
    selectSelectedPageIndex,
    selectTotalPages,
} from '@shared/store/DisasterImageryExplorer/selectors';
import { selectDisasterResponseEventScene } from '@shared/store/DisasterImageryExplorer/thunks';
import {
    selectCloudCover,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import classNames from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { EventSelector } from '../EventSelector';
import { format } from 'date-fns';
import { APP_NAME } from '@shared/config';
import { DisasterResponseScene } from '@typing/imagery-service';
import { EventSceneSelector } from './EventSceneSelector';
import { PaginationButton } from './PaginationButton';
import { AcquisitionTimestampLabel } from './AcquisitionTimestampLabel';
import { EventScenesLoadingIndicator } from './EventScenesLoadingIndicator';
import { NoAvilableSceneMessage } from './NoAvilableSceneMessage';

type Props = {
    children?: React.ReactNode;
};

export const EventSceneSelectorContainer: FC<Props> = ({ children }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const selectedEventName = useAppSelector(selectSelectedEventName);

    const disasterResponseScenes = useAppSelector(selectDisasterResponseScenes);

    // const disasterResponseScenes = useAppSelector(selectDisasterResponseScenes);

    const queryParams = useAppSelector(selectQueryParams4SceneInSelectedMode);

    /**
     * if true, Calendar should be disbaled
     */
    const shouldBeDisabled = useShouldDisableCalendar();

    const isLoadingScenes = useAppSelector(selectIsLoadingScenes);

    const objectIdsOfScenesInCurrentMapExtent = useAppSelector(
        selectObjectIdsOfScenesInCurrentMapExtent
    );

    const scenesGroupedByAcquisitionDate = useAppSelector(
        selectScenesGroupedByAcquisitionDateForSelectedPage
    );

    const cloudCover = useAppSelector(selectCloudCover);

    const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const numberOfPages = useAppSelector(selectTotalPages);

    const shouldShowPagination = numberOfPages > 1;

    const pageIndex = useAppSelector(selectSelectedPageIndex);

    const handleSceneHover = useCallback(
        (scene: DisasterResponseScene) => {
            if (hoverTimerRef.current) {
                clearTimeout(hoverTimerRef.current);
            }

            hoverTimerRef.current = setTimeout(() => {
                if (!scene) {
                    dispatch(objectIdOfHoveredSceneUpdated(null));
                    return;
                }

                dispatch(objectIdOfHoveredSceneUpdated(scene.objectId));
            }, 100);
        },
        [dispatch]
    );

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
            <EventSceneSelector
                scenesGroupedByAcquisitionDate={scenesGroupedByAcquisitionDate}
                objectIdsOfScenesInCurrentMapExtent={
                    objectIdsOfScenesInCurrentMapExtent
                }
                cloudCover={cloudCover}
                objectidOfSelectedScene={queryParams?.objectIdOfSelectedScene}
                handleSceneHover={handleSceneHover}
                handleSceneSelect={(scene) =>
                    dispatch(selectDisasterResponseEventScene(scene))
                }
            />
        );
    };

    return (
        <div
            className={classNames('select-none', {
                'is-disabled': shouldBeDisabled,
            })}
        >
            <div className="text-center mb-2">
                <span className="uppercase text-sm">
                    {t('scene_selection')}
                </span>
            </div>

            <div className="flex mb-0 items-center justify-between">
                <div className="flex items-center flex-grow">
                    <div
                        className="relative w-[250px]"
                        data-testid="event-selection-dropdown"
                    >
                        <EventSelector />
                    </div>

                    <AcquisitionTimestampLabel
                        acquisitionTimestamp={
                            queryParams?.acquisitionTimestampOfSelectedScene
                        }
                        closeBtnOnClick={() => {
                            dispatch(selectDisasterResponseEventScene(null));
                        }}
                    />
                </div>

                {/* {APP_NAME === 'landsat' && <LandsatMissionFilter />} */}
                {children}
            </div>

            <div className="w-[700px] 2xl:w-[800px] relative pt-1 pb-2 mt-1 h-[150px]">
                {shouldShowPagination && (
                    <div className="absolute top-0 bottom-0 left-[-20px] flex items-center">
                        <PaginationButton
                            direction="previous"
                            disabled={pageIndex === 0}
                            onClick={() => {
                                dispatch(pageIndexUpdated(pageIndex - 1));
                            }}
                        />
                    </div>
                )}

                {getContent()}

                {shouldShowPagination && (
                    <div className="absolute top-0 bottom-0 right-[-20px] flex items-center">
                        <PaginationButton
                            direction="next"
                            disabled={pageIndex === numberOfPages - 1}
                            onClick={() => {
                                // console.log('next page');
                                dispatch(pageIndexUpdated(pageIndex + 1));
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
