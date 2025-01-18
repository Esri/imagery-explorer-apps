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

import { shouldShowAboutThisAppToggled } from '@shared/store/UI/reducer';
import { selectShouldShowAboutThisApp } from '@shared/store/UI/selectors';
import React, { FC, useEffect } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { useAppDispatch } from '@shared/store/configureStore';

export const useOpenAboutThisAppLink = (): void => {
    const dispatch = useAppDispatch();

    const show = useAppSelector(selectShouldShowAboutThisApp);

    useEffect(() => {
        if (show) {
            // Landsat Surface Temp app has no About This App Modal,
            // we will just open this link in a new tab whenever user clicks on the About button
            window.open(
                'https://www.usgs.gov/landsat-missions/landsat-collection-2-surface-temperature',
                '_blank'
            );

            // set shouldShowAboutThisApp back to false, so this event can be triggered again
            dispatch(shouldShowAboutThisAppToggled());
        }
    }, [show]);
};
