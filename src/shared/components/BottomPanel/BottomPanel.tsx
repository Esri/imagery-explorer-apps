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

import './BottomPanel.css';
import React, { FC } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { selectHideBottomPanel } from '../../store/UI/selectors';
import { BottomPanelToggleBtn } from '../BottomPanelToggleBtn';
import { BottomPanelTooltip } from './BottomPanelTooltip';
import classNames from 'classnames';

type Props = {
    children: React.ReactNode;
};

const BottomPanel: FC<Props> = ({ children }) => {
    const shouldHide = useAppSelector(selectHideBottomPanel);

    return (
        <>
            <BottomPanelToggleBtn />

            <BottomPanelTooltip />

            {shouldHide === false && (
                <div className="bottom-panel absolute bottom-0 left-0 w-full h-bottom-panel-height z-10 fancy-scrollbar">
                    <div className="theme-background absolute top-0 left-0 w-full h-full"></div>
                    <div className="bottom-panel-top-shadow absolute top-0 left-0 w-full"></div>

                    <div
                        className={classNames(
                            'relative flex h-full p-4 pb-2 text-custom-light-blue z-10 fancy-scrollbar',
                            /**
                             * We need to set `overflow-y` to `unset` if the bottom panel has the minimum width that can make all content fit into.
                             * in this case the dropdown menu can extend to outside of the botton panel.
                             */
                            'overflow-y-auto bottom-panel-content-min-width:overflow-y-unset'
                        )}
                    >
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default BottomPanel;
