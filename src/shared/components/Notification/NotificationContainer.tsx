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

import React, { useEffect, useState } from 'react';
import { Notification } from './Notification';
import { useShouldHideNitification } from './useShouldHideNitification';

export const NotificationContainer = () => {
    const { shouldHide, hideNotification } = useShouldHideNitification();

    if (shouldHide) {
        return null;
    }

    return (
        <Notification closeButtonOnClick={hideNotification}>
            <p className="text-sm max-w-3xl">
                Level-1 product processing of Landsat 7, Landsat 8, and Landsat
                9 scenes acquired December 19, 2023, to the present has been
                paused while engineers investigate an issue with the processing
                systems.{' '}
                <a
                    className=" underline"
                    href="https://www.usgs.gov/landsat-missions/news/landsat-level-1-product-processing-temporarily-paused"
                    target="_blank"
                    rel="noreferrer"
                >
                    Learn more
                </a>
            </p>
        </Notification>
    );
};
