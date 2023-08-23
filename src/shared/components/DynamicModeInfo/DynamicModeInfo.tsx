import { modeChanged } from '@shared/store/Landsat/reducer';
import React from 'react';
import { useDispatch } from 'react-redux';

export const DynamicModeInfo = () => {
    const dispatch = useDispatch();

    const openFindASceneMode = () => {
        dispatch(modeChanged('find a scene'));
    };

    return (
        <div className="max-w-sm ml-4 xl:ml-10">
            <div className="text-center mb-3">
                <span className="uppercase text-sm">Dynamic View</span>
            </div>

            <p className="text-sm opacity-80">
                In the current map display, the most recent and most cloud free
                scenes from the Landsat archive are prioritized and dynamically
                fused into a single mosaicked image layer. As you explore, the
                map continues to dynamically fetch and render the best available
                scenes.
            </p>

            <p className="text-sm opacity-80 mt-2">
                To select a scene for a specific date, try the{' '}
                <span
                    className="underline cursor-pointer hover:opacity-100"
                    onClick={openFindASceneMode}
                >
                    FIND A SCENE
                </span>{' '}
                mode.
            </p>
        </div>
    );
};
