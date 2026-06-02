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

import React, { useCallback, useMemo } from 'react';
import {
    SceneInfoTable,
    SceneInfoTableData,
} from '@shared/components/SceneInfoTable';
import { DATE_FORMAT } from '@shared/constants/UI';
import { useAppSelector } from '@shared/store/configureStore';
import { selectAppMode } from '@shared/store/ImageryScene/selectors';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import { useDataFromSelectedImageryScene } from '@shared/components/SceneInfoTable/useDataFromSelectedScene';
import { useTranslation } from 'react-i18next';
import { getDisasterResponseSceneByObjectId } from '@shared/services/disaster-response/getDisasterResponseScenes';
import { DisasterResponseScene } from '@typing/imagery-service';
import { APP_NAME } from '@shared/config';
import { getFormattedDateTimeStrInUTC } from '../../utils/getFormattedTimestampInUTC';

export const SceneInfoContainer = () => {
    const { t } = useTranslation();

    const mode = useAppSelector(selectAppMode);

    const fetchSceneByObjectId = useCallback(async (objectId: number) => {
        const res = await getDisasterResponseSceneByObjectId(objectId);
        return res;
    }, []);

    const data =
        useDataFromSelectedImageryScene<DisasterResponseScene>(
            fetchSceneByObjectId
        );

    const tableData: SceneInfoTableData[] = useMemo(() => {
        if (!data) {
            return [];
        }

        const { name, eventTimestamp, provider } = data;

        return [
            // the produt id is too long to be displayed in one row,
            // therefore we need to split it into two separate rows
            {
                // name: 'Scene ID',
                name: t('scene_id'),
                value: name,
                clickToCopy: true,
            },
            {
                name: t('provider', {
                    ns: APP_NAME,
                }),
                value: provider,
            },
            {
                name: t('event_timestamp', {
                    ns: APP_NAME,
                }),
                value: getFormattedDateTimeStrInUTC(eventTimestamp),
            },
            {
                name: t('event_type', {
                    ns: APP_NAME,
                }),
                value: data.event,
            },
            {
                name: t('cloud_cover'),
                value: `${data.cloudCover}%`,
            },
        ];
    }, [data]);

    if (mode === 'dynamic' || mode === 'analysis') {
        return null;
    }

    // if (!tableData || !tableData.length) {
    //     return null;
    // }

    return (
        <SceneInfoTable
            data={tableData}
            noSelectionText={t('select_scene_from_timeline', {
                ns: APP_NAME,
            })}
        />
    );
};
