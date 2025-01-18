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

import React, { useEffect } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { tooltipXPositionChanged } from '@shared/store/UI/reducer';

/**
 * Update Tooltip's x Position using x position from input ref HTMLDivElement,
 * `mouse enter` event listener will be added to the input ref HTMLDivElement so it can update Tooltip's x Position
 * every time user hovers this element
 *
 * @param ref
 */
const useGetTooltipPositionOnHover = (
    ref: React.MutableRefObject<HTMLDivElement>
) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const onEnter = (event: MouseEvent) => {
            const { x } = ref.current.getBoundingClientRect();
            dispatch(tooltipXPositionChanged(x));
        };

        const onLeave = (event: MouseEvent) => {
            dispatch(tooltipXPositionChanged(null));
        };

        ref.current.addEventListener('mouseenter', onEnter);
        ref.current.addEventListener('mouseleave', onLeave);
        // document.addEventListener('touchstart', listener);

        // return () => {
        //     ref.current.removeEventListener('mousedown', onEnter);
        //     ref.current.removeEventListener('mouseleave', onLeave);
        // };
    }, [ref]);
};

export default useGetTooltipPositionOnHover;
