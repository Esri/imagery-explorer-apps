import React from 'react';
import { useTranslation } from 'react-i18next';

export const LandsatImageryTermsOfUse = () => {
    const { t } = useTranslation();
    return (
        <>
            <p className="mb-2">
                <span className="font-bold">
                    {t('landsat_imagery_terms_of_use_section_title')}
                </span>
            </p>

            <div className="pl-8">
                <p className="mb-1">
                    <span className="font-bold">
                        {t('landsat_imagery_source_section_title')}
                    </span>
                </p>
                <p
                    className="mb-2"
                    dangerouslySetInnerHTML={{
                        __html: t('landsat_imagery_source_section_content'),
                    }}
                ></p>
                <p
                    className="mb-1 font-bold"
                    dangerouslySetInnerHTML={{
                        __html: t('landsat_imagery_service_section_title'),
                    }}
                ></p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t('esri_work_terms_of_use'),
                    }}
                ></p>
            </div>
        </>
    );
};
