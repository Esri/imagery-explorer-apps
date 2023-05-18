import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAppMode } from '../../../shared/store/Landsat/selectors';
import {
    AnimationFramesControl,
    AnimationFrameInfo,
} from '../../../shared/components/AnimationFramesControl';

export const AnimationFramesControlContainer = () => {
    const mode = useSelector(selectAppMode);

    if (mode !== 'animate') {
        return null;
    }

    const data: AnimationFrameInfo[] = [
        {
            frameId: '123',
            acquisitionDate: '2023-05-18',
            rasterFunctionName: 'DRA',
        },
    ];

    // const data:AnimationFrameInfo[] = useMemo(()=>{
    //     return []
    // }, [])

    // useEffect(()=>{
    //     // add initial frames if necesary
    // }, []);

    if (!data || !data.length) {
        return null;
    }

    return (
        <AnimationFramesControl
            data={data}
            frameOnSelect={(frameId: string) => {
                // select a scene
            }}
            addButtonOnClick={() => {
                // add scene
            }}
            removeButtonOnClick={(frameId: string) => {
                // remove scene
                console.log(frameId);
            }}
        />
    );
};
