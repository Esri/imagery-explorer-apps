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

import React from 'react';
import { useDispatch } from 'react-redux';
import { showDownloadPanelToggled } from '@landcover-explorer/store/LandcoverUI/reducer';

const IconClassNames = 'mb-3 cursor-pointer';

const ActionBar = () => {
    const dispatch = useDispatch();

    return (
        <div className="absolute top-4 right-0 px-2 text-custom-light-blue z-10">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className={IconClassNames}
            >
                <path
                    fill="currentColor"
                    d="M12.5 7.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1zM13 18V9h-2v1h1v8h-1v1h3v-1zm9.8-5.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"
                />
                <path fill="none" d="M0 0h24v24H0z" />
            </svg>

            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className={IconClassNames}
                onClick={() => {
                    dispatch(showDownloadPanelToggled(true));
                }}
            >
                <path
                    fill="currentColor"
                    d="M13 3v12.294l2.647-2.647.707.707-3.853 3.854-3.854-3.854.707-.707L12 15.292V3zM6 21h13v-1H6z"
                />
                <path fill="none" d="M0 0h24v24H0z" />
            </svg> */}
        </div>
    );
};

export default ActionBar;
