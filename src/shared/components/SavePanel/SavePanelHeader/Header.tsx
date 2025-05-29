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

import classNames from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type HeaderProps = {
    subHeader?: string;
    signedIn: boolean;
};

export const Header: FC<HeaderProps> = ({ subHeader, signedIn }) => {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <div className=" text-center mb-6">
                <h4 className=" text-2xl text-custom-light-blue mb-3">
                    {t('save_options')}
                </h4>
                {subHeader && <p className="text-sm opacity-50">{subHeader}</p>}
            </div>

            <div className="flex justify-center">
                <ul
                    className={classNames('list-inside text-sm', {
                        'opacity-50': signedIn,
                    })}
                >
                    <li>
                        {signedIn
                            ? t('dialog_can_be_closed')
                            : t('sign_in_to_save_jobs_description')}
                    </li>
                    {/* <li>
                        Downloads are available for one hour after creation.
                    </li> */}
                </ul>
            </div>
        </div>
    );
};
