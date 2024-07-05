/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectListOfQueryParams,
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { Sentinel1Scene } from '@typing/imagery-service';
import { getSentinel1SceneByObjectId } from '@shared/services/sentinel-1/getSentinel1Scenes';
import {
    lockedRelativeOrbitChanged,
    LockedRelativeOrbitInfo,
} from '@shared/store/Sentinel1/reducer';
import { useDispatch } from 'react-redux';

/**
 * Custom hook that determines the relative orbit (and the object Id of associated sentinel 1 scene) to be used by the different Analyze tools (e.g. temporal composite and change compare).
 * These tools require all scenes selected by the user to have the same relative orbit.
 * This hook tries to find the first scene that the user has selected and uses the relative orbit of that scene to
 * query the rest of the scenes.
 *
 * @returns void
 */
export const useLockedRelativeOrbit = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const queryParamsOfMainScene = useSelector(selectQueryParams4MainScene);

    const queryParamsOfSecondaryScene = useSelector(
        selectQueryParams4SecondaryScene
    );

    const listOfQueryParams = useSelector(selectListOfQueryParams);

    const [sentinel1Scene, setSentinel1Scene] = useState<Sentinel1Scene>();

    /**
     * useMemo hook to compute the relative orbit based on the mode, active analysis tool, and selected Sentinel-1 scene.
     * The relative orbit is only relevant when the mode is 'analysis' and the analysis tool is 'temporal composite' or 'change compare'.
     */
    const lockedRelativeOrbit: LockedRelativeOrbitInfo = useMemo(() => {
        if (mode !== 'analysis' || !sentinel1Scene) {
            return null;
        }

        if (
            analysisTool !== 'temporal composite' &&
            analysisTool !== 'change'
        ) {
            return null;
        }

        if (!sentinel1Scene) {
            return null;
        }

        const { relativeOrbit, objectId } = sentinel1Scene;

        return {
            relativeOrbit,
            objectId,
        };
    }, [mode, analysisTool, sentinel1Scene]);

    /**
     * useEffect hook to update the selected Sentinel-1 scene when the mode, analysis tool, or query parameters change.
     * It asynchronously fetches the scene data using the first valid object ID from the list of query parameters.
     */
    useEffect(() => {
        (async () => {
            if (mode !== 'analysis') {
                return setSentinel1Scene(null);
            }

            if (
                analysisTool !== 'temporal composite' &&
                analysisTool !== 'change'
            ) {
                return setSentinel1Scene(null);
            }

            // object id of the first scene that the user has selected
            // the relative orbit of this scene will be used to query subsequent scenes
            // so that we can gurantee that all scenes used in the 'temporal composite' and 'change compare' tool are
            // acquired from the same relative orbit
            let objectIdOfSelectedScene: number = null;

            if (analysisTool === 'temporal composite') {
                // Find the first item in the list that has an associated object ID
                for (const item of listOfQueryParams) {
                    if (item.objectIdOfSelectedScene) {
                        objectIdOfSelectedScene = item.objectIdOfSelectedScene;
                        break;
                    }
                }
            } else if (analysisTool === 'change') {
                objectIdOfSelectedScene =
                    queryParamsOfMainScene?.objectIdOfSelectedScene ||
                    queryParamsOfSecondaryScene?.objectIdOfSelectedScene;
            }

            // if no items in the list has object id selected, then set the sentinel1 scene to null
            if (!objectIdOfSelectedScene) {
                return setSentinel1Scene(null);
            }

            // Fetch the selected Sentinel-1 scene data
            const data = await getSentinel1SceneByObjectId(
                objectIdOfSelectedScene
            );

            setSentinel1Scene(data);
        })();
    }, [queryParams?.objectIdOfSelectedScene, mode, analysisTool]);

    useEffect(() => {
        dispatch(lockedRelativeOrbitChanged(lockedRelativeOrbit));
    }, [lockedRelativeOrbit]);

    // return {
    //     lockedRelativeOrbit,
    //     objectIdOfSceneWithLockedRelativeOrbit: sentinel1Scene?.objectId,
    // };
};
