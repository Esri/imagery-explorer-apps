import { useShouldDisableCalendar } from '@shared/components/Calendar/useShouldDisableCalendar';
import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { DisasterResponseEvent } from '@shared/store/DisasterResponse/reducer';
import {
    selectDisasterResponseEvents,
    selectSelectedEventName,
} from '@shared/store/DisasterResponse/selectors';
import { selectDisasterResponseEventScene } from '@shared/store/DisasterResponse/thunks';
import {
    selectAvailableScenes,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EventSelector } from '../EventSelector';
import { ImageryScene } from '@shared/store/ImageryScene/reducer';

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

    const imageryScenesGroupedByAcquisitionDate = useMemo(() => {
        const groupedResult: Record<string, ImageryScene[]> = {};

        imageryScenes.forEach((scene) => {
            const acquisitionDate = scene.formattedAcquisitionDate;

            if (!groupedResult[acquisitionDate]) {
                groupedResult[acquisitionDate] = [];
            }

            groupedResult[acquisitionDate].push(scene);
        });

        return groupedResult;
    }, [imageryScenes]);

    const uniqueAcquisitionDates = useMemo(() => {
        return Object.keys(imageryScenesGroupedByAcquisitionDate).sort(
            (a, b) => {
                return a.localeCompare(b);
            }
        );
    }, [imageryScenesGroupedByAcquisitionDate]);

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

            <div className="w-[800px] relative py-2 h-[120px]">
                {/* horizontal line — inset by half dot-width (5px) so it starts/ends at dot centers */}
                <div className="absolute top-[13px] left-[5px] right-[5px] h-px bg-custom-light-blue-50" />

                {/* dots — px-[5px] shifts first/last dot centers to align with line ends */}
                <div className="flex justify-between px-[5px] h-full">
                    {uniqueAcquisitionDates.map((date) => {
                        // const isSelected = queryParams?.acquisitionDate === date;
                        const scenes =
                            imageryScenesGroupedByAcquisitionDate[date];
                        return (
                            <div
                                key={date}
                                className="h-full relative flex flex-col items-center cursor-pointer group"
                                title={date}
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
                                {/* dot on horizontal line */}
                                <div
                                    className={classNames(
                                        'w-[10px] h-[10px] rounded-full border border-custom-light-blue-50  bg-custom-background pointer-events-none'
                                    )}
                                />
                                {/* dotted vertical line + scene boxes below the dot */}
                                <div className="flex-1 relative flex flex-col justify-start items-center mt-1 gap-[1px] overflow-hidden">
                                    {/* dotted vertical line spanning full height */}
                                    {/* <div className='absolute top-0 bottom-0 left-1/2 w-0 border-l border-dashed border-custom-light-blue-50' /> */}
                                    {scenes.map((scene) => {
                                        const isSceneSelected =
                                            queryParams?.objectIdOfSelectedScene ===
                                            scene.objectId;
                                        return (
                                            <div
                                                key={scene.objectId}
                                                className={classNames(
                                                    'relative z-10 shrink-0 w-[8px] h-[8px] border border-custom-light-blue-50 transition-colors',
                                                    {
                                                        'bg-custom-light-blue-50':
                                                            isSceneSelected,
                                                        'bg-custom-background hover:bg-custom-light-blue-30':
                                                            !isSceneSelected,
                                                    }
                                                )}
                                                title={
                                                    scene.formattedAcquisitionDate
                                                }
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    dispatch(
                                                        selectDisasterResponseEventScene(
                                                            scene
                                                        )
                                                    );
                                                }}
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
