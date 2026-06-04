import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { pageIndexUpdated } from '@shared/store/DisasterImageryExplorer/reducer';
import { selectScenePaginationPages } from '@shared/store/DisasterImageryExplorer/selectors';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import React, { useEffect } from 'react';

export const useSyncPaginationWithScene = () => {
    const dispatch = useAppDispatch();

    const querParams4SelectedScene = useAppSelector(
        selectQueryParams4SceneInSelectedMode
    );

    const scenePaginationPages = useAppSelector(selectScenePaginationPages);

    useEffect(() => {
        if (!querParams4SelectedScene?.objectIdOfSelectedScene) {
            // console.warn('No scene is selected, cannot sync pagination with selected scene');
            return;
        }

        if (!scenePaginationPages || scenePaginationPages.length === 0) {
            // console.warn('Scene pagination pages are not available, cannot sync pagination with selected scene');
            return;
        }

        if (scenePaginationPages.length === 1) {
            // if there is only one page, we don't need to sync pagination with selected scene because there is no other page to switch to
            return;
        }

        // find the page index of the selected scene based on the objectId of the selected scene, and update the pagination current page index to that page index so that the pagination will be in sync with the selected scene
        let pageIndexOfSelectedScene = -1;

        for (let i = 0; i < scenePaginationPages.length; i++) {
            const page = scenePaginationPages[i];

            for (const group of page) {
                if (
                    group.objectIds.includes(
                        querParams4SelectedScene.objectIdOfSelectedScene
                    )
                ) {
                    pageIndexOfSelectedScene = i;
                    break;
                }
            }
            if (pageIndexOfSelectedScene !== -1) {
                break;
            }
        }

        if (pageIndexOfSelectedScene === -1) {
            // console.warn('Cannot find the page of the selected scene, cannot sync pagination with selected scene');
            return;
        }

        dispatch(pageIndexUpdated(pageIndexOfSelectedScene));
    }, [
        querParams4SelectedScene?.objectIdOfSelectedScene,
        scenePaginationPages,
    ]);
};
