import { ClassificationsList } from '@landcover-explorer/components/ClassificationsList';
import { getNLCDLandCoverClassifications } from '@shared/services/nlcd-landcover/classifications';
import { get } from 'http';
import React, { useMemo } from 'react';

export const NLCDClassificationList = () => {
    const classificationData = useMemo(() => {
        return getNLCDLandCoverClassifications();
    }, []);

    return <ClassificationsList classificationData={classificationData} />;
};
