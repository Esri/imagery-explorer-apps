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

import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { LineChartBasic } from '@vannizhang/react-d3-charts';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { MapActionButton } from '@shared/components/MapActionButton/MapActionButton';
import { CalciteIcon } from '@esri/calcite-components-react';
import {
    fetchNDVITimeSeries,
    getDefaultStartDate,
    getDefaultEndDate,
    NDVIDataPoint,
} from '@shared/services/ndvi-timeseries/helpers';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';

type ClickedLocation = {
    lat: number;
    lon: number;
};

type Props = {
    mapView?: MapView;
};

const ndviToChartData = (data: NDVIDataPoint[]): LineChartDataItem[] =>
    data
        .filter((d) => d.date)
        .map((d) => ({
            x: new Date(d.date).getTime(),
            y: Math.min(1, Math.max(-0.2, d.ndvi)),
            tooltip: `${d.date}: ${d.ndvi.toFixed(3)}`,
        }))
        .sort((a, b) => a.x - b.x);

export const NDVITimeSeriesControl: FC<Props> = ({ mapView }) => {
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState<ClickedLocation | null>(null);
    const [ndviData, setNdviData] = useState<NDVIDataPoint[]>([]);
    const [startDate, setStartDate] = useState(getDefaultStartDate);
    const [endDate, setEndDate] = useState(getDefaultEndDate);
    const [error, setError] = useState<string | null>(null);

    const clickHandlerRef = useRef<__esri.Handle | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchData = useCallback(
        async (lat: number, lon: number, start: string, end: string) => {
            // Cancel any in-flight request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();

            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchNDVITimeSeries(lat, lon, start, end);
                setNdviData(data);
                if (data.length === 0) {
                    setError('No data returned for this location and date range.');
                }
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    console.error('NDVI fetch error:', err);
                    setError('Failed to fetch NDVI data. Please try again.');
                }
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    // Set up / tear down map click handler
    useEffect(() => {
        if (!mapView || !isActive) {
            if (clickHandlerRef.current) {
                clickHandlerRef.current.remove();
                clickHandlerRef.current = null;
            }
            return;
        }

        clickHandlerRef.current = mapView.on('click', (event) => {
            event.stopPropagation();
            const { latitude, longitude } = event.mapPoint;
            const lat = Math.round(latitude * 1e6) / 1e6;
            const lon = Math.round(longitude * 1e6) / 1e6;
            setLocation({ lat, lon });
            fetchData(lat, lon, startDate, endDate);
        });

        return () => {
            if (clickHandlerRef.current) {
                clickHandlerRef.current.remove();
                clickHandlerRef.current = null;
            }
        };
    }, [mapView, isActive, startDate, endDate, fetchData]);

    // Close panel and reset when deactivated
    useEffect(() => {
        if (!isActive) {
            setLocation(null);
            setNdviData([]);
            setError(null);
        }
    }, [isActive]);

    const chartData: LineChartDataItem[] = ndviToChartData(ndviData);

    return (
        <>
            {/* Toggle button in the map action button strip */}
            <MapActionButton
                tooltip={isActive ? 'Disable NDVI time series' : 'Show NDVI time series'}
                onClickHandler={() => setIsActive((v) => !v)}
                active={isActive}
                showLoadingIndicator={isLoading}
            >
                <CalciteIcon icon="graph-time-series" scale="s" />
            </MapActionButton>

            {/* Floating panel — only shown when active */}
            {isActive && (
                <div
                    className="fixed z-50 flex flex-col"
                    style={{
                        top: '80px',
                        left: '80px',
                        width: '480px',
                        background: 'var(--custom-background-95, rgba(30,30,30,0.97))',
                        border: '1px solid var(--custom-light-blue-25)',
                        borderRadius: '4px',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-3 py-2"
                        style={{ borderBottom: '1px solid var(--custom-light-blue-25)' }}
                    >
                        <span
                            className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: 'var(--custom-light-blue)' }}
                        >
                            NDVI Time Series
                        </span>
                        <button
                            onClick={() => setIsActive(false)}
                            style={{ color: 'var(--custom-light-blue-50)', lineHeight: 1 }}
                            className="hover:text-white transition-colors"
                            title="Close"
                        >
                            <CalciteIcon icon="x" scale="s" />
                        </button>
                    </div>

                    {/* Date range row */}
                    <div className="flex items-center gap-2 px-3 py-2">
                        <label
                            className="text-xs"
                            style={{ color: 'var(--custom-light-blue-50)', minWidth: 30 }}
                        >
                            From
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            max={endDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--custom-light-blue-25)',
                                color: 'var(--custom-light-blue)',
                                borderRadius: 2,
                                padding: '2px 6px',
                                fontSize: 12,
                                colorScheme: 'dark',
                            }}
                        />
                        <label
                            className="text-xs"
                            style={{ color: 'var(--custom-light-blue-50)', minWidth: 16 }}
                        >
                            To
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            min={startDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--custom-light-blue-25)',
                                color: 'var(--custom-light-blue)',
                                borderRadius: 2,
                                padding: '2px 6px',
                                fontSize: 12,
                                colorScheme: 'dark',
                            }}
                        />
                        {location && (
                            <button
                                onClick={() =>
                                    fetchData(location.lat, location.lon, startDate, endDate)
                                }
                                disabled={isLoading}
                                title="Refresh with new dates"
                                style={{
                                    marginLeft: 'auto',
                                    color: 'var(--custom-light-blue)',
                                    opacity: isLoading ? 0.4 : 1,
                                    cursor: isLoading ? 'default' : 'pointer',
                                }}
                            >
                                <CalciteIcon icon="refresh" scale="s" />
                            </button>
                        )}
                    </div>

                    {/* Body */}
                    <div className="px-3 pb-3">
                        {!location && (
                            <div
                                className="flex items-center justify-center text-xs py-8"
                                style={{ color: 'var(--custom-light-blue-50)' }}
                            >
                                Click anywhere on the map to load NDVI time series
                            </div>
                        )}

                        {location && (
                            <>
                                <div
                                    className="text-xs mb-2"
                                    style={{ color: 'var(--custom-light-blue-50)' }}
                                >
                                    {location.lat.toFixed(4)}°{location.lat >= 0 ? 'N' : 'S'},{' '}
                                    {location.lon.toFixed(4)}°{location.lon >= 0 ? 'E' : 'W'}
                                </div>

                                {isLoading && (
                                    <div
                                        className="flex items-center justify-center text-xs py-10"
                                        style={{ color: 'var(--custom-light-blue-50)' }}
                                    >
                                        Loading…
                                    </div>
                                )}

                                {!isLoading && error && (
                                    <div
                                        className="text-xs py-6 text-center"
                                        style={{ color: '#ff8888' }}
                                    >
                                        {error}
                                    </div>
                                )}

                                {!isLoading && !error && chartData.length > 0 && (
                                    <div
                                        style={{
                                            height: 200,
                                            '--axis-tick-line-color':
                                                'var(--custom-light-blue-50)',
                                            '--axis-tick-text-color':
                                                'var(--custom-light-blue-50)',
                                            '--crosshair-reference-line-color':
                                                'var(--custom-light-blue-50)',
                                            '--tooltip-text-font-size': '.725rem',
                                            '--tooltip-text-color':
                                                'var(--custom-light-blue-70)',
                                            '--tooltip-background-color':
                                                'var(--custom-background-95)',
                                            '--tooltip-border-color':
                                                'var(--custom-light-blue-50)',
                                        } as React.CSSProperties}
                                    >
                                        <LineChartBasic
                                            data={chartData}
                                            showTooltip
                                            stroke="#05CB63"
                                            strokeWidth={1.5}
                                            margin={{
                                                bottom: 30,
                                                left: 45,
                                                right: 15,
                                                top: 10,
                                            }}
                                            yScaleOptions={{ domain: [-0.2, 1] }}
                                            xScaleOptions={{ useTimeScale: true }}
                                            bottomAxisOptions={{
                                                numberOfTicks: 5,
                                                tickFormatFunction: (val: any) =>
                                                    formatInUTCTimeZone(val, 'yyyy'),
                                            }}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
