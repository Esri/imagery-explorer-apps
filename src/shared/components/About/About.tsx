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

import { selectShouldShowAboutThisApp } from '@shared/store/UI/selectors';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@shared/store/configureStore';
import { CloseButton } from '../CloseButton';
import { shouldShowAboutThisAppToggled } from '@shared/store/UI/reducer';

type Props = {
    children?: React.ReactNode;
};

export const About: FC<Props> = ({ children }) => {
    const dispatch = useAppDispatch();

    const show = useSelector(selectShouldShowAboutThisApp);

    if (!show) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 px-4 py-10 bg-custom-background-95 z-20 text-custom-light-blue overflow-y-auto fancy-scrollbar">
            <CloseButton
                onClick={() => {
                    dispatch(shouldShowAboutThisAppToggled());
                }}
            />

            <div
                className="flex justify-center mt-4 mx-auto"
                style={{
                    maxWidth: '90vw',
                }}
            >
                {/* {APP_NAME === 'landsat' && <AboutLandsatExplorer />} */}
                {children}
            </div>
        </div>
    );
};
