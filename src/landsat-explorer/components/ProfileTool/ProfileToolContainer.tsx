import { selectActiveAnalysisTool } from '@shared/store/Analysis/selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export const ProfileToolContainer = () => {
    const tool = useSelector(selectActiveAnalysisTool);

    if (tool !== 'profile') {
        return null;
    }

    return <div>Profile</div>;
};
