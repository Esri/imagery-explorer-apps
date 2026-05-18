import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectAvailableScenes,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { updateObjectIdOfSelectedScene } from '@shared/store/ImageryScene/thunks';
import classNames from 'classnames';
import React from 'react';

export const EventSceneSelectorContainer = () => {
    const dispatch = useAppDispatch();

    const imageryScenes = useAppSelector(selectAvailableScenes);

    const queryParams = useAppSelector(selectQueryParams4SceneInSelectedMode);

    return (
        <div>
            <h3>Secene Selection</h3>

            <div className="overflow-y-auto max-h-60">
                {imageryScenes.map((d) => {
                    const selected =
                        queryParams?.objectIdOfSelectedScene === d.objectId;
                    return (
                        <div
                            key={d.objectId}
                            className={classNames(
                                'mb-1 px-1 text-sm cursor-pointer  hover:text-white',
                                {
                                    'text-white font-medium': selected,
                                    'text-white/50': !selected,
                                }
                            )}
                            onClick={() => {
                                dispatch(
                                    updateObjectIdOfSelectedScene(d.objectId)
                                );
                            }}
                        >
                            <span>
                                Scene at{' '}
                                {new Date(d.acquisitionDate).toISOString()}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
