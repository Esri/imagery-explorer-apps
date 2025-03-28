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
// import { showAboutThisAppToggled } from '@shared/store/LandcoverUI/reducer';
// import { selectShowAboutThisApp } from '@shared/store/LandcoverUI/selectors';
// import { CloseButton } from '@shared/components/CloseButton';
import EsriLogo from './esri-logo.png';
import { selectShouldShowAboutThisApp } from '@shared/store/UI/selectors';
// import { shouldShowAboutThisAppToggled } from '@shared/store/UI/reducer';
import { About } from '@shared/components/About';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

const AboutLandcoverExplorer = () => {
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
                <div className="flex items-center mb-8">
                    <div className=" text-custom-light-blue text-3xl">
                        <span>{t('about_panel_header', { ns: APP_NAME })}</span>
                    </div>

                    {/* <img className="" src={EsriLogo} /> */}
                </div>

                <div className="mb-8 font-light">
                    <h3 className="text-2xl text-custom-light-blue mb-4">
                        {t('about_data_title', { ns: APP_NAME })}
                    </h3>

                    <p className="mb-4">
                        {t('about_data_paragraph_1', { ns: APP_NAME })}
                    </p>

                    <p
                        className="mb-4"
                        dangerouslySetInnerHTML={{
                            __html: t('about_data_paragraph_2', {
                                ns: APP_NAME,
                            }),
                        }}
                    ></p>
                </div>

                <div className="mb-8 font-light">
                    <h3 className="text-2xl text-custom-light-blue mb-4">
                        {t('about_app_title', { ns: APP_NAME })}
                    </h3>

                    <p className="mb-4">
                        {t('about_app_paragraph_1', { ns: APP_NAME })}
                    </p>

                    <p>{t('about_app_paragraph_2', { ns: APP_NAME })}</p>

                    <ul className="list-disc list-inside mt-2">
                        <li>{t('about_app_capability_1', { ns: APP_NAME })}</li>
                        <li>{t('about_app_capability_2', { ns: APP_NAME })}</li>
                        <li>{t('about_app_capability_3', { ns: APP_NAME })}</li>
                        <li>{t('about_app_capability_4', { ns: APP_NAME })}</li>
                        <li>{t('about_app_capability_5', { ns: APP_NAME })}</li>
                        <li>{t('about_app_capability_6', { ns: APP_NAME })}</li>
                        <li>{t('about_app_capability_7', { ns: APP_NAME })}</li>
                    </ul>
                </div>

                <div className="mb-4 font-light">
                    <h3 className="text-2xl text-custom-light-blue mb-4">
                        {t('attribution_title', { ns: APP_NAME })}
                    </h3>

                    <div className="mb-3">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t('lulc_attribution_title', {
                                    ns: APP_NAME,
                                }),
                            }}
                        ></p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t('lulc_attribution_license', {
                                    ns: APP_NAME,
                                }),
                            }}
                        ></p>
                    </div>

                    <div className="mb-3">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t('imagery_attribution_title', {
                                    ns: APP_NAME,
                                }),
                            }}
                        ></p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t('imagery_attribution_license', {
                                    ns: APP_NAME,
                                }),
                            }}
                        ></p>
                    </div>

                    <div className="mb-3">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t('app_attribution_title', {
                                    ns: APP_NAME,
                                }),
                            }}
                        ></p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t('app_attribution_license', {
                                    ns: APP_NAME,
                                }),
                            }}
                        ></p>
                        <p>
                            {t('app_attribution_disclaimer', { ns: APP_NAME })}
                        </p>
                    </div>
                </div>
            </div>
        </About>
    );
};

export default AboutLandcoverExplorer;
