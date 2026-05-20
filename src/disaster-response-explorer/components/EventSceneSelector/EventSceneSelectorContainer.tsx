import { useShouldDisableCalendar } from '@shared/components/Calendar/useShouldDisableCalendar';
import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    DisasterResponseEvent,
    objectIdOfHoveredSceneUpdated,
} from '@shared/store/DisasterResponse/reducer';
import {
    selectDisasterResponseEvents,
    selectObjectIdsOfScenesInCurrentMapExtent,
    selectSelectedEventName,
} from '@shared/store/DisasterResponse/selectors';
import { selectDisasterResponseEventScene } from '@shared/store/DisasterResponse/thunks';
import {
    selectAvailableScenes,
    selectCloudCover,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import classNames from 'classnames';
import React, { FC, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { EventSelector } from '../EventSelector';
import { ImageryScene } from '@shared/store/ImageryScene/reducer';
import { format } from 'date-fns';

type Props = {
    children?: React.ReactNode;
};

export const EventSceneSelectorContainer: FC<Props> = ({ children }) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const imageryScenes = useAppSelector(selectAvailableScenes);

    const queryParams = useAppSelector(selectQueryParams4SceneInSelectedMode);

    /**
     * if true, Calendar should be disbaled
     */
    const shouldBeDisabled = useShouldDisableCalendar();

    const objectIdsOfScenesInCurrentMapExtent = useAppSelector(
        selectObjectIdsOfScenesInCurrentMapExtent
    );

    const imageryScenesGroupedByAcquisitionDate = useMemo(() => {
        const groupedResult: Record<string, ImageryScene[]> = {};

        const scenesInCurrentMapExtent = imageryScenes.filter((scene) =>
            objectIdsOfScenesInCurrentMapExtent.includes(scene.objectId)
        );

        scenesInCurrentMapExtent.forEach((scene) => {
            const acquisitionDate = scene.formattedAcquisitionDate;

            if (!groupedResult[acquisitionDate]) {
                groupedResult[acquisitionDate] = [];
            }

            groupedResult[acquisitionDate].push(scene);
        });

        return groupedResult;
    }, [imageryScenes, objectIdsOfScenesInCurrentMapExtent]);

    const uniqueAcquisitionDates = useMemo(() => {
        return Object.keys(imageryScenesGroupedByAcquisitionDate).sort(
            (a, b) => {
                return a.localeCompare(b);
            }
        );
    }, [imageryScenesGroupedByAcquisitionDate]);

    const cloudCover = useAppSelector(selectCloudCover);

    const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSceneHover = useCallback(
        (scene: ImageryScene) => {
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

            <div className="flex mb-2 items-center justify-between">
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

            <div className="w-[800px] relative py-2 h-[156px]">
                {/* horizontal line — top-[49px] = 8px padding + 36px label area + 5px half-dot */}
                <div className="absolute top-[49px] left-0 right-0 h-px bg-custom-light-blue-50" />

                {/* dots — justify-evenly gives equal space around every dot including edges */}
                <div className="flex justify-evenly h-full">
                    {uniqueAcquisitionDates.map((date) => {
                        // const isSelected = queryParams?.acquisitionDate === date;
                        const scenes =
                            imageryScenesGroupedByAcquisitionDate[date];
                        return (
                            <div
                                key={date}
                                className="h-full relative flex flex-col items-center justify-even cursor-pointer group"
                                onClick={() => {
                                    if (scenes?.length) {
                                        dispatch(
                                            selectDisasterResponseEventScene(
                                                scenes[0]
                                            )
                                        );
                                    }
                                }}
                            >
                                {/* tilted label above the dot */}
                                <div className="h-[36px] relative w-0 overflow-visible flex items-end">
                                    <span className="absolute bottom-[2px] left-0 origin-bottom-left -rotate-45 text-[10px] text-custom-light-blue-50 whitespace-nowrap leading-none">
                                        {date}
                                    </span>
                                </div>
                                {/* dot on horizontal line */}
                                <div
                                    className={classNames(
                                        'w-[10px] h-[10px] rounded-full border border-custom-light-blue-50  bg-custom-background pointer-events-none'
                                    )}
                                />
                                {/* dotted vertical line + scene boxes below the dot */}
                                <div className="flex-1 relative flex flex-col justify-start items-center mt-1 gap-[1px] overflow-hidden">
                                    {/* dotted vertical line spanning full height */}
                                    <div className="absolute top-0 h-16 left-1/2 w-0 border-l border-dashed border-custom-light-blue-50 z-0" />
                                    {scenes.map((scene) => {
                                        const isSceneSelected =
                                            queryParams?.objectIdOfSelectedScene ===
                                            scene.objectId;

                                        const withinCloudCoverThreshold =
                                            scene.cloudCover <=
                                            cloudCover * 100;

                                        return (
                                            <div
                                                key={scene.objectId}
                                                className={classNames(
                                                    'relative z-10 shrink-0 w-[8px] h-[8px] border border-custom-light-blue-50 bg-custom-background',
                                                    {
                                                        'bg-custom-calendar-background-selected':
                                                            isSceneSelected,
                                                        'border-custom-calendar-border-selected':
                                                            isSceneSelected,
                                                        'bg-custom-calendar-background-available':
                                                            withinCloudCoverThreshold &&
                                                            !isSceneSelected,
                                                    }
                                                )}
                                                title={format(
                                                    scene.acquisitionDate,
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
            </div>
        </div>
    );
};
