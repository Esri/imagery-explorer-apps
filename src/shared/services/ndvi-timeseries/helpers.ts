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

export type IndexType = 'ndvi' | 'evi' | 'nbr';

export type NDVIDataPoint = {
    /** ISO date string, e.g. "2023-06-15" */
    date: string;
    /** Index value (NDVI, EVI, or NBR) */
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
    endDate: string,
    index: IndexType = 'ndvi'
): Promise<NDVIDataPoint[]> => {
    const response = await fetch(NDVI_TIMESERIES_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            latitude: parseFloat(lat.toFixed(6)),
            longitude: parseFloat(lon.toFixed(6)),
            start_date: startDate,
            end_date: endDate,
            index,
        }),
    });

    if (!response.ok) {
        let detail = '';
        try {
            detail = await response.text();
        } catch (_) {
            // ignore
        }
        throw new Error(
            `NDVI time series request failed: ${response.status} ${response.statusText}${detail ? ` — ${detail}` : ''}`
        );
    }

    const raw = await response.json();

    // Normalise to NDVIDataPoint[] regardless of response envelope
    const items: unknown[] = Array.isArray(raw) ? raw : raw?.timeseries ?? raw?.data ?? raw?.results ?? [];

    return items.map((item: any) => ({
        date: item.date ?? item.timestamp ?? item.time ?? '',
        ndvi: Number(item.index ?? item.ndvi ?? item.value ?? item.ndvi_value ?? 0),
    }));
};

/**
 * Returns the default start date (2 years ago) as a YYYY-MM-DD string.
 */
export const getDefaultStartDate = (): string => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 2);
    return d.toISOString().split('T')[0];
};

/**
 * Returns yesterday's date as a YYYY-MM-DD string.
 * Using yesterday avoids 400 errors from APIs that reject future or same-day end dates
 * due to satellite data processing delays.
 */
export const getDefaultEndDate = (): string => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
};
