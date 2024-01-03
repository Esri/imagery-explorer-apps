import { APP_NAME } from '@shared/config';
import React, { useEffect, useState } from 'react';

/**
 * This is the custom hook that determines if the notification should be hidden by default.
 *
 * To-Do:
 * When user clicks on hide button to close a notification. We wil need to save a value a the local storage
 * to help us know how long this notifiction should stay closed (1 day, 1 week or forever).
 *
 * @param timeToHideInSeconds
 * @returns
 */
export const useShouldHideNitification = () => {
    const [shouldHide, setShouldHide] = useState<boolean>(false);

    const hideNotification = () => {
        setShouldHide(true);
    };

    return {
        shouldHide,
        hideNotification,
    };
};
