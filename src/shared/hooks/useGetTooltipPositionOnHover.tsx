import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();

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
