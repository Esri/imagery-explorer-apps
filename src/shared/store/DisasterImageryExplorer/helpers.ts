import { DisasterResponseScene } from '@typing/imagery-service';
import { DisasterResponseScenesGroupedByAcquisitionDate } from './reducer';
import { getFormatedDateString } from '@shared/utils/date-time/formatDateString';

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
    if (!scenes || !scenes.length) {
        return [];
    }

    const maxNumOfGroupsPerPage = 15;

    const eventStartDate = scenes[0].eventStartDate;

    // get the formatted event start date, in the format of 'yyyy-MM-dd', which is the same format as the formatted acquisition date of each scene
    const formattedEventStartDate = getFormatedDateString({
        date: eventStartDate,
    });
    // console.log('formattedEventStartDate', formattedEventStartDate);

    const groups: DisasterResponseScenesGroupedByAcquisitionDate[] = [];

    let currentGroup: DisasterResponseScenesGroupedByAcquisitionDate = null;

    for (let i = 0; i < scenes.length; i++) {
        const {
            objectId,
            formattedAcquisitionDate,
            acquisitionYear,
            acquisitionDate,
        } = scenes[i];

        if (
            !currentGroup ||
            currentGroup.formattedAcquisitionDate !== formattedAcquisitionDate
        ) {
            // create a new group for the acquisition date
            currentGroup = {
                formattedAcquisitionDate,
                shouldShowYearLabel: false,
                acquisitionYear,
                objectIds: [],
                // mark the group as event start date group if the acquisition date of the group is the same as the event start date,
                // which can be used for adding indicators in the UI to highlight the scenes that are acquired on the same day as the disaster response event starts
                isEventStartDate:
                    formattedAcquisitionDate === formattedEventStartDate,
                daysFromEventStart: Math.floor(
                    (new Date(acquisitionDate).getTime() -
                        new Date(formattedEventStartDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                ), // calculate the number of days between the acquisition date of the scenes in the group and the event start date
            };

            groups.push(currentGroup);
        }

        // add the scene to the group with the same acquisition date
        currentGroup!.objectIds.push(objectId);
    }

    // paginate the groups for the selected event so that each page contains at most 16 groups, and set the shouldShowYearLabel flag for each group to indicate whether the year label should be shown for the group in the UI
    const pages: DisasterResponseScenesGroupedByAcquisitionDate[][] = [];

    let currentPage: DisasterResponseScenesGroupedByAcquisitionDate[] = [];

    // after grouping the scenes by acquisition date, paginate the groups for the selected event so that each page contains at most 16 groups, and set the shouldShowYearLabel flag for each group to indicate whether the year label should be shown for the group in the UI
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];

        // only need to show year label when the year is different from previous scene, or it's the first scene in the list of the current page
        const shouldShowYearLabel =
            currentPage.length === 0 ||
            groups[i - 1].formattedAcquisitionDate.slice(0, 4) !==
                group.formattedAcquisitionDate.slice(0, 4);

        group.shouldShowYearLabel = shouldShowYearLabel;

        currentPage.push(group);

        if (currentPage.length >= maxNumOfGroupsPerPage) {
            pages.push(currentPage);
            currentPage = [];
        }
    }

    if (currentPage.length > 0) {
        pages.push(currentPage);
    }

    return pages;
};
