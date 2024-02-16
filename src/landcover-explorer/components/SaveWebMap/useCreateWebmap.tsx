import React, { useEffect, useState } from 'react';
import { WebMapMetadata } from './SaveWebMap';
import { CreateWebMapResponse, createWebMap } from './createWebMap';
import {
    selectMapExtent,
    selectYear,
} from '@landcover-explorer/store/Map/selectors';
import { useSelector } from 'react-redux';

export const useCreateWebmap = (webmapMetadata: WebMapMetadata) => {
    const mapExtent = useSelector(selectMapExtent);

    const year = useSelector(selectYear);

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
