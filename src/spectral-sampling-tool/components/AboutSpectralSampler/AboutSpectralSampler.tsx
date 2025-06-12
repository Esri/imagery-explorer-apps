import { About } from '@shared/components/About';
import { APP_NAME } from '@shared/config';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AboutSpectralSampler = () => {
    const { t } = useTranslation();

    return (
        <About>
            <div
                className="py-10"
                style={{
                    maxWidth: 1680,
                }}
            >
                <div className="flex items-center mb-8">
                    <div className=" text-custom-light-blue text-3xl pr-4 mr-4">
                        <span>
                            {t('spectral_sampling_tool', { ns: APP_NAME })}
                        </span>
                    </div>
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
                </div>

                <div className="mb-8 font-light">
                    <h3 className="text-2xl text-custom-light-blue mb-4">
                        {t('how_it_works', {
                            ns: APP_NAME,
                        })}
                    </h3>

                    {/* <p className="mb-4">
                    {t('about_app_section_1', {
                        ns: APP_NAME,
                    })}
                </p> */}

                    <div className="mb-4">
                        <h4 className="mb-1">
                            {t('how_it_works_section_1_title', {
                                ns: APP_NAME,
                            })}
                        </h4>

                        <p className="ml-4 text-sm">
                            {t('how_it_works_section_1_description', {
                                ns: APP_NAME,
                            })}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h4 className="mb-1">
                            {t('how_it_works_section_2_title', {
                                ns: APP_NAME,
                            })}
                        </h4>

                        <p className="ml-4 text-sm">
                            {t('how_it_works_section_2_description', {
                                ns: APP_NAME,
                            })}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h4 className="mb-1">
                            {t('how_it_works_section_3_title', {
                                ns: APP_NAME,
                            })}
                        </h4>

                        <p className="ml-4 text-sm">
                            {t('how_it_works_section_3_description', {
                                ns: APP_NAME,
                            })}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h4 className="mb-1">
                            {t('how_it_works_section_4_title', {
                                ns: APP_NAME,
                            })}
                        </h4>

                        <p className="ml-4 mb-1 text-sm">
                            {t('how_it_works_section_4_description', {
                                ns: APP_NAME,
                            })}
                        </p>

                        <ol className="list-disc list-inside ml-4  text-sm">
                            <li>
                                {t('download_field_latlon', { ns: APP_NAME })}
                            </li>
                            <li>
                                {t('download_field_reflectance', {
                                    ns: APP_NAME,
                                })}
                            </li>
                            <li>
                                {t('download_field_scene_id', { ns: APP_NAME })}
                            </li>
                        </ol>
                    </div>
                </div>
                {/* 
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
            </div> */}

                <div className="mb-8 font-light">
                    <h3 className="text-2xl text-custom-light-blue mb-4">
                        {t('purpose', {
                            ns: APP_NAME,
                        })}
                    </h3>

                    <p className="mb-4">
                        {t('purpose_description', {
                            ns: APP_NAME,
                        })}
                    </p>
                </div>
            </div>
        </About>
    );
};
