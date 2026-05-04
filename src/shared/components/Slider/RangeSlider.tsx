/* Copyright 2024-2026 Esri
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

import classNames from 'classnames';
import React, {
    FC,
    useState,
    useRef,
    useCallback,
    useMemo,
    useEffect,
} from 'react';

/**
 * type for the dragging state of the slider handles:
 * 'min' / 'max' for individual handles, 'segment' for dragging the range between them
 */
export type SliderHandleType = 'min' | 'max' | 'segment' | null;

type Props = {
    /**
     * Current [start, end] values of the slider (controlled)
     */
    values: number[];
    /**
     * Minimum value of the slider, defaults to -1
     */
    min?: number;
    /**
     * Maximum value of the slider, defaults to 1
     */
    max?: number;
    /**
     * Step increment for the slider, defaults to 0.05
     */
    steps?: number;
    /**
     * Number of tick marks to display along the track
     */
    countOfTicks?: number;
    /**
     * Specific positions at which to display tick labels; defaults to quarter-point labels
     */
    tickLabels?: number[];
    /**
     * If true, shows a tooltip with the current value when hovering over a handle
     */
    showSliderTooltip?: boolean;
    /**
     * Emits the updated [start, end] values whenever the user moves a handle or drags the segment
     */
    valuesOnChange: (vals: number[]) => void;
    /**
     * Optional static legend rendered above the track at full width, for visual reference only (no mouse events)
     */
    legend?: React.ReactNode;
};

type HandleType = 'min' | 'max';

interface HandleProps {
    /**
     * Position of the handle along the track as a percentage (0-100) for styling
     */
    position: number;
    /**
     * Current value of the handle, used for displaying in the tooltip
     */
    value: number;
    /**
     * Whether this handle is currently being dragged, used for styling
     */
    isDragging: boolean;
    /**
     * Indicates whether this handle is the 'min' (left) or 'max' (right) handle, used to determine which value to update during dragging
     */
    handleType: HandleType;
    /**
     * Whether the two handles are adjacent (within one step of each other), used to adjust tooltip positioning to prevent overlap
     */
    isAdjacent: boolean;
    /**
     * Whether to show the tooltip when hovering over the handle
     */
    showTooltip?: boolean;
    /**
     * Number of decimal places to show in the tooltip, derived from the step value to ensure proper formatting (e.g. if step is 0.01, show 2 decimals)
     */
    stepDecimals: number;
    /**
     * Mouse down event handler to initiate dragging of this handle
     */
    onMouseDown: (e: React.MouseEvent) => void;
}

const getTickLabels = (min: number, max: number): number[] => {
    const fullRange = Math.abs(max - min);
    const oneFourthOfFullRange = fullRange / 4;
    return [
        min,
        min + oneFourthOfFullRange,
        min + oneFourthOfFullRange * 2,
        min + oneFourthOfFullRange * 3,
        max,
    ];
};

const getCountOfTicks = (min: number, max: number): number => {
    const fullRange = Math.abs(max - min);
    return fullRange / 0.25 + 1;
};

const Handle: FC<HandleProps> = ({
    position,
    value,
    isDragging,
    handleType,
    isAdjacent,
    showTooltip,
    stepDecimals,
    onMouseDown,
}) => {
    const tooltipOffset =
        isAdjacent && handleType === 'min'
            ? 'translateX(-75%)'
            : 'translateX(-50%)';
    const displayValue = value.toFixed(stepDecimals);

    return (
        <div
            className="group"
            style={{
                position: 'absolute',
                left: `${position}%`,
                transform: 'translateX(-50%)',
                zIndex: isDragging ? 3 : 2,
            }}
        >
            {showTooltip && (
                <span
                    className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap text-xs text-custom-light-blue-80"
                    style={{ left: '50%', transform: tooltipOffset }}
                >
                    {displayValue}
                </span>
            )}
            <div
                onMouseDown={onMouseDown}
                style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: 'var(--custom-light-blue)',
                    borderRadius: '50%',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
            />
        </div>
    );
};

export const RangeSlider: FC<Props> = ({
    values,
    min = -1,
    max = 1,
    steps = 0.05,
    countOfTicks,
    tickLabels,
    showSliderTooltip,
    valuesOnChange,
    legend,
}) => {
    // track the position of the slider handles and whether the user is currently dragging a handle or the segment between them
    const [startValue, setStartValue] = useState(values[0]); // position of the left (min) handle
    const [endValue, setEndValue] = useState(values[1]); // position of the right (max) handle
    const [dragging, setDragging] = useState<SliderHandleType>(null); // indicates which handle (or segment) is currently being dragged, if any
    const trackRef = useRef<HTMLDivElement>(null);

    const segmentDragStartRef = useRef<{
        clientX: number;
        startValue: number;
        endValue: number;
    } | null>(null);

    // Calculate the number of decimal places in the step value to ensure proper rounding of handle values
    const stepDecimals = useMemo(
        () => (steps.toString().split('.')[1] || '').length,
        [steps]
    );

    // Synchronize internal state with the controlled `values` prop when not dragging.
    // This mirrors the pattern in PixelRangeSlider where the slider widget's value
    // was updated whenever the external prop changed.
    useEffect(() => {
        if (!values || dragging) return;
        if (values[0] !== startValue) setStartValue(values[0]);
        if (values[1] !== endValue) setEndValue(values[1]);
    }, [values]);

    // Helper functions to convert between value and position on the track
    const getPositionFromValue = (value: number) => {
        return ((value - min) / (max - min)) * 100;
    };

    // Given a clientX position from a mouse event, calculate the corresponding slider value, snapping to the nearest step increment
    const getValueFromPosition = (clientX: number): number => {
        if (!trackRef.current) return min;

        // Calculate the percentage along the track where the event occurred
        const rect = trackRef.current.getBoundingClientRect();

        // calc the percentage along the track where the event occurred, clamping between 0% and 100%
        const percentage = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width)
        );

        // rawValue is the exact value corresponding to the mouse position, which we then snap to the nearest step increment
        const rawValue = min + percentage * (max - min);

        // Snap the raw value to the nearest step increment:
        // first find how many steps fit into (rawValue - min), round to the nearest integer,
        // then multiply back by steps and add min to get the snapped absolute value
        const stepsFromMin = Math.round((rawValue - min) / steps);

        // Use toFixed to avoid floating point precision issues when snapping, ensuring the snapped value has the correct number of decimal places
        const snapped = parseFloat(
            (stepsFromMin * steps + min).toFixed(stepDecimals)
        );

        // Ensure the snapped value is within the min/max bounds
        return Math.max(min, Math.min(max, snapped));
    };

    // Calculate the positions of the handles as percentages for styling the track and handles
    const startPosition = getPositionFromValue(startValue);
    const endPosition = getPositionFromValue(endValue);

    // Check if handles are adjacent (within one step of each other)
    const isAdjacent = endValue - startValue <= steps;

    /**
     * Handle the start of a drag on either handle, setting the dragging state to indicate which handle is being dragged
     * @param handle
     * @returns
     */
    const handleMouseDown = (handle: HandleType) => (e: React.MouseEvent) => {
        e.preventDefault();
        setDragging(handle);
    };

    const handleMouseUp = useCallback(() => {
        setDragging(null);
        segmentDragStartRef.current = null;
    }, []);

    /**
     * Begins a segment drag, recording the initial mouse position and handle values
     * so the entire selected range can be shifted as the user drags.
     */
    const handleSegmentMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        segmentDragStartRef.current = {
            clientX: e.clientX,
            startValue,
            endValue,
        };
        setDragging('segment');
    };

    /**
     * Handles mouse movement during a drag operation, updating handle values based on mouse position.
     */
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!dragging) return;

            // handle segment dragging separately to shift both handles together while maintaining their distance
            if (dragging === 'segment') {
                const ref = segmentDragStartRef.current;
                if (!ref || !trackRef.current) return;
                const rect = trackRef.current.getBoundingClientRect();

                // Calculate how much the mouse has moved in terms of slider value, snapping to steps
                const delta =
                    ((e.clientX - ref.clientX) / rect.width) * (max - min);

                // Snap the delta to the nearest step increment
                const snappedDelta = parseFloat(
                    (Math.round(delta / steps) * steps).toFixed(stepDecimals)
                );

                // Calculate the new start and end values by applying the snapped delta, ensuring the entire range shifts together without changing its width, and that it stays within bounds
                const rangeWidth = ref.endValue - ref.startValue;
                const newStart = parseFloat(
                    Math.max(
                        min,
                        Math.min(
                            ref.startValue + snappedDelta,
                            max - rangeWidth
                        )
                    ).toFixed(stepDecimals)
                );
                const newEnd = parseFloat(
                    (newStart + rangeWidth).toFixed(stepDecimals)
                );
                setStartValue(newStart);
                setEndValue(newEnd);
                valuesOnChange([newStart, newEnd]);
                return;
            }

            // For individual handle dragging, calculate the new value based on mouse position and update the corresponding handle, ensuring they don't cross each other
            const newValue = getValueFromPosition(e.clientX);
            if (dragging === 'min') {
                // Prevent overlap: start must be at least one step less than end
                const clamped = Math.min(newValue, endValue - steps);
                setStartValue(clamped);
                valuesOnChange([clamped, endValue]);
            } else {
                // Prevent overlap: end must be at least one step more than start
                const clamped = Math.max(newValue, startValue + steps);
                setEndValue(clamped);
                valuesOnChange([startValue, clamped]);
            }
        },
        [dragging, startValue, endValue, min, max, steps, stepDecimals]
    );

    useEffect(() => {
        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [dragging, handleMouseMove, handleMouseUp]);

    // Determine the tick labels to display, using the provided tickLabels prop or defaulting to quarter-point labels if not provided
    const resolvedTickLabels = useMemo(
        () => (tickLabels?.length ? tickLabels : getTickLabels(min, max)),
        [min, max, tickLabels]
    );

    // Generate evenly-spaced tick positions from countOfTicks (or the default derived count)
    const ticks = useMemo(() => {
        const count = Math.round(
            countOfTicks !== undefined
                ? countOfTicks
                : getCountOfTicks(min, max)
        );
        return Array.from({ length: count }, (_, i) =>
            parseFloat(
                (min + (i / (count - 1)) * (max - min)).toFixed(stepDecimals)
            )
        );
    }, [min, max, countOfTicks, stepDecimals]);

    const formatTickLabel = (value: number) => {
        // if the value is an integer, show without decimals
        if (Number.isInteger(value)) {
            return value.toString();
        }

        // try to have 1 or 2 decimals for non-integer values, but avoid trailing zeros
        return value.toFixed(2).replace(/\.?0+$/, '');
    };

    return (
        <div className="w-full px-2">
            {/* Slider track area */}
            <div className="relative h-[36px] flex items-center z-20">
                {/* Track */}
                <div
                    ref={trackRef}
                    className="absolute w-full h-[2px] bg-[var(--custom-slider-track-color)]"
                >
                    {/* Static legend — absolutely positioned above the track line at a fixed height, pointer events disabled */}
                    {legend && (
                        <div
                            className="absolute bottom-full w-full pointer-events-none"
                            // style={{ bottom: 'calc(50% + 2px)' }}
                        >
                            {legend}
                        </div>
                    )}
                </div>

                {/* Highlighted Range — draggable to shift both handles simultaneously */}
                <div
                    className="absolute h-[2px] bg-[var(--custom-light-blue-50)]"
                    style={{
                        left: `${startPosition}%`,
                        width: `${endPosition - startPosition}%`,
                        cursor: dragging === 'segment' ? 'grabbing' : 'grab',
                        zIndex: 1,
                    }}
                    onMouseDown={handleSegmentMouseDown}
                />

                {/* Start Handle */}
                <Handle
                    position={startPosition}
                    value={startValue}
                    isDragging={dragging === 'min'}
                    handleType="min"
                    isAdjacent={isAdjacent}
                    showTooltip={showSliderTooltip}
                    stepDecimals={stepDecimals}
                    onMouseDown={handleMouseDown('min')}
                />

                {/* End Handle */}
                <Handle
                    position={endPosition}
                    value={endValue}
                    isDragging={dragging === 'max'}
                    handleType="max"
                    isAdjacent={isAdjacent}
                    showTooltip={showSliderTooltip}
                    stepDecimals={stepDecimals}
                    onMouseDown={handleMouseDown('max')}
                />

                {/* Tick Marks — positioned just below the track line */}
                {ticks.map((tick, idx) => {
                    return (
                        <div
                            key={idx}
                            className={classNames(
                                'absolute -translate-x-1/2 w-[0.5px] h-1 pointer-events-none bg-custom-light-blue-50'
                            )}
                            style={{
                                left: `${getPositionFromValue(tick)}%`,
                                top: 'calc(50% + 12px)',
                            }}
                        />
                    );
                })}
            </div>

            {/* Tick Labels */}
            <div className="relative h-4 mt-2">
                {resolvedTickLabels.map((label, idx) => (
                    <span
                        key={idx}
                        className="absolute -translate-x-1/2 text-xs text-custom-light-blue-80 pointer-events-none"
                        style={{ left: `${getPositionFromValue(label)}%` }}
                    >
                        {formatTickLabel(label)}
                    </span>
                ))}
            </div>
        </div>
    );
};
