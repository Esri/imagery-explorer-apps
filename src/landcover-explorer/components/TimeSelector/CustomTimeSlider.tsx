/* Copyright 2025 Esri
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

import React, {
    FC,
    useState,
    useRef,
    useCallback,
    useMemo,
    useEffect,
} from 'react';
import classNames from 'classnames';
import { isMobileDevice } from 'helper-toolkit-ts';

// const MAX_LABELS = 10;

type Props = {
    /**
     * List of selectable years, e.g. [2017, 2018, ..., 2024]
     */
    years: number[];
    /**
     * Currently selected year (controlled)
     */
    selectedYear: number;
    /**
     * Whether the slider is visible
     */
    visible: boolean;
    /**
     * Called when the user moves the handle to a new year
     */
    onChange: (year: number) => void;
};

/**
 * Get a subset of years to show as labels on the slider, ensuring that the first and last years are always included,
 * and that there are at most MAX_LABELS total labels. The intermediate labels are chosen to be as evenly spaced as possible.
 * @param years
 * @returns
 */
const getLabelYears = (years: number[]): number[] => {
    const numberOfLabels = isMobileDevice() ? 5 : 10; // Show fewer labels on mobile to avoid clutter

    if (years.length <= numberOfLabels) return years;

    const minYear = years[0];
    const maxYear = years[years.length - 1];

    const result: number[] = [];

    const factor = Math.ceil((maxYear - minYear) / (numberOfLabels - 1));

    for (let i = 0; i < numberOfLabels; i++) {
        const targetYear = minYear + i * factor;

        // Find the closest available year to the targetYear
        const closestYear = years.reduce((closest, year) =>
            Math.abs(year - targetYear) < Math.abs(closest - targetYear)
                ? year
                : closest
        );

        // Avoid duplicates in case of clustered years
        if (!result.includes(closestYear)) {
            result.push(closestYear);
        }

        // Stop if we've reached the max year
        if (closestYear >= maxYear) {
            break;
        }
    }

    return result;
};

export const CustomTimeSlider: FC<Props> = ({
    years,
    selectedYear,
    visible,
    onChange,
}) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const minYear = years[0];
    const maxYear = years[years.length - 1];

    const getPositionFromYear = (year: number): number => {
        if (maxYear === minYear) return 0;
        return ((year - minYear) / (maxYear - minYear)) * 100;
    };

    /**
     * Given a clientX coordinate, snap to the nearest year in the `years` array.
     */
    const getYearFromClientX = useCallback(
        (clientX: number): number => {
            if (!trackRef.current) return selectedYear;
            const rect = trackRef.current.getBoundingClientRect();
            const percentage = Math.max(
                0,
                Math.min(1, (clientX - rect.left) / rect.width)
            );
            const rawYear = minYear + percentage * (maxYear - minYear);
            // snap to nearest year in the years array
            return years.reduce((closest, y) =>
                Math.abs(y - rawYear) < Math.abs(closest - rawYear)
                    ? y
                    : closest
            );
        },
        [years, minYear, maxYear, selectedYear]
    );

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging) return;
            const year = getYearFromClientX(e.clientX);
            if (year !== selectedYear) {
                onChange(year);
            }
        },
        [isDragging, getYearFromClientX, selectedYear, onChange]
    );

    // Also allow clicking on the track itself to jump to a year
    const handleTrackClick = (e: React.MouseEvent) => {
        const year = getYearFromClientX(e.clientX);
        if (year !== selectedYear) {
            onChange(year);
        }
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const handlePosition = getPositionFromYear(selectedYear);

    const labelYears = useMemo(() => getLabelYears(years), [years]);

    if (!visible) return null;

    return (
        <div className="w-full px-2">
            {/* Track area */}
            <div className="relative h-[36px] flex items-center z-20">
                {/* Track background */}
                <div
                    ref={trackRef}
                    className="absolute w-full h-[2px] bg-[var(--custom-slider-track-color)] cursor-pointer"
                    onClick={handleTrackClick}
                >
                    {/* Tick marks — positioned just below the track line */}
                    {years.map((year) => (
                        <div
                            key={year}
                            className="absolute -translate-x-1/2 w-[0.5px] h-1 pointer-events-none bg-custom-light-blue-50"
                            style={{
                                left: `${getPositionFromYear(year)}%`,
                                top: 'calc(50% + 12px)',
                            }}
                        />
                    ))}
                </div>

                {/* Single handle */}
                <div
                    style={{
                        position: 'absolute',
                        left: `${handlePosition}%`,
                        transform: 'translateX(-50%)',
                        zIndex: isDragging ? 3 : 2,
                    }}
                >
                    <div
                        onMouseDown={handleMouseDown}
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
            </div>

            {/* Year labels */}
            <div className="relative h-4 mt-2">
                {labelYears.map((year) => (
                    <span
                        key={year}
                        className="absolute -translate-x-1/2 text-xs text-custom-light-blue-80 pointer-events-none"
                        style={{ left: `${getPositionFromYear(year)}%` }}
                    >
                        {year}
                    </span>
                ))}
            </div>
        </div>
    );
};
