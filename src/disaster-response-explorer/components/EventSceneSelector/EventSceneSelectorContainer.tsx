import { useShouldDisableCalendar } from '@shared/components/Calendar/useShouldDisableCalendar';
import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    DisasterResponseEvent,
    objectIdOfHoveredSceneUpdated,
} from '@shared/store/DisasterResponse/reducer';
import {
    selectDisasterResponseEvents,
    selectDisasterResponseScenes,
    selectIsLoadingScenes,
    selectObjectIdsOfScenesInCurrentMapExtent,
    selectSelectedEventName,
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

type Props = {
    children?: React.ReactNode;
};

/**
 * Object that groups available scenes for the selected event by acquisition date.
 * The list of scenes in each group is sorted by acquisition time in descending order (newest scene first).
 */
type SceneGroupByAcquisitionDate = {
    acquisitionDate: string;
    shouldShowYearLabel: boolean;
    scenes: DisasterResponseScene[];
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

    // const scenesInCurrentMapExtent = useMemo(() => {
    //     if (
    //         !imageryScenes?.length ||
    //         !objectIdsOfScenesInCurrentMapExtent?.length
    //     ) {
    //         return [];
    //     }

    //     return imageryScenes.filter((scene) =>
    //         objectIdsOfScenesInCurrentMapExtent.includes(scene.objectId)
    //     );
    // }, [imageryScenes, objectIdsOfScenesInCurrentMapExtent]);

    const imageryScenesGroupedByAcquisitionDate: SceneGroupByAcquisitionDate[][] =
        useMemo(() => {
            const paginatedResult: SceneGroupByAcquisitionDate[][] = [];

            const groupedResultMap: {
                [acquisitionDate: string]: SceneGroupByAcquisitionDate;
            } = {};

            const maxNumberOfAcquisitionDatesPerPage = 16;

            let currentPage: SceneGroupByAcquisitionDate[] = [];

            for (let i = 0; i < disasterResponseScenes.length; i++) {
                const scene = disasterResponseScenes[i];

                const previousScene = disasterResponseScenes[i - 1];

                // only need to show year label when the year is different from previous scene, or it's the first scene in the list
                const shouldShowYearLabel =
                    i === 0 ||
                    (previousScene &&
                        previousScene.acquisitionYear !==
                            scene.acquisitionYear);

                const acquisitionDate = scene.formattedAcquisitionDate;

                if (!groupedResultMap[acquisitionDate]) {
                    groupedResultMap[acquisitionDate] = {
                        acquisitionDate,
                        scenes: [],
                        shouldShowYearLabel,
                    };

                    currentPage.push(groupedResultMap[acquisitionDate]);

                    if (
                        currentPage.length >= maxNumberOfAcquisitionDatesPerPage
                    ) {
                        paginatedResult.push(currentPage);
                        currentPage = [];
                    }
                }

                groupedResultMap[acquisitionDate].scenes.unshift(scene);
            }

            // push the remaining page if it has any scene groups
            if (currentPage.length) {
                paginatedResult.push(currentPage);
            }

            return paginatedResult;
        }, [disasterResponseScenes]);

    const [pageIndexBeingDisplayed, setPageIndexBeingDisplayed] =
        React.useState(0);

    const currentPageOfSceneGroups =
        imageryScenesGroupedByAcquisitionDate[pageIndexBeingDisplayed] || [];

    useEffect(() => {
        // reset to first page whenever the list of scenes in current map extent changes (e.g. when user pans the map or selects a different event)
        setPageIndexBeingDisplayed(0);
    }, [imageryScenesGroupedByAcquisitionDate]);

    const cloudCover = useAppSelector(selectCloudCover);

    const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
            <div className="flex justify-evenly h-full pb-4">
                {/* horizontal line separates label on text and the scene cells */}
                <div className="absolute top-[26px] left-0 right-0 h-px bg-custom-light-blue-10" />

                {currentPageOfSceneGroups.map((d) => {
                    // const isSelected = queryParams?.acquisitionDate === date;
                    const scenes = d.scenes;
                    const shouldShowYearLabel = d.shouldShowYearLabel;
                    const date = d.acquisitionDate;

                    return (
                        <div
                            key={date}
                            className="h-full relative flex flex-col items-center justify-even shrink-0"
                        >
                            <div className="w-full text-center flex flex-col justify-end h-5">
                                <p
                                    className={classNames(
                                        'text-[10px] text-custom-light-blue-50 whitespace-nowrap leading-none',
                                        {
                                            hidden:
                                                shouldShowYearLabel === false,
                                        }
                                    )}
                                >
                                    {date.slice(0, 4)}
                                </p>
                                <p className="text-[10px] text-custom-light-blue-50 whitespace-nowrap leading-none mt-[2px]">
                                    {date.slice(5)}
                                </p>
                            </div>

                            <div className="flex-1 relative flex flex-col justify-end items-center gap-[1px] overflow-hidden mt-1">
                                {/* dotted vertical line spanning full height */}
                                <div className="absolute top-0 h-full left-1/2 w-0 border-l border-dashed border-custom-light-blue-50 z-0" />

                                {scenes.map((scene) => {
                                    const isSceneSelected =
                                        queryParams?.objectIdOfSelectedScene ===
                                        scene.objectId;

                                    const withinCloudCoverThreshold =
                                        scene.cloudCover <= cloudCover * 100;

                                    const notInMapExtent =
                                        objectIdsOfScenesInCurrentMapExtent &&
                                        !objectIdsOfScenesInCurrentMapExtent.includes(
                                            scene.objectId
                                        );

                                    return (
                                        <div
                                            key={scene.objectId}
                                            className={classNames(
                                                'relative z-10 shrink-0 w-[8px] h-[8px] border border-custom-light-blue-50 bg-custom-background cursor-pointer',
                                                {
                                                    'bg-custom-calendar-background-selected':
                                                        isSceneSelected,
                                                    'border-custom-calendar-border-selected':
                                                        isSceneSelected,
                                                    'bg-custom-calendar-background-available':
                                                        withinCloudCoverThreshold &&
                                                        !isSceneSelected,
                                                    'pointer-events-none opacity-0':
                                                        notInMapExtent,
                                                }
                                            )}
                                            title={format(
                                                scene.eventTimestamp,
                                                'yyyy-MM-dd HH:mm:ss'
                                            )}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(
                                                    selectDisasterResponseEventScene(
                                                        scene
                                                    )
                                                );
                                            }}
                                            onMouseOver={() => {
                                                handleSceneHover(scene);
                                            }}
                                            onMouseOut={() =>
                                                handleSceneHover(null)
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
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
                {getContent()}
            </div>
        </div>
    );
};
