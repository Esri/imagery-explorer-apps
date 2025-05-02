import React from 'react';
import { useTranslation } from 'react-i18next';

export const VerticalDivider = () => {
    const { t } = useTranslation();

    return (
        <div className="relative hidden md:flex flex-col items-center justify-center mx-4 py-2 pointer-events-none">
            <div
                className="w-[1px] grow bg-custom-light-blue-25" // vertical line to separate the two sections
            ></div>

            <div className="text-sm px-1 py-1 z-10">
                <span>{t('or')}</span>
            </div>

            <div
                className="w-[1px] grow bg-custom-light-blue-25" // vertical line to separate the two sections
            ></div>
        </div>
    );
};
