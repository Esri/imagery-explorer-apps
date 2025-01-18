/* Copyright 2024 Esri
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

import React, { useEffect, useState } from 'react';
import { WebMapMetadata } from './SaveWebMap';
import { CreateWebMapResponse, createWebMap } from './createWebMap';
import { selectYear } from '@shared/store/LandcoverExplorer/selectors';
import { useAppSelector } from '@shared/store/configureStore';
import { selectMapExtent } from '@shared/store/Map/selectors';

export const useCreateWebmap = (webmapMetadata: WebMapMetadata) => {
    const mapExtent = useAppSelector(selectMapExtent);

    const year = useAppSelector(selectYear);

    const [isSavingChanges, setIsSavingChanges] = useState<boolean>(false);

    const [response, setResponse] = useState<CreateWebMapResponse>(null);

    useEffect(() => {
        if (webmapMetadata) {
            (async () => {
                setIsSavingChanges(true);

                try {
                    const res = await createWebMap({
                        title: webmapMetadata?.title,
                        tags: webmapMetadata?.tags,
                        summary: webmapMetadata?.summary,
                        extent: mapExtent,
                        year: year,
                    });

                    setResponse(res);
                } catch (err) {
                    console.log(err);
                }

                setIsSavingChanges(false);
            })();
        } else {
            setResponse(null);
        }
    }, [webmapMetadata]);

    return {
        response,
        isSavingChanges,
    };
};
