import { getProfileData } from '@shared/services/landsat-2/getProfileData';
import {
    selectAcquisitionMonth4ProfileTool,
    selectActiveAnalysisTool,
    selectQueryLocation4ProfileTool,
} from '@shared/store/Analysis/selectors';
import { updateProfileData } from '@shared/store/Analysis/thunks';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const ProfileToolContainer = () => {
    const dispacth = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const queryLocation = useSelector(selectQueryLocation4ProfileTool);

    const acquisitionMonth = useSelector(selectAcquisitionMonth4ProfileTool);

    useEffect(() => {
        if (tool !== 'profile') {
            return;
        }

        dispacth(updateProfileData());
    }, [queryLocation, tool, acquisitionMonth]);

    if (tool !== 'profile') {
        return null;
    }

    return <div>Profile</div>;
};
