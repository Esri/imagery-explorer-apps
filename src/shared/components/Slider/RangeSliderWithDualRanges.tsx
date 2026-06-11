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
import { formatTickLabel, getCountOfTicks, getTickLabels } from './RangeSlider';

/**
 * Identifies which handle (or segment) of the dual range slider is being dragged.
 * `min1`/`max1` belong to the lower range (`values`), `min2`/`max2` belong to the
 * higher range (`values2`), and `segment1`/`segment2` represent dragging the
 * highlighted bar between a pair of handles to shift that range as a whole.
 */
export type DualRangeSliderHandleType =
    | 'min1'
    | 'max1'
    | 'min2'
    | 'max2'
    | 'segment1'
    | 'segment2'
    | null;

type HandleType = 'min1' | 'max1' | 'min2' | 'max2';

type Props = {
    /**
     * Current [start, end] values of the lower range (controlled)
     */
    values: number[];
    /**
     * Current [start, end] values of the higher range (controlled)
     */
    values2: number[];
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
     * Emits the updated [start, end] values for the lower range whenever the user moves one of its handles or drags its segment
     */
    valuesOnChange: (vals: number[]) => void;
    /**
     * Emits the updated [start, end] values for the higher range whenever the user moves one of its handles or drags its segment
     */
    values2OnChange: (vals: number[]) => void;
    /**
     * Optional static legend rendered above the track at full width, for visual reference only (no mouse events)
     */
    legend?: React.ReactNode;
};

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
     * Whether to show the tooltip when hovering over the handle
     */
    showTooltip?: boolean;
    /**
     * Number of decimal places to show in the tooltip, derived from the step value to ensure proper formatting (e.g. if step is 0.01, show 2 decimals)
     */
    stepDecimals: number;
    /**
     * Stacking order for this handle, used so that when two handles sit on top of
     * each other, the leftmost one (the one with the highest z-index) receives mouse events
     */
    zIndex: number;
    /**
     * Mouse down event handler to initiate dragging of this handle
     */
    onMouseDown: (e: React.MouseEvent) => void;
}

/**
 * When two handles sit at the same position, the leftmost handle (in value order) is
 * stacked on top so it receives mouse events and can always be picked up.
 */
const HANDLE_STACK_ORDER: Record<HandleType, number> = {
    min1: 4,
    max1: 3,
    min2: 2,
    max2: 1,
};

const Handle: FC<HandleProps> = ({
    position,
    value,
    isDragging,
    showTooltip,
    stepDecimals,
    zIndex,
    onMouseDown,
}) => {
    const displayValue = value.toFixed(stepDecimals);

    return (
        <div
            className="group"
            style={{
                position: 'absolute',
                left: `${position}%`,
                transform: 'translateX(-50%)',
                zIndex,
            }}
        >
            {showTooltip && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap text-xs text-custom-light-blue-80">
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

export const RangeSliderWithDualRanges: FC<Props> = ({
    values,
    values2,
    min = -1,
    max = 1,
    steps = 0.05,
    countOfTicks,
    tickLabels,
    showSliderTooltip,
    valuesOnChange,
    values2OnChange,
    legend,
}) => {
    // lower range (values): [start1, end1]
    const [start1, setStart1] = useState(values[0]);
    const [end1, setEnd1] = useState(values[1]);
    // higher range (values2): [start2, end2]
    const [start2, setStart2] = useState(values2[0]);
    const [end2, setEnd2] = useState(values2[1]);

    const [dragging, setDragging] = useState<DualRangeSliderHandleType>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const segmentDragStartRef = useRef<{
        clientX: number;
        start1: number;
        end1: number;
        start2: number;
        end2: number;
    } | null>(null);

    // Calculate the number of decimal places in the step value to ensure proper rounding of handle values
    const stepDecimals = useMemo(
        () => (steps.toString().split('.')[1] || '').length,
        [steps]
    );

    // Synchronize internal state with the controlled `values`/`values2` props when not dragging
    useEffect(() => {
        if (!values || dragging) return;
        if (values[0] !== start1) setStart1(values[0]);
        if (values[1] !== end1) setEnd1(values[1]);
    }, [values]);

    useEffect(() => {
        if (!values2 || dragging) return;
        if (values2[0] !== start2) setStart2(values2[0]);
        if (values2[1] !== end2) setEnd2(values2[1]);
    }, [values2]);

    // Helper functions to convert between value and position on the track
    const getPositionFromValue = (value: number) => {
        return ((value - min) / (max - min)) * 100;
    };

    // Given a clientX position from a mouse event, calculate the corresponding slider value, snapping to the nearest step increment
    const getValueFromPosition = (clientX: number): number => {
        if (!trackRef.current) return min;

        const rect = trackRef.current.getBoundingClientRect();

        const percentage = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width)
        );

        const rawValue = min + percentage * (max - min);

        const stepsFromMin = Math.round((rawValue - min) / steps);

        const snapped = parseFloat(
            (stepsFromMin * steps + min).toFixed(stepDecimals)
        );

        return Math.max(min, Math.min(max, snapped));
    };

    // Positions of the 4 handles as percentages for styling the track and handles
    const posMin1 = getPositionFromValue(start1);
    const posMax1 = getPositionFromValue(end1);
    const posMin2 = getPositionFromValue(start2);
    const posMax2 = getPositionFromValue(end2);

    /**
     * Handle the start of a drag on one of the 4 handles
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
     * Begins a segment drag, recording the initial mouse position and the values of both
     * ranges so the dragged range can be shifted as a whole while it stays clear of the other range.
     */
    const handleSegmentMouseDown =
        (segment: 'segment1' | 'segment2') => (e: React.MouseEvent) => {
            e.preventDefault();
            segmentDragStartRef.current = {
                clientX: e.clientX,
                start1,
                end1,
                start2,
                end2,
            };
            setDragging(segment);
        };

    /**
     * Handles mouse movement during a drag operation, updating handle values based on mouse position.
     */
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!dragging) return;

            // handle segment dragging separately to shift both handles of a range together while maintaining their distance
            if (dragging === 'segment1' || dragging === 'segment2') {
                const ref = segmentDragStartRef.current;
                if (!ref || !trackRef.current) return;
                const rect = trackRef.current.getBoundingClientRect();

                const delta =
                    ((e.clientX - ref.clientX) / rect.width) * (max - min);

                const snappedDelta = parseFloat(
                    (Math.round(delta / steps) * steps).toFixed(stepDecimals)
                );

                if (dragging === 'segment1') {
                    // shift the lower range, stopping it from crossing into the higher range
                    const rangeWidth = ref.end1 - ref.start1;
                    const newStart1 = parseFloat(
                        Math.max(
                            min,
                            Math.min(
                                ref.start1 + snappedDelta,
                                ref.start2 - rangeWidth
                            )
                        ).toFixed(stepDecimals)
                    );
                    const newEnd1 = parseFloat(
                        (newStart1 + rangeWidth).toFixed(stepDecimals)
                    );
                    setStart1(newStart1);
                    setEnd1(newEnd1);
                    valuesOnChange([newStart1, newEnd1]);
                } else {
                    // shift the higher range, stopping it from crossing into the lower range
                    const rangeWidth = ref.end2 - ref.start2;
                    const newStart2 = parseFloat(
                        Math.max(
                            ref.end1,
                            Math.min(
                                ref.start2 + snappedDelta,
                                max - rangeWidth
                            )
                        ).toFixed(stepDecimals)
                    );
                    const newEnd2 = parseFloat(
                        (newStart2 + rangeWidth).toFixed(stepDecimals)
                    );
                    setStart2(newStart2);
                    setEnd2(newEnd2);
                    values2OnChange([newStart2, newEnd2]);
                }
                return;
            }

            // For individual handle dragging, calculate the new value based on mouse position and update the corresponding handle.
            // Each handle is stopped at the boundary of the other range — it never pushes or moves a handle that belongs to the other range.
            const newValue = getValueFromPosition(e.clientX);

            if (dragging === 'min1') {
                const clamped = Math.min(newValue, end1 - steps);
                setStart1(clamped);
                valuesOnChange([clamped, end1]);
            } else if (dragging === 'max1') {
                // end1 must stay at least one step ahead of start1, and cannot cross into the higher range
                const clamped = Math.min(
                    Math.max(newValue, start1 + steps),
                    start2
                );
                setEnd1(clamped);
                valuesOnChange([start1, clamped]);
            } else if (dragging === 'min2') {
                // start2 must stay at least one step behind end2, and cannot cross into the lower range
                const clamped = Math.max(
                    Math.min(newValue, end2 - steps),
                    end1
                );
                setStart2(clamped);
                values2OnChange([clamped, end2]);
            } else if (dragging === 'max2') {
                const clamped = Math.max(newValue, start2 + steps);
                setEnd2(clamped);
                values2OnChange([start2, clamped]);
            }
        },
        [dragging, start1, end1, start2, end2, min, max, steps, stepDecimals]
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
    const resolvedTickLabels = useMemo(() => {
        const labels =
            tickLabels && tickLabels.length > 0
                ? tickLabels
                : getTickLabels(min, max);

        const MAX_LABELS = 10;
        if (labels.length > MAX_LABELS) {
            const factor = Math.ceil(labels.length / MAX_LABELS);
            return labels.filter((_, idx) => idx % factor === 0);
        }

        return labels;
    }, [min, max, tickLabels]);

    // Generate evenly-spaced tick positions from countOfTicks (or the default derived count)
    const ticks = useMemo(() => {
        const count = Math.round(
            countOfTicks !== undefined
                ? countOfTicks
                : getCountOfTicks(min, max)
        );
        return Array.from({ length: count }, (_, i) => {
            const fraction = i / (count - 1);
            const rawValue = min + fraction * (max - min);
            return parseFloat(rawValue.toFixed(stepDecimals));
        });
    }, [min, max, countOfTicks, stepDecimals]);

    // The dragged handle is always brought to the front so it stays interactive while moving over other handles
    const getZIndex = (handle: HandleType) =>
        dragging === handle ? 10 : HANDLE_STACK_ORDER[handle];

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
                        <div className="absolute bottom-full w-full pointer-events-none">
                            {legend}
                        </div>
                    )}
                </div>

                {/* Lower range highlight — draggable to shift both of its handles simultaneously */}
                <div
                    className="absolute h-[2px] bg-[var(--custom-light-blue-50)]"
                    style={{
                        left: `${posMin1}%`,
                        width: `${posMax1 - posMin1}%`,
                        cursor: dragging === 'segment1' ? 'grabbing' : 'grab',
                        zIndex: 1,
                    }}
                    onMouseDown={handleSegmentMouseDown('segment1')}
                />

                {/* Higher range highlight — draggable to shift both of its handles simultaneously */}
                <div
                    className="absolute h-[2px] bg-[var(--custom-light-blue-50)]"
                    style={{
                        left: `${posMin2}%`,
                        width: `${posMax2 - posMin2}%`,
                        cursor: dragging === 'segment2' ? 'grabbing' : 'grab',
                        zIndex: 1,
                    }}
                    onMouseDown={handleSegmentMouseDown('segment2')}
                />

                {/* Lower range handles */}
                <Handle
                    position={posMin1}
                    value={start1}
                    isDragging={dragging === 'min1'}
                    showTooltip={showSliderTooltip}
                    stepDecimals={stepDecimals}
                    zIndex={getZIndex('min1')}
                    onMouseDown={handleMouseDown('min1')}
                />
                <Handle
                    position={posMax1}
                    value={end1}
                    isDragging={dragging === 'max1'}
                    showTooltip={showSliderTooltip}
                    stepDecimals={stepDecimals}
                    zIndex={getZIndex('max1')}
                    onMouseDown={handleMouseDown('max1')}
                />

                {/* Higher range handles */}
                <Handle
                    position={posMin2}
                    value={start2}
                    isDragging={dragging === 'min2'}
                    showTooltip={showSliderTooltip}
                    stepDecimals={stepDecimals}
                    zIndex={getZIndex('min2')}
                    onMouseDown={handleMouseDown('min2')}
                />
                <Handle
                    position={posMax2}
                    value={end2}
                    isDragging={dragging === 'max2'}
                    showTooltip={showSliderTooltip}
                    stepDecimals={stepDecimals}
                    zIndex={getZIndex('max2')}
                    onMouseDown={handleMouseDown('max2')}
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
                                top: 'calc(50% + 8px)',
                            }}
                        />
                    );
                })}
            </div>

            {/* Tick Labels */}
            <div className="relative h-4 mt-1">
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
