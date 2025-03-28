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

import { DocPanel } from '@shared/components/DocPanel/DocPanel';
import React from 'react';
import Fig1 from './img/fig1.jpg';
import Fig2 from './img/fig2.jpg';
import DataAcquisitionFig1 from './img/data-acquisition-fig1.jpg';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

export const Sentinel1DocPanel = () => {
    const { t } = useTranslation();
    return (
        <DocPanel>
            <div className=" my-8 md:my-20 md:max-w-5xl text-sm ">
                <h2 className="text-3xl mb-8">
                    {t('doc_quick_reference_guide_title', { ns: APP_NAME })}
                </h2>

                <div className="mb-8">
                    <h4 className="text-lg mb-2">
                        {t('doc_about_this_user_guide_section_title', {
                            ns: APP_NAME,
                        })}
                    </h4>

                    <p>
                        {t('doc_about_this_user_guide_section_content', {
                            ns: APP_NAME,
                        })}
                    </p>
                </div>

                <div className="mb-12">
                    <h3 className="text-2xl mb-4">
                        {t('doc_sentinel_1_section_title', { ns: APP_NAME })}
                    </h3>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">
                            {t('doc_mission_section_title', { ns: APP_NAME })}
                        </h4>

                        <p className="">
                            {t('doc_mission_section_content', { ns: APP_NAME })}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">
                            {t('doc_coverage_section_title', { ns: APP_NAME })}
                        </h4>

                        <p>
                            {t('doc_coverage_section_content', {
                                ns: APP_NAME,
                            })}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">
                            {t('doc_data_acquisition_section_title', {
                                ns: APP_NAME,
                            })}
                        </h4>

                        <p className="mb-4">
                            {t('doc_data_acquisition_section_content_1', {
                                ns: APP_NAME,
                            })}
                        </p>

                        <p className="">
                            {t('doc_data_acquisition_section_content_2', {
                                ns: APP_NAME,
                            })}
                        </p>

                        <div className="my-6 text-center">
                            <img
                                src={DataAcquisitionFig1}
                                className="w-auto mx-auto mt-2"
                            />

                            <p
                                className="italic mt-2 text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: t(
                                        'doc_data_acquisition_section_figure_caption',
                                        { ns: APP_NAME }
                                    ),
                                }}
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">
                            {t('doc_backscatter_section_title', {
                                ns: APP_NAME,
                            })}
                        </h4>

                        <p className="mb-4">
                            {t('doc_backscatter_section_content_1', {
                                ns: APP_NAME,
                            })}
                        </p>

                        <p>
                            {t('doc_backscatter_section_content_2', {
                                ns: APP_NAME,
                            })}
                        </p>

                        <div className="my-6 text-center">
                            <img src={Fig1} className="w-auto mx-auto mt-2" />

                            <p
                                className="italic mt-2 text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: t(
                                        'doc_backscatter_section_figure_1_caption',
                                        { ns: APP_NAME }
                                    ),
                                }}
                            />
                        </div>

                        <p>
                            {t('doc_backscatter_section_content_3', {
                                ns: APP_NAME,
                            })}
                        </p>

                        <div className="my-6 text-center">
                            <img src={Fig2} className="w-auto mx-auto mt-2" />

                            <p
                                className="italic mt-2 text-xs"
                                dangerouslySetInnerHTML={{
                                    __html: t(
                                        'doc_backscatter_section_figure_2_caption',
                                        { ns: APP_NAME }
                                    ),
                                }}
                            />
                        </div>

                        <p>
                            {t('doc_backscatter_section_content_4', {
                                ns: APP_NAME,
                            })}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">
                            {t('doc_image_interpretation_section_title', {
                                ns: APP_NAME,
                            })}
                        </h4>

                        <p className="mb-4">
                            {t('doc_image_interpretation_section_content_1', {
                                ns: APP_NAME,
                            })}
                        </p>

                        <p className="mb-4">
                            {t('doc_image_interpretation_section_content_2', {
                                ns: APP_NAME,
                            })}
                        </p>

                        <div className="mb-4">
                            <p className="mb-2">
                                {t('doc_image_interpretation_section_guide', {
                                    ns: APP_NAME,
                                })}
                            </p>

                            <ol className="list-disc list-inside">
                                <li>
                                    {t(
                                        'doc_image_interpretation_smoother_surfaces',
                                        { ns: APP_NAME }
                                    )}
                                </li>
                                <li>
                                    {t(
                                        'doc_image_interpretation_rougher_surfaces',
                                        { ns: APP_NAME }
                                    )}
                                </li>
                                <li>
                                    {t(
                                        'doc_image_interpretation_water_bodies',
                                        { ns: APP_NAME }
                                    )}
                                </li>
                                <li>
                                    {t(
                                        'doc_image_interpretation_vertical_objects',
                                        { ns: APP_NAME }
                                    )}
                                </li>
                                <li>
                                    {t(
                                        'doc_image_interpretation_thicker_vegetation',
                                        { ns: APP_NAME }
                                    )}
                                </li>
                            </ol>
                        </div>

                        <p className="mb-4">
                            {t('doc_image_interpretation_section_content_3', {
                                ns: APP_NAME,
                            })}
                        </p>

                        <p className="mb-4">
                            {t('doc_image_interpretation_section_content_4', {
                                ns: APP_NAME,
                            })}
                        </p>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg mb-2">
                            {t('doc_references_section_title', {
                                ns: APP_NAME,
                            })}
                        </h4>

                        <ol className=" list-disc list-inside">
                            <li
                                className="mb-1"
                                dangerouslySetInnerHTML={{
                                    __html: t(
                                        'doc_references_section_content_1',
                                        { ns: APP_NAME }
                                    ),
                                }}
                            />
                            <li
                                dangerouslySetInnerHTML={{
                                    __html: t(
                                        'doc_references_section_content_2',
                                        { ns: APP_NAME }
                                    ),
                                }}
                            />
                        </ol>
                    </div>
                </div>
            </div>
        </DocPanel>
    );
};
