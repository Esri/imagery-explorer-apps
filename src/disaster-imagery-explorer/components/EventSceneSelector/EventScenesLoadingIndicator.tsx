import { APP_NAME } from '@shared/config';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const EventScenesLoadingIndicator = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className="w-full text-center">
                <div
                    className="w-full flex items-center justify-center mt-2"
                    style={
                        {
                            '--calcite-loader-spacing': '0px',
                        } as React.CSSProperties
                    }
                >
                    <calcite-loader scale="s" label="loading" />
                </div>

                <p className="text-sm text-custom-light-blue-50 mt-1">
                    {t('loading_scenes_for_selected_event', {
                        ns: APP_NAME,
                    })}
                </p>
            </div>
        </div>
    );
};
