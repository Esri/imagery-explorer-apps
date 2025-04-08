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

import React, { FC } from 'react';

type Props = {
    // closeButtonOnClick: () => void;
    // donwloadButtonOnClick: () => void;
    children?: React.ReactNode;
};

const Header: FC<Props> = ({ children }: Props) => {
    return (
        <div className="relative text-custom-light-blue flex justify-between items-center mb-4 z-10">
            {/* <div className="flex items-center">
                <h5 className="uppercase mr-4">Land Cover in Acres</h5>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    className="cursor-pointer"
                    onClick={donwloadButtonOnClick}
                >
                    <path
                        fill="currentColor"
                        d="M13 3v12.294l2.647-2.647.707.707-3.853 3.854-3.854-3.854.707-.707L12 15.292V3zM6 21h13v-1H6z"
                    />
                    <path fill="none" d="M0 0h24v24H0z" />
                </svg>
            </div> */}

            <div className="lg:flex items-center">{children}</div>
        </div>
    );
};

export default Header;
