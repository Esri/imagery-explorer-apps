import { useAppSelector } from '@shared/store/configureStore';
import {
    selectAppMode,
    selectListOfQueryParams,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import React from 'react';

/**
 * Custom hook to retrieve the object IDs of selected scenes based on the current application mode.
 *
 * The application modes and their corresponding behaviors are:
 * - 'find a scene' or 'analysis': Returns the object ID of the main selected scene.
 * - 'swipe': Returns the object IDs of both the main and secondary selected scenes.
 * - 'animate': Returns the object IDs of all selected scenes in the list.
 *
 * The hook ensures that the returned object IDs are filtered to exclude any null or undefined values.
 *
 * @returns {number[]} An array of object IDs of the selected scenes.
 */
export const useObjectIdOfSelectedScenes = () => {
    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const queryParams4ListOfScenes = useAppSelector(selectListOfQueryParams);

    const mode = useAppSelector(selectAppMode);

    const objectIds: number[] = React.useMemo(() => {
        let output: number[] = [];

        if (mode === 'find a scene' || mode === 'analysis') {
            output = [queryParams4MainScene.objectIdOfSelectedScene];
        } else if (mode === 'swipe') {
            output = [
                queryParams4MainScene.objectIdOfSelectedScene,
                queryParams4SecondaryScene.objectIdOfSelectedScene,
            ];
        } else if (mode === 'animate') {
            output = queryParams4ListOfScenes.map(
                (d) => d.objectIdOfSelectedScene
            );
        }

        return output.filter((d) => d !== null && d !== undefined) as number[];
    }, [
        mode,
        queryParams4MainScene?.objectIdOfSelectedScene,
        queryParams4SecondaryScene?.objectIdOfSelectedScene,
        queryParams4ListOfScenes,
    ]);

    return objectIds;
};
