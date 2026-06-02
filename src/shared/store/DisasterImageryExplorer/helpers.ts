import { DisasterResponseScene } from '@typing/imagery-service';
import { DisasterResponseScenesGroupedByAcquisitionDate } from './reducer';

/**
 * Groups an array of disaster response scenes by their acquisition date and paginates the result.
 * Each page contains at most 16 date groups. Within each group, the `objectIds` array holds the
 * object IDs of all scenes that share that acquisition date.
 *
 * The `shouldShowYearLabel` flag on each group is set to `true` when the group is the first on
 * its page, or when its acquisition year differs from the previous scene's year — indicating that
 * a year header should be rendered in the UI.
 *
 * @param scenes - Flat list of disaster response scenes, expected to be sorted by acquisition date.
 * @returns A 2D array where each inner array is one page of date groups.
 */
export const getPaginatedScenesGroupedByAcquisitionDate = (
    scenes: DisasterResponseScene[]
): DisasterResponseScenesGroupedByAcquisitionDate[][] => {
    const maxNumOfGroupsPerPage = 16;

    const pages: DisasterResponseScenesGroupedByAcquisitionDate[][] = [];
    const groupByDate = new Map<
        string,
        DisasterResponseScenesGroupedByAcquisitionDate
    >();

    let currentPage: DisasterResponseScenesGroupedByAcquisitionDate[] = [];

    for (let i = 0; i < scenes.length; i++) {
        const { objectId, formattedAcquisitionDate, acquisitionYear } =
            scenes[i];

        // create a new group for the acquisition date if it doesn't exist, and add the group to the current page
        if (!groupByDate.has(formattedAcquisitionDate)) {
            // only need to show year label when the year is different from previous scene, or it's the first scene in the list
            // of the current page
            const shouldShowYearLabel =
                currentPage.length === 0 ||
                scenes[i - 1].acquisitionYear !== acquisitionYear;

            const group: DisasterResponseScenesGroupedByAcquisitionDate = {
                formattedAcquisitionDate,
                shouldShowYearLabel,
                objectIds: [],
            };

            groupByDate.set(formattedAcquisitionDate, group);
            currentPage.push(group);

            if (currentPage.length >= maxNumOfGroupsPerPage) {
                pages.push(currentPage);
                currentPage = [];
            }
        }

        // add the scene to the group with the same acquisition date
        groupByDate.get(formattedAcquisitionDate)!.objectIds.push(objectId);
    }

    if (currentPage.length > 0) {
        pages.push(currentPage);
    }

    return pages;
};
