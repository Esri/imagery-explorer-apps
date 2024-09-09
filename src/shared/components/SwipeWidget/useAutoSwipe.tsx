import Swipe from '@arcgis/core/widgets/Swipe';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAutoSwipeStatus,
    selectAutoSwipeSpeed,
} from '@shared/store/Map/selectors';
import { AutoSwipeStatus } from '@shared/store/Map/reducer';

/**
 * Custom React hook to manage the auto-swipe functionality for the Swipe widget.
 * This hook automates the swipe action based on
 * the status and speed settings from the Redux store.
 *
 * @param {Swipe} swipeWidget - The ArcGIS Swipe widget instance to control.
 */
export const useAutoSwipe = (swipeWidget: Swipe) => {
    const status = useSelector(selectAutoSwipeStatus);

    const autoSwipeSpeed = useSelector(selectAutoSwipeSpeed);

    /**
     * Reference to track the current position of the swipe handle (0 to 100)
     */
    const positionRef = useRef<number>(50);

    /**
     * Reference to track the current status of auto-swipe (kept in sync with the Redux store)
     */
    const statusRef = useRef<AutoSwipeStatus>();

    /**
     * Boolean ref to track if the swipe is moving towards the left (false indicates right)
     */
    const movingToLeft = useRef<boolean>(true);

    const speedRef = useRef<number>(autoSwipeSpeed);

    /**
     * Updates the position of the swipe handle based on the auto-swipe status and speed.
     * Called recursively using requestAnimationFrame to create a smooth animation loop.
     */
    const autoUpdateSwipePosition = () => {
        if (statusRef.current !== 'playing') {
            return;
        }

        // Update the swipe position by moving the handle either left or right by 0.5%
        if (movingToLeft.current) {
            positionRef.current = Math.min(
                positionRef.current + speedRef.current,
                100
            );
        } else {
            positionRef.current = Math.max(
                positionRef.current - speedRef.current,
                0
            );
        }

        // Reverse direction when the swipe handle reaches either end (0% or 100%)
        if (positionRef.current === 100 || positionRef.current === 0) {
            movingToLeft.current = !movingToLeft.current;
        }

        swipeWidget.position = positionRef.current;

        requestAnimationFrame(autoUpdateSwipePosition);
    };

    useEffect(() => {
        if (!swipeWidget) {
            return;
        }

        statusRef.current = status;

        if (statusRef.current === 'playing') {
            requestAnimationFrame(autoUpdateSwipePosition);
        }
    }, [status, swipeWidget]);

    useEffect(() => {
        speedRef.current = autoSwipeSpeed;
    }, [autoSwipeSpeed]);
};
