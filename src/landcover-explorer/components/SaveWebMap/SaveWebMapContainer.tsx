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
import { useSelector } from 'react-redux';
import { selectShowSaveWebMapPanel } from '@shared/store/UI/selectors';
import { SaveWebMap, WebMapMetadata } from './SaveWebMap';
import { useDispatch } from 'react-redux';
import { showSaveWebMapPanelToggled } from '@shared/store/UI/reducer';
import {
    getSignedInUser,
    isAnonymouns,
    signIn,
    signInUsingDifferentAccount,
} from '@landcover-explorer/utils/esriOAuth';
import { saveShowSaveWebMapPanelToHashParams } from '@landcover-explorer/utils/URLHashParams';
import { useCreateWebmap } from './useCreateWebmap';

export const SaveWebMapContainer = () => {
    const dispatch = useDispatch();

    const showSaveWebMap = useSelector(selectShowSaveWebMapPanel);

    const [webmapMetadata, setWebMapMetadata] = useState<WebMapMetadata>();

    const { isSavingChanges, response } = useCreateWebmap(webmapMetadata);

    const portalUser = getSignedInUser();

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
            hasNoPrivilege2CreateContent={portalUser?.role === 'org_user'}
            response={response}
            // response={{
            //     id: '123',
            //     success: true,
            //     folder: ''
            // }}
            saveButtonOnClick={setWebMapMetadata}
            closeButtonOnClick={() => {
                // close
                dispatch(showSaveWebMapPanelToggled());
            }}
            signInButtonOnClick={signInUsingDifferentAccount}
        />
    );
};
