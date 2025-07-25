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

import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { selectShowSaveWebMapPanel } from '@shared/store/UI/selectors';
import { SaveWebMap, WebMapMetadata } from './SaveWebMap';
import { useAppDispatch } from '@shared/store/configureStore';
import { showSaveWebMapPanelToggled } from '@shared/store/UI/reducer';
import {
    getSignedInUser,
    isAnonymouns,
    signIn,
    signInUsingDifferentAccount,
} from '@shared/utils/esri-oauth';
import { saveShowSaveWebMapPanelToHashParams } from '@landcover-explorer/utils/URLHashParams';
import { useCreateWebmap } from './useCreateWebmap';
import { getPortalBaseUrl } from '@shared/utils/esri-oauth';

export type SaveWebMapContainerProps = {
    years: number[];
    landCoverLayerTitle: string;
    landCoverLayerItemId: string;
    landCoverImageryServiceUrl: string;
    landCoverLayerStartTimeField: string;
    landCoverLayerStartTimeFieldType: 'number' | 'date';
    authoringApp: string;
};

export const SaveWebMapContainer: FC<SaveWebMapContainerProps> = ({
    years,
    landCoverLayerTitle,
    landCoverLayerItemId,
    landCoverImageryServiceUrl,
    landCoverLayerStartTimeField,
    landCoverLayerStartTimeFieldType,
    authoringApp,
}) => {
    const dispatch = useAppDispatch();

    const showSaveWebMap = useAppSelector(selectShowSaveWebMapPanel);

    const [webmapMetadata, setWebMapMetadata] = useState<WebMapMetadata>();

    const { isSavingChanges, response, errorSavingWebMap } = useCreateWebmap({
        webmapMetadata,
        years,
        landCoverLayerTitle,
        landCoverLayerItemId,
        landCoverImageryServiceUrl,
        landCoverLayerStartTimeField,
        landCoverLayerStartTimeFieldType,
        authoringApp,
    });

    const portalUser = getSignedInUser();

    const openWebMap = () => {
        if (!response) {
            return;
        }

        const url = `${getPortalBaseUrl()}/home/item.html?id=${response.id}`;

        window.open(url, '_blank');

        dispatch(showSaveWebMapPanelToggled());
    };

    useEffect(() => {
        saveShowSaveWebMapPanelToHashParams(showSaveWebMap);

        if (showSaveWebMap && isAnonymouns()) {
            signIn();
            return;
        }

        if (!showSaveWebMap) {
            setWebMapMetadata(null);
        }
    }, [showSaveWebMap]);

    if (!showSaveWebMap) {
        return null;
    }

    return (
        <SaveWebMap
            isSavingChanges={isSavingChanges}
            error={errorSavingWebMap}
            hasNoPrivilege2CreateContent={portalUser?.role === 'org_user'}
            response={response}
            saveButtonOnClick={setWebMapMetadata}
            closeButtonOnClick={() => {
                // close
                dispatch(showSaveWebMapPanelToggled());
            }}
            signInButtonOnClick={signInUsingDifferentAccount}
            openWebmapButtonOnClick={openWebMap}
        />
    );
};
