import React from 'react';
import { useTranslation } from 'react-i18next';

export const Sentinel2ImageryTermsOfUse = () => {
    const { t } = useTranslation();
    return (
        <>
            <p className="mb-2">
                <span className="font-bold">
                    {t('sentinel_2_imagery_terms_of_use_section_title')}
                </span>
            </p>

            <div className="pl-8">
                <p className="mb-1">
                    <span className="font-bold">
                        {t('sentinel_2_imagery_source_section_title')}
                    </span>
                </p>
                <p
                    className="mb-2"
                    dangerouslySetInnerHTML={{
                        __html: t('sentinel_2_imagery_source_section_content'),
                    }}
                ></p>
                <p
                    className="mb-1 font-bold"
                    dangerouslySetInnerHTML={{
                        __html: t('sentinel_2_imagery_service_section_title'),
                    }}
                ></p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t('sentinel_2_imagery_service_section_content'),
                    }}
                ></p>
            </div>
        </>
    );
};
