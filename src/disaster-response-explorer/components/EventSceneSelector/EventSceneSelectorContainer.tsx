import { useShouldDisableCalendar } from '@shared/components/Calendar/useShouldDisableCalendar';
import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    DisasterResponseEvent,
    objectIdOfHoveredSceneUpdated,
    pageIndexUpdated,
} from '@shared/store/DisasterResponse/reducer';
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
} from '@shared/store/DisasterResponse/selectors';
import { selectDisasterResponseEventScene } from '@shared/store/DisasterResponse/thunks';
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
            return (
                <div className="w-full text-center">
                    <div
                        className="w-full flex items-center justify-center mt-2"
                        style={
                            {
                                '--calcite-loader-spacing': '0px',
                            } as React.CSSProperties
                        }
                    >
                        <calcite-loader scale="s" label="loading" />
                    </div>

                    <p className="text-sm text-custom-light-blue-50 mt-1">
                        {t('loading_scenes_for_selected_event', {
                            ns: APP_NAME,
                        })}
                    </p>
                </div>
            );
        }

        if (!selectedEventName || !disasterResponseScenes?.length) {
            return (
                <div className="w-full flex items-center justify-center text-center">
                    <p className="text-sm text-custom-light-blue-50 max-w-sm mt-6">
                        {!selectedEventName
                            ? t('select_an_event_to_see_available_scenes', {
                                  ns: APP_NAME,
                              })
                            : t('no_scenes_in_current_map_extent', {
                                  ns: APP_NAME,
                              })}
                    </p>
                </div>
            );
        }

        return (
            // <div className="flex justify-evenly h-full pb-4">
            //     {/* horizontal line separates label on text and the scene cells */}
            //     <div className="absolute top-[26px] left-0 right-0 h-px bg-custom-light-blue-10" />

            //     {scenesGroupedByAcquisitionDate.map((d) => {
            //         // const isSelected = queryParams?.acquisitionDate === date;
            //         const objectIdsOfScenesInGroup = d.objectIds;
            //         const shouldShowYearLabel = d.shouldShowYearLabel;
            //         const date = d.formattedAcquisitionDate;

            //         return (
            //             <div
            //                 key={date}
            //                 className="h-full relative flex flex-col items-center justify-even shrink-0"
            //             >
            //                 <div className="w-full text-center flex flex-col justify-end h-5">
            //                     <p
            //                         className={classNames(
            //                             'text-[10px] text-custom-light-blue-50 whitespace-nowrap leading-none',
            //                             {
            //                                 hidden:
            //                                     shouldShowYearLabel === false,
            //                             }
            //                         )}
            //                     >
            //                         {date.slice(0, 4)}
            //                     </p>
            //                     <p className="text-[10px] text-custom-light-blue-50 whitespace-nowrap leading-none mt-[2px]">
            //                         {date.slice(5)}
            //                     </p>
            //                 </div>

            //                 <div className="flex-1 relative flex flex-col justify-end items-center gap-[1px] overflow-hidden mt-1">
            //                     {/* dotted vertical line spanning full height */}
            //                     <div className="absolute top-0 h-full left-1/2 w-0 border-l border-dashed border-custom-light-blue-50 z-0" />

            //                     {objectIdsOfScenesInGroup.map((objectId) => {
            //                         const scene = byObjectIdOfScenes[objectId];

            //                         if (!scene) return null;

            //                         const isSceneSelected =
            //                             queryParams?.objectIdOfSelectedScene ===
            //                             scene.objectId;

            //                         const withinCloudCoverThreshold =
            //                             scene.cloudCover <= cloudCover * 100;

            //                         const notInMapExtent =
            //                             objectIdsOfScenesInCurrentMapExtent &&
            //                             !objectIdsOfScenesInCurrentMapExtent.includes(
            //                                 scene.objectId
            //                             );

            //                         return (
            //                             <div
            //                                 key={scene.objectId}
            //                                 className={classNames(
            //                                     'relative z-10 shrink-0 w-[8px] h-[8px] border border-custom-light-blue-50 bg-custom-background cursor-pointer',
            //                                     {
            //                                         'bg-custom-calendar-background-selected':
            //                                             isSceneSelected,
            //                                         'border-custom-calendar-border-selected':
            //                                             isSceneSelected,
            //                                         'bg-custom-calendar-background-available':
            //                                             withinCloudCoverThreshold &&
            //                                             !isSceneSelected,
            //                                         'pointer-events-none opacity-0':
            //                                             notInMapExtent,
            //                                     }
            //                                 )}
            //                                 title={format(
            //                                     scene.eventTimestamp,
            //                                     'yyyy-MM-dd HH:mm:ss'
            //                                 )}
            //                                 onClick={(e) => {
            //                                     e.stopPropagation();
            //                                     dispatch(
            //                                         selectDisasterResponseEventScene(
            //                                             scene
            //                                         )
            //                                     );
            //                                 }}
            //                                 onMouseOver={() => {
            //                                     handleSceneHover(scene);
            //                                 }}
            //                                 onMouseOut={() =>
            //                                     handleSceneHover(null)
            //                                 }
            //                             />
            //                         );
            //                     })}
            //                 </div>
            //             </div>
            //         );
            //     })}
            // </div>

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
                </div>

                {/* {APP_NAME === 'landsat' && <LandsatMissionFilter />} */}
                {children}
            </div>

            <div className="w-[800px] relative pt-1 pb-2 mt-1 h-[150px]">
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
