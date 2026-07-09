import { getObjectIdsOfIntersectingScenes } from '@shared/services/disaster-response/getObjectIdsOfIntersectingScenes';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectAppMode,
    selectIsSecondarySceneActive,
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
    selectSwipeSubMode,
} from '@shared/store/ImageryScene/selectors';
import React, { useEffect, useMemo, useState } from 'react';

export const useObjectIdsOfScenesIntersectingSwipeScene = (): number[] => {
    const mode = useAppSelector(selectAppMode);

    const swipeSubMode = useAppSelector(selectSwipeSubMode);

    const isSecondarySceneActive = useAppSelector(selectIsSecondarySceneActive);

    const queryParams4LeftSide = useAppSelector(selectQueryParams4MainScene);

    const queryParams4RightSide = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const [objectIdsOfIntersectedScenes, setObjectIdsOfIntersectedScenes] =
        useState<number[]>([]);

    // determine if we should calculate the intersected scenes based on the current mode and swipe sub-mode, as well as the selected scenes on both sides of the swipe
    const shouldCalculateIntersectedScenes = useMemo(() => {
        // only need to calculate the intersected scenes when the mode is swipe and the swipe sub-mode is scene-to-scene
        if (mode !== 'swipe' || swipeSubMode !== 'scene-to-scene') {
            return false;
        }

        // if neither the left side nor the right side has a selected scene, then there is no need to calculate the intersected scenes
        if (
            !queryParams4LeftSide?.objectIdOfSelectedScene &&
            !queryParams4RightSide?.objectIdOfSelectedScene
        ) {
            return false;
        }

        // if the left side is active and there is no selected scene on right side, then there is no need to calculate the intersected scenes
        if (
            !isSecondarySceneActive &&
            !queryParams4RightSide?.objectIdOfSelectedScene
        ) {
            return false;
        }

        // if the right side is active and there is no selected scene on left side, then there is no need to calculate the intersected scenes
        if (
            isSecondarySceneActive &&
            !queryParams4LeftSide?.objectIdOfSelectedScene
        ) {
            return false;
        }

        return true;
    }, [
        mode,
        swipeSubMode,
        isSecondarySceneActive,
        queryParams4LeftSide?.objectIdOfSelectedScene,
        queryParams4RightSide?.objectIdOfSelectedScene,
    ]);

    const fetchObjectIdsOfIntersectedScenes = async (
        objectIdOfSceneToIntersectWith: number
    ): Promise<void> => {
        if (!objectIdOfSceneToIntersectWith) {
            setObjectIdsOfIntersectedScenes([]);
        }

        try {
            const intersectedScenes: number[] =
                await getObjectIdsOfIntersectingScenes(
                    objectIdOfSceneToIntersectWith
                );
            setObjectIdsOfIntersectedScenes(intersectedScenes);
        } catch (error) {
            console.error('Error fetching intersected scenes:', error);
            setObjectIdsOfIntersectedScenes([]);
        }
    };

    useEffect(() => {
        if (!shouldCalculateIntersectedScenes) {
            setObjectIdsOfIntersectedScenes([]);
            return;
        }

        // logic to calculate the intersected scenes based on the selected scenes on both sides of the swipe
        const leftSceneId = queryParams4LeftSide?.objectIdOfSelectedScene;
        const rightSceneId = queryParams4RightSide?.objectIdOfSelectedScene;

        // placeholder for actual intersection calculation logic
        const objectIdOfSceneToIntersectWith = isSecondarySceneActive
            ? leftSceneId
            : rightSceneId;

        if (!objectIdOfSceneToIntersectWith) {
            setObjectIdsOfIntersectedScenes([]);
            return;
        }

        // fetch intersected scenes based on the selected scene's object ID
        fetchObjectIdsOfIntersectedScenes(objectIdOfSceneToIntersectWith);
    }, [
        shouldCalculateIntersectedScenes,
        queryParams4LeftSide?.objectIdOfSelectedScene,
        queryParams4RightSide?.objectIdOfSelectedScene,
        isSecondarySceneActive,
    ]);

    if (!shouldCalculateIntersectedScenes) {
        return null;
    }

    return objectIdsOfIntersectedScenes;
};
