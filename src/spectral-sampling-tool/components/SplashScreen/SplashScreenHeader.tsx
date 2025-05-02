import { APP_NAME } from '@shared/config';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SplashScreenHeader = () => {
    const { t } = useTranslation();
    return (
        <div className="w-full mb-12">
            <div className="w-full flex justify-center text-center  mb-4">
                <h3
                    className="text-2xl max-w-xs"
                    dangerouslySetInnerHTML={{
                        __html: t('splash_screen_header', { ns: APP_NAME }),
                    }}
                ></h3>
            </div>

            <div className="w-full flex justify-center">
                <ul className="list-disc list-inside text-sm text-custom-light-blue-50 text-left">
                    <li>{t('splash_screen_subheader_1', { ns: APP_NAME })}</li>
                    <li>{t('splash_screen_subheader_2', { ns: APP_NAME })}</li>
                    <li>{t('splash_screen_subheader_3', { ns: APP_NAME })}</li>
                    <li>{t('splash_screen_subheader_4', { ns: APP_NAME })}</li>
                </ul>
            </div>
        </div>
    );
};
