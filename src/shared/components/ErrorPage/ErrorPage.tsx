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
import { Trans, useTranslation } from 'react-i18next';

type Props = {
    error?: Error;
};

export const ErrorPage: FC<Props> = ({ error }) => {
    const { t } = useTranslation();

    return (
        <div className="flex justify-center items-center w-screen h-screen theme-background text-custom-light-blue">
            <div className="max-w-3xl">
                <p>{t('app_temporarily_unavailable')}</p>

                {error && error.message ? (
                    <p className="mt-4 text-sm italic">
                        {t('error_details')}: {error.message}
                    </p>
                ) : null}

                <div className="mt-6 ">
                    <Trans
                        i18nKey="report_issue"
                        components={{
                            action: (
                                <a
                                    href="https://github.com/Esri/imagery-explorer-apps/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline font-bold"
                                ></a>
                            ),
                        }}
                    ></Trans>
                </div>
            </div>
        </div>
    );
};
