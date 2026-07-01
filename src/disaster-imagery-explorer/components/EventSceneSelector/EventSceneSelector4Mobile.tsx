import { APP_NAME } from '@shared/config';
import type { DisasterResponseScene } from '@typing/imagery-service';
import classNames from 'classnames';
import React, { type FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
    data: DisasterResponseScene[];
    /**
     * The objectId of the currently selected scene. It is used to determine which scene is currently selected and apply different styles to it.
     */
    objectIdOfSelectedScene: number;
    /**
     * The objectIds of scenes that are in the current map extent. It is used to determine which scenes are in the current map extent and display a message if there is no scene in the current map extent.
     */
    objectIdsOfScenesInCurrentMapExtent: number[];
    /**
     * Handler function that is called when a scene is selected.
     * @param scene
     * @returns
     */
    handleSceneSelect: (scene: DisasterResponseScene) => void;
};

export const EventSceneSelector4Mobile: FC<Props> = ({
    data,
    objectIdOfSelectedScene,
    objectIdsOfScenesInCurrentMapExtent,
    handleSceneSelect,
}) => {
    const { t } = useTranslation();

    if (!data?.length) {
        return (
            <div className="w-full flex items-center justify-center text-center">
                <p className="text-sm text-custom-light-blue-50 max-w-sm mt-6">
                    {t('no_scenes_in_current_map_extent', {
                        ns: APP_NAME,
                    })}
                </p>
            </div>
        );
    }

    return (
        <div className="w-full pb-4">
            {[...data]
                .sort((a, b) => b.eventTimestamp - a.eventTimestamp)
                .map((scene) => {
                    const isSceneInCurrentMapExtent =
                        objectIdsOfScenesInCurrentMapExtent &&
                        objectIdsOfScenesInCurrentMapExtent?.includes(
                            scene.objectId
                        );

                    return (
                        <div
                            key={scene.objectId}
                            className={classNames(
                                'w-full border  mb-2 p-2 text-sm flex items-center gap-2',
                                {
                                    'border-custom-light-blue-20':
                                        scene.objectId !==
                                        objectIdOfSelectedScene,
                                    'border-custom-light-blue-70':
                                        scene.objectId ===
                                        objectIdOfSelectedScene,
                                    'is-disabled':
                                        isSceneInCurrentMapExtent === false,
                                }
                            )}
                            onClick={() => {
                                handleSceneSelect(scene);
                            }}
                        >
                            <div className="flex-shrink-0 mr-2">
                                <calcite-icon
                                    icon={
                                        scene.objectId ===
                                        objectIdOfSelectedScene
                                            ? 'check-circle'
                                            : 'circle'
                                    }
                                    scale="s"
                                />
                            </div>

                            <div className="grow">
                                <p className=" text-xs">
                                    <Trans
                                        i18nKey={'acquired_on'}
                                        ns={APP_NAME}
                                        values={{
                                            date:
                                                scene.formattedAcquisitionDate +
                                                ' ' +
                                                scene.formattedAcuisitionTime,
                                        }}
                                    />
                                </p>

                                <p className="text-custom-light-blue-80 text-xs">
                                    <Trans
                                        i18nKey={
                                            scene.imageType === 'pre-event'
                                                ? 'pre_event_scene_with_cloud_cover'
                                                : 'post_event_scene_with_cloud_cover'
                                        }
                                        ns={APP_NAME}
                                        values={{
                                            cloudCover: scene.cloudCover,
                                        }}
                                        components={{
                                            bold: (
                                                <strong className="font-medium" />
                                            ),
                                        }}
                                    />
                                </p>

                                {isSceneInCurrentMapExtent === false && (
                                    <p className="text-custom-light-blue-50 text-xs mt-1">
                                        {t('scene_not_in_current_map_extent', {
                                            ns: APP_NAME,
                                        })}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};
