import { useAppSelector } from '@shared/store/configureStore';
import { DisasterResponseScenesGroupedByAcquisitionDate } from '@shared/store/DisasterResponse/reducer';
import { selectDisasterResponseScenesByObjectId } from '@shared/store/DisasterResponse/selectors';
import { DisasterResponseScene } from '@typing/imagery-service';
import classNames from 'classnames';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';

type Props = {
    /**
     * Array of disaster response scenes grouped by acquisition date, where each group contains the object IDs of scenes that share the same acquisition date.
     * The `shouldShowYearLabel` flag indicates whether a year label should be rendered for that group in the UI.
     */
    scenesGroupedByAcquisitionDate: DisasterResponseScenesGroupedByAcquisitionDate[];
    /**
     * Array of object IDs for scenes that are currently within the map extent.
     * This is used to determine which scenes should be interactive (clickable) in the UI,
     * as scenes outside the current map extent will have pointer events disabled and reduced opacity.
     */
    objectIdsOfScenesInCurrentMapExtent: number[];
    /**
     * Cloud cover threshold (between 0 and 1) used to determine the styling of scene indicators.
     * Scenes with cloud cover less than or equal to this threshold will be styled as "available" for selection, while those above the threshold will not have the "available" styling.
     */
    cloudCover: number;
    /**
     * The object ID of the currently selected scene. This is used to apply specific styling to the selected scene's indicator in the UI, distinguishing it from other scenes.
     */
    objectidOfSelectedScene: number;
    /**
     * Handler function that is called when a scene is hovered over (mouse over) or when the mouse leaves a scene (mouse out).
     * @param scene
     * @returns
     */
    handleSceneHover: (scene: DisasterResponseScene | null) => void;
    /**
     * Handler function that is called when a scene is selected.
     * @param scene
     * @returns
     */
    handleSceneSelect: (scene: DisasterResponseScene) => void;
};

export const EventSceneSelector: FC<Props> = ({
    scenesGroupedByAcquisitionDate,
    objectIdsOfScenesInCurrentMapExtent,
    cloudCover,
    objectidOfSelectedScene,
    handleSceneHover,
    handleSceneSelect,
}) => {
    const byObjectIdOfScenes = useAppSelector(
        selectDisasterResponseScenesByObjectId
    );

    // create a memoized object that maps each acquisition date to an array of scene chunks,
    // where each chunk contains at most 10 scenes sorted by event timestamp in descending order
    const sceneChunksByDate: {
        [key: string]: DisasterResponseScene[][];
    } = useMemo(() => {
        const MAX_PER_COLUMN = 10;

        const output: {
            [key: string]: DisasterResponseScene[][];
        } = {};

        for (const d of scenesGroupedByAcquisitionDate) {
            // get the scenes for the date group, sort them by event timestamp in descending order, and chunk them into arrays of at most MAX_PER_COLUMN scenes each
            const sortedScenes = d.objectIds
                .map((objectId) => byObjectIdOfScenes[objectId])
                .filter(Boolean)
                .sort((a, b) => a.eventTimestamp - b.eventTimestamp);

            // chunk the sorted scenes into arrays of at most MAX_PER_COLUMN scenes each
            const chunks: DisasterResponseScene[][] = [];

            for (let i = 0; i < sortedScenes.length; i += MAX_PER_COLUMN) {
                // get the chunk of scenes for the current column, and reverse it so that the scenes with the latest event timestamp are at the bottom of the column in the UI
                const chunkedScenes = sortedScenes.slice(i, i + MAX_PER_COLUMN);

                chunks.push(chunkedScenes.reverse());
            }

            output[d.formattedAcquisitionDate] = chunks;
        }

        return output;
    }, [scenesGroupedByAcquisitionDate, byObjectIdOfScenes]);

    return (
        <div className="flex justify-evenly h-full pb-4">
            {/* horizontal line separates label on text and the scene cells */}
            <div className="absolute top-[25px] left-0 right-0 h-px bg-custom-light-blue-10" />

            {scenesGroupedByAcquisitionDate.map((d) => {
                // const isSelected = queryParams?.acquisitionDate === date;
                const shouldShowYearLabel = d.shouldShowYearLabel;
                const date = d.formattedAcquisitionDate;

                return (
                    <div
                        key={date}
                        className="h-full relative flex flex-col items-center justify-even shrink-0"
                    >
                        <div
                            className="w-full text-center flex flex-col justify-end h-5 mb-1"
                            data-testid={`scene-selector-label-${date}`}
                        >
                            <p
                                className={classNames(
                                    'text-[10px] text-custom-light-blue-50 whitespace-nowrap leading-none',
                                    {
                                        hidden: shouldShowYearLabel === false,
                                    }
                                )}
                            >
                                {date.slice(0, 4)}
                            </p>
                            <p className="text-[10px] text-custom-light-blue-50 whitespace-nowrap leading-none mt-[2px]">
                                {date.slice(5)}
                            </p>
                        </div>

                        <div className="flex-grow relative flex items-center justify-center">
                            <div className="w-0 h-full border-l border-custom-light-blue-20 border-dashed pointer-events-none" />
                        </div>

                        <div
                            className="relative flex flex-row justify-center items-end gap-[2px] overflow-hidden shrink-0"
                            data-testid={`scene-selector-scenes-${date}`}
                        >
                            {sceneChunksByDate[date].map(
                                (chunk, chunkIndex) => (
                                    <div
                                        key={chunkIndex}
                                        className="flex flex-col justify-end items-center gap-[1px]"
                                    >
                                        {chunk.map((scene) => {
                                            const isSceneSelected =
                                                objectidOfSelectedScene ===
                                                scene.objectId;

                                            const notInMapExtent =
                                                objectIdsOfScenesInCurrentMapExtent &&
                                                !objectIdsOfScenesInCurrentMapExtent.includes(
                                                    scene.objectId
                                                );

                                            const withinThreshold =
                                                scene.cloudCover <=
                                                cloudCover * 100;

                                            return (
                                                <div
                                                    key={scene.objectId}
                                                    className={classNames(
                                                        'relative z-10 shrink-0 w-[8px] h-[8px] border border-custom-light-blue-50 hover:border-arcgis-highlight  bg-custom-background  cursor-pointer',
                                                        {
                                                            'bg-custom-calendar-background-selected':
                                                                isSceneSelected,
                                                            'border-custom-calendar-border-selected':
                                                                isSceneSelected,
                                                            'bg-custom-calendar-background-available':
                                                                withinThreshold &&
                                                                !isSceneSelected,
                                                            'pointer-events-none opacity-10':
                                                                notInMapExtent,
                                                        }
                                                    )}
                                                    title={format(
                                                        scene.eventTimestamp,
                                                        'yyyy-MM-dd HH:mm:ss'
                                                    )}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSceneSelect(
                                                            scene
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
                                )
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
