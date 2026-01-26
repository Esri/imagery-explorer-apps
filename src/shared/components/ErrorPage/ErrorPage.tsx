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
    error?: Error;
};

export const ErrorPage: FC<Props> = ({ error }) => {
    const erroMessage = error?.message || 'An unexpected error has occurred.';

    return (
        <div className="flex justify-center items-center w-screen h-screen theme-background text-custom-light-blue">
            <div className="max-w-3xl">
                <p>
                    This app is temporarily unavailable due to an issue fetching
                    data from one of the data services.
                </p>

                <p className="mt-4 text-sm italic">
                    {'Error Details'}: {erroMessage}
                </p>

                <div className="mt-6 pt-6 border-t border-custom-light-blue-50">
                    {/* <Trans
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
                    ></Trans> */}

                    <p>
                        If this problem persists, please report it by opening a
                        new issue in the app’s{' '}
                        <a
                            href="https://github.com/Esri/imagery-explorer-apps/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline font-bold"
                        >
                            GitHub Issues page
                        </a>{' '}
                        so our team can investigate and get it resolved as
                        quickly as possible.
                    </p>
                </div>
            </div>
        </div>
    );
};
