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

import React from 'react';
// import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import EsriLogo from './esri-logo.png';
import { selectShouldShowAboutThisApp } from '@shared/store/UI/selectors';
import { About } from '@shared/components/About';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

export const AboutNLCDLandcoverExplorer = () => {
    // const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const show = useAppSelector(selectShouldShowAboutThisApp);

    if (!show) {
        return null;
    }

    return (
        <About>
            <div
                className="py-10"
                style={{
                    maxWidth: 1680,
                }}
            >
                About NLCD Land Cover Explorer.
            </div>
        </About>
    );
};

// export default AboutLandcoverExplorer;
