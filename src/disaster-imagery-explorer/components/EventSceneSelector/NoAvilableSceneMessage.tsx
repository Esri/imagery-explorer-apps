import { APP_NAME } from '@shared/config';
import React, { type FC } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
    selectedEventName: string | null;
};

export const NoAvilableSceneMessage: FC<Props> = ({ selectedEventName }) => {
    const { t } = useTranslation();
    return (
        <div className="w-full flex items-center justify-center text-center">
            <p className="text-sm text-custom-light-blue-50 max-w-sm mt-6">
                {!selectedEventName
                    ? t('select_an_event_to_see_available_scenes', {
                          ns: APP_NAME,
                      })
                    : t('no_scenes_in_current_map_extent', {
                          ns: APP_NAME,
                      })}
            </p>
        </div>
    );
};
