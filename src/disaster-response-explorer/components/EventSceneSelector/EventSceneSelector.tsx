import { useAppSelector } from '@shared/store/configureStore';
import { DisasterResponseScenesGroupedByAcquisitionDate } from '@shared/store/DisasterResponse/reducer';
import { selectDisasterResponseScenesByObjectId } from '@shared/store/DisasterResponse/selectors';
import { DisasterResponseScene } from '@typing/imagery-service';
import classNames from 'classnames';
import { format } from 'date-fns';
import React, { FC } from 'react';

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

    return (
        <div className="flex justify-evenly h-full pb-4">
            {/* horizontal line separates label on text and the scene cells */}
            <div className="absolute top-[26px] left-0 right-0 h-px bg-custom-light-blue-10" />

            {scenesGroupedByAcquisitionDate.map((d) => {
                // const isSelected = queryParams?.acquisitionDate === date;
                const objectIdsOfScenesInGroup = d.objectIds;
                const shouldShowYearLabel = d.shouldShowYearLabel;
                const date = d.formattedAcquisitionDate;

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

                        <div className="flex-1 relative flex flex-col justify-end items-center gap-[1px] overflow-hidden mt-1">
                            {/* dotted vertical line spanning full height */}
                            <div className="absolute top-0 h-full left-1/2 w-0 border-l border-dashed border-custom-light-blue-50 z-0" />

                            {objectIdsOfScenesInGroup.map((objectId) => {
                                const scene = byObjectIdOfScenes[objectId];

                                if (!scene) return null;

                                const isSceneSelected =
                                    objectidOfSelectedScene === scene.objectId;

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
                                            handleSceneSelect(scene);
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
