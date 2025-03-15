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
import { SENTINEL_2_ITEM_URL } from '@shared/services/sentinel-2/config';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AboutSentinel2ExplorerContent = () => {
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
                        {t('esri_sentinel_2_explorer', { ns: APP_NAME })}
                    </span>
                </div>
            </div>

            <div className="mb-8 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    {t('about_the_data')}
                </h3>

                <p className="mb-4">
                    {t('about_data_section_1', {
                        ns: APP_NAME,
                    })}
                </p>

                <p className="mb-4">
                    {t('about_data_section_2', {
                        ns: APP_NAME,
                    })}
                </p>

                <p
                    className="mb-4"
                    dangerouslySetInnerHTML={{
                        __html: t('about_data_section_3', {
                            ns: APP_NAME,
                        }),
                    }}
                ></p>
            </div>

            <div className="mb-8 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    {t('about_the_app')}
                </h3>

                <p className="mb-4">
                    {t('about_app_section_1', {
                        ns: APP_NAME,
                    })}
                </p>

                <p>
                    {t('about_app_section_2', {
                        ns: APP_NAME,
                    })}
                </p>

                <ul className="list-disc list-inside">
                    <li>
                        {t('about_app_list_item_1', {
                            ns: APP_NAME,
                        })}
                    </li>
                    <li>
                        {t('about_app_list_item_2', {
                            ns: APP_NAME,
                        })}
                    </li>
                    <li>
                        {t('about_app_list_item_3', {
                            ns: APP_NAME,
                        })}
                    </li>
                    <li>
                        {t('about_app_list_item_4', {
                            ns: APP_NAME,
                        })}
                    </li>
                    <li>
                        {t('about_app_list_item_5', {
                            ns: APP_NAME,
                        })}
                    </li>
                </ul>
            </div>

            <div className="mb-4 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    {t('attribution_terms_of_use')}
                </h3>

                <div className="mb-4">
                    <p className="mb-1 font-bold">
                        {t('terms_of_use_service_header', {
                            ns: APP_NAME,
                        })}
                    </p>

                    <div className="ml-8 mb-2">
                        <p>
                            <b className="font-bold">
                                {t('terms_of_use_service_section_1_header', {
                                    ns: APP_NAME,
                                })}
                            </b>
                        </p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t(
                                    'terms_of_use_service_section_1_desc',
                                    {
                                        ns: APP_NAME,
                                    }
                                ),
                            }}
                        ></p>
                    </div>

                    <div className="ml-8">
                        <p className="font-bold">
                            {t('terms_of_use_service_section_2_header', {
                                ns: APP_NAME,
                            })}
                        </p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t(
                                    'terms_of_use_service_section_2_desc',
                                    {
                                        ns: APP_NAME,
                                    }
                                ),
                            }}
                        ></p>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="font-bold mb-1">
                        {t('terms_of_use_app_header', {
                            ns: APP_NAME,
                        })}
                    </p>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: t('terms_of_use_app_section_1', {
                                ns: APP_NAME,
                            }),
                        }}
                    ></p>
                    <p>
                        {t('terms_of_use_app_section_2', {
                            ns: APP_NAME,
                        })}
                    </p>
                </div>
            </div>

            <div className="mb-4 font-light">
                <p>{t('interetsing_places_data_source')}</p>
            </div>
        </div>
    );
};
