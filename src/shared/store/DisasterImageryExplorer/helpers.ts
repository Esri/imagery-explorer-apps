import { DisasterResponseScene } from '@typing/imagery-service';
import { DisasterResponseScenesGroupedByAcquisitionDate } from './reducer';
import { getFormatedDateString } from '@shared/utils/date-time/formatDateString';

/**
 * Ensures the groups array contains a placeholder group for the event start date.
 *
 * If a group with an acquisition date matching the event start date already exists, the array is
 * returned unchanged. Otherwise a synthetic group (empty `objectIds`, `isEventStartDate: true`,
 * `daysFromEventStart: 0`) is inserted at the correct chronological position so the event start
 * date is always visible as a reference point in the timeline UI.
 *
 * @param groups - Scene groups sorted by acquisition date (ascending).
 * @param eventStartDate - Unix timestamp (ms) of the disaster event start date.
 * @returns A new array with the event-start-date group guaranteed to be present.
 */
const addEventStartDateToGroups = (
    groups: DisasterResponseScenesGroupedByAcquisitionDate[],
    eventStartDate: number
): DisasterResponseScenesGroupedByAcquisitionDate[] => {
    if (!groups || groups.length === 0) {
        return [];
    }

    if (!eventStartDate) {
        return groups;
    }

    // get the formatted event start date, in the format of 'yyyy-MM-dd', which is the same format as the formatted acquisition date of each scene
    const formattedEventStartDate = getFormatedDateString({
        date: eventStartDate,
    });

    const containsEventStartDate = groups.some(
        (group) => group.formattedAcquisitionDate === formattedEventStartDate
    );

    // if the groups already contain a group with the acquisition date same as the event start date, no need to add a new group for the event start date
    if (containsEventStartDate) {
        return groups;
    }

    // if the acquisition date of all scenes is after the event start date, add a new group with the acquisition date same as the event start date at the beginning of the list; if the acquisition date of all scenes is before the event start date, add the new group at the end of the list; otherwise, find the correct position to insert the new group based on the acquisition date
    const firstGroupAcquisitionDate = groups[0].formattedAcquisitionDate;
    const lastGroupAcquisitionDate =
        groups[groups.length - 1].formattedAcquisitionDate;

    const groupToInsert: DisasterResponseScenesGroupedByAcquisitionDate = {
        formattedAcquisitionDate: formattedEventStartDate,
        acquisitionYear: +formattedEventStartDate.slice(0, 4),
        shouldShowYearLabel: false,
        isEventStartDate: true,
        objectIds: [],
        daysFromEventStart: 0,
        acquisitionTimeOfFirstSceneInGroup: eventStartDate,
    };

    if (firstGroupAcquisitionDate > formattedEventStartDate) {
        // all scenes are acquired after the event start date, add the new group at the beginning of the list
        return [groupToInsert, ...groups];
    }

    if (lastGroupAcquisitionDate < formattedEventStartDate) {
        // all scenes are acquired before the event start date, add the new group at the end of the list
        return [...groups, groupToInsert];
    }

    // find the correct position to insert the new group based on the acquisition date
    // it should be inserted before the first group with acquisition date greater than the event start date, which is the same as saying it should be inserted after the last group with acquisition date less than the event start date
    const indexToInsert = groups.findIndex(
        (group) => group.formattedAcquisitionDate > formattedEventStartDate
    );

    // guard: if no group is found (shouldn't happen given boundary checks above, but defensive), append at the end
    if (indexToInsert === -1) {
        return [...groups, groupToInsert];
    }

    return [
        ...groups.slice(0, indexToInsert),
        groupToInsert,
        ...groups.slice(indexToInsert),
    ];
};

/**
 * Groups an array of disaster response scenes by their acquisition date and paginates the result.
 * Each page contains at most 14 date groups. Within each group, the `objectIds` array holds the
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

    // 14 unique acquisition dates (two weeks) per page, per John Nelson's feedback.
    const maxNumOfGroupsPerPage = 14;

    const eventStartDate = scenes[0].eventStartDate;

    // get the formatted event start date, in the format of 'yyyy-MM-dd', which is the same format as the formatted acquisition date of each scene
    const formattedEventStartDate = eventStartDate
        ? getFormatedDateString({
              date: eventStartDate,
          })
        : '';
    // console.log('formattedEventStartDate', formattedEventStartDate);

    const groups: DisasterResponseScenesGroupedByAcquisitionDate[] = [];

    let currentGroup: DisasterResponseScenesGroupedByAcquisitionDate = null;

    for (let i = 0; i < scenes.length; i++) {
        const {
            objectId,
            formattedAcquisitionDate,
            acquisitionYear,
            acquisitionDate,
            daysFromEventStart,
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
                daysFromEventStart,
                acquisitionTimeOfFirstSceneInGroup: acquisitionDate,
            };

            groups.push(currentGroup);
        }

        // add the scene to the group with the same acquisition date
        currentGroup!.objectIds.push(objectId);
    }

    // Make sure the groups include a group for the event start date, even if there are no scenes acquired on that date,
    // so that the event start date can be displayed in the UI and used as a reference point for users to understand the timeline of the disaster response events and the acquired scenes
    const groupsWithEventStartDate = addEventStartDateToGroups(
        groups,
        eventStartDate
    );

    // paginate the groups for the selected event so that each page contains at most 16 groups, and set the shouldShowYearLabel flag for each group to indicate whether the year label should be shown for the group in the UI
    const pages: DisasterResponseScenesGroupedByAcquisitionDate[][] = [];

    let currentPage: DisasterResponseScenesGroupedByAcquisitionDate[] = [];

    // after grouping the scenes by acquisition date, paginate the groups for the selected event so that each page contains at most 16 groups, and set the shouldShowYearLabel flag for each group to indicate whether the year label should be shown for the group in the UI
    for (let i = 0; i < groupsWithEventStartDate.length; i++) {
        const group = groupsWithEventStartDate[i];

        // only need to show year label when the year is different from previous scene, or it's the first scene in the list of the current page
        const shouldShowYearLabel =
            currentPage.length === 0 ||
            groupsWithEventStartDate[i - 1].formattedAcquisitionDate.slice(
                0,
                4
            ) !== group.formattedAcquisitionDate.slice(0, 4);

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
