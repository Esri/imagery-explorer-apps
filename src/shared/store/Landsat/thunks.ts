import { batch } from 'react-redux';
import {
    // getLandsatFeatureByObjectId,
    // getLandsatSceneByObjectId,
    getLandsatScenes,
} from '@shared/services/landsat-level-2/getLandsatScenes';
import { selectMapCenter } from '../Map/selectors';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { landsatScenesUpdated } from './reducer';
import { selectLandsatMissionsToBeExcluded } from './selectors';
import { LandsatScene } from '@typing/imagery-service';
// import {
//     formattedDateString2Unixtimestamp,
//     getYearFromFormattedDateString,
// } from '@shared/utils/date-time/formatDateString';
// import { selectQueryParams4SceneInSelectedMode } from '../ImageryScene/selectors';
import {
    ImageryScene,
    availableImageryScenesUpdated,
} from '../ImageryScene/reducer';
import { DateRange } from '@typing/shared';

let abortController: AbortController = null;
/**
 * Query Landsat Scenes that intersect with center point of map view that were acquired within the user selected acquisition year.
 * @param year use selected acquisition year
 * @returns
 */
export const queryAvailableScenes =
    (acquisitionDateRange: DateRange) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        if (!acquisitionDateRange) {
            return;
        }

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        try {
            // const { objectIdOfSelectedScene, acquisitionDate } =
            //     selectQueryParams4SceneInSelectedMode(getState()) || {};

            const center = selectMapCenter(getState());

            const missionsToBeExcluded = selectLandsatMissionsToBeExcluded(
                getState()
            );

            // get scenes that were acquired within the acquisition year
            const scenes = await getLandsatScenes({
                acquisitionDateRange,
                mapPoint: center,
                abortController,
                missionsToBeExcluded,
            });

            // If the year of the acquisition date is different from the input acquisition year, we need to query Landsat scenes acquired on the acquisition date.
            // Why are we doing this? Selecting a different year triggers this function to query available scenes for that year.
            // However, we don't want the Landsat Scene on the map and its information to disappear before a new acquisition date is selected.
            // By adding the scene acquired on the acquisition date, we ensure that the currently selected scene will remain visible until a new acquisition date is chosen.
            // if (
            //     acquisitionDate &&
            //     getYearFromFormattedDateString(acquisitionDate) !==
            //         acquisitionYear
            // ) {
            //     const scenesByAcquisitionDate = await getLandsatScenes({
            //         formattedAcquisitionDate: acquisitionDate,
            //         mapPoint: center,
            //         abortController,
            //         missionsToBeExcluded,
            //     });

            //     for (const scene of scenesByAcquisitionDate) {
            //         scenes.push(scene);
            //     }
            // }

            // // Check if a specific acquisition date is selected and falls outside the range of acquisition dates used avove.
            // // If so, it's necessary to query Landsat scenes acquired on the user-selected date.
            // // This step prevents the disappearance of the currently displayed Landsat Scene and its information
            // // until a new acquisition date is selected.
            // // Including the scene acquired on the selected date guarantees its visibility until a new acquisition date is chosen.
            // if (
            //     acquisitionDate &&
            //     (formattedDateString2Unixtimestamp(acquisitionDate) <
            //         formattedDateString2Unixtimestamp(
            //             acquisitionDateRange.startDate
            //         ) ||
            //         formattedDateString2Unixtimestamp(acquisitionDate) >
            //             formattedDateString2Unixtimestamp(
            //                 acquisitionDateRange.endDate
            //             ))
            // ) {
            //     const scenesByAcquisitionDate = await getLandsatScenes({
            //         acquisitionDate,
            //         mapPoint: center,
            //         abortController,
            //         missionsToBeExcluded,
            //     });

            //     for (const scene of scenesByAcquisitionDate) {
            //         scenes.push(scene);
            //     }
            // }

            // sort scenes uing acquisition date in an ascending order
            // which is necessary for us to select between two overlapping scenes in step below
            scenes.sort((a, b) => a.acquisitionDate - b.acquisitionDate);

            const landsatScenes: LandsatScene[] = [];

            for (const scene of scenes) {
                const { formattedAcquisitionDate } = scene;

                // Only need to keep the one Landsat Scene for each day
                // therefore if there is aleady a scene in the `availableScenes` that was acquired on the same date,
                // we should just remove that scene and use the current scene instead as the current scene has later
                // acquisition date
                if (
                    landsatScenes.length &&
                    landsatScenes[landsatScenes.length - 1]
                        .formattedAcquisitionDate == formattedAcquisitionDate
                ) {
                    landsatScenes.pop();
                }

                landsatScenes.push(scene);
            }

            // convert list of Landsat scenes to list of imagery scenes
            const imageryScenes: ImageryScene[] = landsatScenes.map(
                (landsatScene: LandsatScene) => {
                    const {
                        objectId,
                        name,
                        formattedAcquisitionDate,
                        acquisitionDate,
                        acquisitionYear,
                        acquisitionMonth,
                        cloudCover,
                        satellite,
                    } = landsatScene;

                    const imageryScene: ImageryScene = {
                        objectId,
                        sceneId: name,
                        formattedAcquisitionDate,
                        acquisitionDate,
                        acquisitionYear,
                        acquisitionMonth,
                        cloudCover,
                        satellite,
                    };

                    return imageryScene;
                }
            );

            batch(() => {
                dispatch(landsatScenesUpdated(landsatScenes));
                dispatch(availableImageryScenesUpdated(imageryScenes));
            });
        } catch (err) {
            console.error(err);
        }
    };
