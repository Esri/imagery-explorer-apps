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

import { NDVI_TIMESERIES_ENDPOINT } from './config';

export type NDVIDataPoint = {
    /** ISO date string, e.g. "2023-06-15" */
    date: string;
    /** NDVI value, typically in range [-1, 1] */
    ndvi: number;
};

/**
 * Fetch NDVI time series from the cloud function endpoint.
 * @param lat - Latitude of the point
 * @param lon - Longitude of the point
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 */
export const fetchNDVITimeSeries = async (
    lat: number,
    lon: number,
    startDate: string,
    endDate: string
): Promise<NDVIDataPoint[]> => {
    const url = new URL(NDVI_TIMESERIES_ENDPOINT);
    url.searchParams.append('lat', lat.toFixed(6));
    url.searchParams.append('lon', lon.toFixed(6));
    url.searchParams.append('start', startDate);
    url.searchParams.append('end', endDate);

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(
            `NDVI time series request failed: ${response.status} ${response.statusText}`
        );
    }

    const raw = await response.json();

    // Normalise to NDVIDataPoint[] regardless of response envelope
    const items: unknown[] = Array.isArray(raw) ? raw : raw?.data ?? raw?.results ?? [];

    return items.map((item: any) => ({
        date: item.date ?? item.timestamp ?? item.time ?? '',
        ndvi: Number(item.ndvi ?? item.value ?? item.ndvi_value ?? 0),
    }));
};

/**
 * Returns the default start date (5 years ago) as a YYYY-MM-DD string.
 */
export const getDefaultStartDate = (): string => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 5);
    return d.toISOString().split('T')[0];
};

/**
 * Returns today's date as a YYYY-MM-DD string.
 */
export const getDefaultEndDate = (): string => {
    return new Date().toISOString().split('T')[0];
};
