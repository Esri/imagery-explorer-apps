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
    // const groupByDate = new Map<
    //     string,
    //     DisasterResponseScenesGroupedByAcquisitionDate
    // >();

    let currentPage: DisasterResponseScenesGroupedByAcquisitionDate[] = [];

    let previousGroup: DisasterResponseScenesGroupedByAcquisitionDate = null;
    let currentGroup: DisasterResponseScenesGroupedByAcquisitionDate = null;

    for (let i = 0; i < scenes.length; i++) {
        const {
            objectId,
            formattedAcquisitionDate,
            acquisitionYear,
            imageType,
        } = scenes[i];

        if (
            !currentGroup ||
            currentGroup.formattedAcquisitionDate !== formattedAcquisitionDate
        ) {
            // if there is an existing group, assign it to previousGroup before creating a new group for the next acquisition date
            if (currentGroup) {
                previousGroup = currentGroup;
            }

            // only need to show year label when the year is different from previous scene, or it's the first scene in the list
            // of the current page
            const shouldShowYearLabel =
                currentPage.length === 0 ||
                scenes[i - 1].acquisitionYear !== acquisitionYear;

            // create a new group for the acquisition date
            currentGroup = {
                formattedAcquisitionDate,
                shouldShowYearLabel: shouldShowYearLabel,
                objectIds: [],
                imageType: 'pre-event', // default to 'pre-event', will be updated to 'post-event' if any scene in the group is a post-event image
                firstGroupWithPostEventImage: false, // default to false, will be updated to true when the first group with post-event image is encountered in the list
            };

            currentPage.push(currentGroup);

            if (currentPage.length >= maxNumOfGroupsPerPage) {
                pages.push(currentPage);
                currentPage = [];
            }
        }

        // // create a new group for the acquisition date if it doesn't exist, and add the group to the current page
        // if (!groupByDate.has(formattedAcquisitionDate)) {
        //     // only need to show year label when the year is different from previous scene, or it's the first scene in the list
        //     // of the current page
        //     const shouldShowYearLabel =
        //         currentPage.length === 0 ||
        //         scenes[i - 1].acquisitionYear !== acquisitionYear;

        //     const group: DisasterResponseScenesGroupedByAcquisitionDate = {
        //         formattedAcquisitionDate,
        //         shouldShowYearLabel,
        //         objectIds: [],
        //         imageType: 'pre-event', // default to 'pre-event', will be updated to 'post-event' if any scene in the group is a post-event image
        //     };

        //     groupByDate.set(formattedAcquisitionDate, group);
        //     currentPage.push(group);

        //     if (currentPage.length >= maxNumOfGroupsPerPage) {
        //         pages.push(currentPage);
        //         currentPage = [];
        //     }
        // }

        // add the scene to the group with the same acquisition date
        currentGroup!.objectIds.push(objectId);

        if (imageType === 'post-event') {
            // if any scene in the group is a post-event image, the image type of the group will be 'post-event'
            currentGroup!.imageType = 'post-event';
        }

        // if the current group is a post-event group, and the previous group is a pre-event group, then mark the current group as the first group with post-event image,
        // which can be used for adding indicators in the UI to differentiate pre-event and post-event images, and help users quickly identify the scenes they are interested in.
        if (
            currentGroup.imageType === 'post-event' &&
            previousGroup &&
            previousGroup.imageType === 'pre-event'
        ) {
            currentGroup.firstGroupWithPostEventImage = true;
        }
    }

    if (currentPage.length > 0) {
        pages.push(currentPage);
    }

    return pages;
};
