/* Copyright 2025 Esri
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

import { IMAGERY_EXPLORER_APPS } from '@shared/components/AppHeader/AppHeader';
import { APP_NAME } from '@shared/config';
import React, { useMemo } from 'react';

/**
 * This hook returns the title of the app.
 * @returns
 */
export const useAppTitle = () => {
    const title = useMemo(() => {
        return (
            IMAGERY_EXPLORER_APPS.find((app) => app.appName === APP_NAME)
                ?.title || 'Imagery Explorer'
        );
    }, []);

    return title;
};
