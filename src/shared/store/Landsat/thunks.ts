import { batch } from 'react-redux';
import { getLandsatScenes } from '@shared/services/landsat-level-2/getLandsatScenes';
import { selectMapCenter } from '../Map/selectors';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { availableScenesUpdated } from './reducer';
import { selectLandsatMissionsToBeExcluded } from './selectors';
import { LandsatScene } from '@typing/imagery-service';
import { getYearFromFormattedDateString } from '@shared/utils/date-time/formatDateString';
import { selectQueryParams4SceneInSelectedMode } from '../ImageryScene/selectors';

let abortController: AbortController = null;
/**
 * Query Landsat Scenes that intersect with center point of map view that were acquired within the user selected acquisition year.
 * @param year use selected acquisition year
 * @returns
 */
export const queryAvailableScenes =
    (acquisitionYear: number) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        if (!acquisitionYear) {
            return;
        }

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        try {
            const { acquisitionDate } =
                selectQueryParams4SceneInSelectedMode(getState()) || {};

            const center = selectMapCenter(getState());

            const missionsToBeExcluded = selectLandsatMissionsToBeExcluded(
                getState()
            );

            // get scenes that were acquired within the acquisition year
            const scenes = await getLandsatScenes({
                acquisitionYear,
                mapPoint: center,
                abortController,
                missionsToBeExcluded,
            });

            // If the year of the acquisition date is different from the input acquisition year, we need to query Landsat scenes acquired on the acquisition date.
            // Why are we doing this? Selecting a different year triggers this function to query available scenes for that year.
            // However, we don't want the Landsat Scene on the map and its information to disappear before a new acquisition date is selected.
            // By adding the scene acquired on the acquisition date, we ensure that the currently selected scene will remain visible until a new acquisition date is chosen.
            if (
                acquisitionDate &&
                getYearFromFormattedDateString(acquisitionDate) !==
                    acquisitionYear
            ) {
                const scenesByAcquisitionDate = await getLandsatScenes({
                    formattedAcquisitionDate: acquisitionDate,
                    mapPoint: center,
                    abortController,
                    missionsToBeExcluded,
                });

                for (const scene of scenesByAcquisitionDate) {
                    scenes.push(scene);
                }
            }

            // sort scenes uing acquisition date in an ascending order
            // which is necessary for us to select between two overlapping scenes in step below
            scenes.sort((a, b) => a.acquisitionDate - b.acquisitionDate);

            const availableScenes: LandsatScene[] = [];

            for (const scene of scenes) {
                const { formattedAcquisitionDate } = scene;

                // Only need to keep the one Landsat Scene for each day
                // therefore if there is aleady a scene in the `availableScenes` that was acquired on the same date,
                // we should just remove that scene and use the current scene instead as the current scene has later
                // acquisition date
                if (
                    availableScenes.length &&
                    availableScenes[availableScenes.length - 1]
                        .formattedAcquisitionDate == formattedAcquisitionDate
                ) {
                    availableScenes.pop();
                }

                availableScenes.push(scene);
            }

            batch(() => {
                dispatch(availableScenesUpdated(availableScenes));
            });
        } catch (err) {
            console.error(err);
        }
    };
