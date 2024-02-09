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
