import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectShowSaveWebMap } from '@landcover-explorer/store/UI/selectors';
import { SaveWebMap, WebMapMetadata } from './SaveWebMap';
import { useDispatch } from 'react-redux';
import { showSaveWebMapToggled } from '@landcover-explorer/store/UI/reducer';
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

    const showSaveWebMap = useSelector(selectShowSaveWebMap);

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
                dispatch(showSaveWebMapToggled());
            }}
            signInButtonOnClick={signInUsingDifferentAccount}
        />
    );
};
