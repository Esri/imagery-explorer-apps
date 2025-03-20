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

import { APP_NAME, appConfig } from '@shared/config';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AboutSentinel1ExplorerContent = () => {
    const { t } = useTranslation();
    return (
        <div
            className="py-10"
            style={{
                maxWidth: 1680,
            }}
        >
            <div className="flex items-center mb-8">
                <div className=" text-custom-light-blue text-3xl pr-4 mr-4">
                    <span>
                        {t('esri_sentinel_1_explorer', { ns: APP_NAME })}
                    </span>
                </div>
            </div>

            <div className="mb-8 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    {t('about_the_data_title', { ns: APP_NAME })}
                </h3>

                <p className="mb-4">
                    {t('about_the_data_content_1', { ns: APP_NAME })}
                </p>

                <p className="mb-4">
                    {t('about_the_data_content_2', { ns: APP_NAME })}
                </p>

                <p className="mb-4">
                    {t('about_the_data_content_3', { ns: APP_NAME })}
                </p>
            </div>

            <div className="mb-8 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    {t('about_the_app_title', { ns: APP_NAME })}
                </h3>

                <p className="mb-4">
                    {t('about_the_app_content_1', { ns: APP_NAME })}
                </p>

                <p className="mb-4">
                    {t('about_the_app_content_2', { ns: APP_NAME })}
                </p>

                <ul className="list-disc list-inside">
                    <li>{t('about_the_app_capability_1', { ns: APP_NAME })}</li>
                    <li>{t('about_the_app_capability_2', { ns: APP_NAME })}</li>
                    <li>{t('about_the_app_capability_3', { ns: APP_NAME })}</li>
                    <li>{t('about_the_app_capability_4', { ns: APP_NAME })}</li>
                    <li>{t('about_the_app_capability_5', { ns: APP_NAME })}</li>
                </ul>
            </div>

            <div className="mb-4 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    {t('about_attribution_and_terms_title', { ns: APP_NAME })}
                </h3>

                <div className="mb-4">
                    <p className="mb-1">
                        <b className="font-bold">
                            {t('about_attribution_and_terms_content_1', {
                                ns: APP_NAME,
                            })}
                        </b>
                    </p>
                    <div className="ml-8 mb-2">
                        <p>
                            <b className="font-bold">
                                {t('about_attribution_and_terms_content_2', {
                                    ns: APP_NAME,
                                })}
                            </b>
                        </p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t(
                                    'about_attribution_and_terms_content_3',
                                    { ns: APP_NAME }
                                ),
                            }}
                        ></p>
                    </div>

                    <div className="ml-8">
                        <p
                            className="font-bold"
                            dangerouslySetInnerHTML={{
                                __html: t(
                                    'about_attribution_and_terms_content_4',
                                    { ns: APP_NAME }
                                ),
                            }}
                        ></p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t(
                                    'about_attribution_and_terms_content_5',
                                    { ns: APP_NAME }
                                ),
                            }}
                        ></p>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="font-bold mb-1">
                        {t('about_attribution_and_terms_content_6', {
                            ns: APP_NAME,
                        })}
                    </p>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: t('about_attribution_and_terms_content_7', {
                                ns: APP_NAME,
                            }),
                        }}
                    ></p>
                    <p>
                        {t('about_attribution_and_terms_content_8', {
                            ns: APP_NAME,
                        })}
                    </p>
                </div>

                <div className="mb-4 font-light">
                    <p>
                        {t('about_attribution_and_terms_content_9', {
                            ns: APP_NAME,
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};
