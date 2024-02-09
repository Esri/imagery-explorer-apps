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

import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { modeChanged } from '@shared/store/ImageryScene/reducer';
import React from 'react';
import { useDispatch } from 'react-redux';

const LandsatInfo = () => {
    const dispatch = useDispatch();

    const openFindASceneMode = () => {
        dispatch(modeChanged('find a scene'));
    };
    return (
        <>
            <p className="text-sm opacity-80">
                In the current map display, the most recent and most cloud free
                scenes from the Landsat archive are prioritized and dynamically
                fused into a single mosaicked image layer. As you explore, the
                map continues to dynamically fetch and render the best available
                scenes.
            </p>

            {IS_MOBILE_DEVICE === false ? (
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
            ) : null}
        </>
    );
};

export default LandsatInfo;
