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

import { convert2csv } from '@shared/utils/snippets/convert2csv';
import { FormattedSpectralSamplingData } from '../SamplingPointsList/useFormattedSpectralSamplingData';
import { LANDSAT_BAND_NAMES } from '@shared/services/landsat-level-2/config';
import { EMIT_BAND_NAMES } from '@shared/services/emit-level-2a/config';
import { downloadBlob } from '@shared/utils/snippets/downloadBlob';
import JSZip from 'jszip';
import { getLandsatSceneByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';
import { getEmitSceneByObjectId } from '@shared/services/emit-level-2a/getEmitScenes';

const getHeadersForLandsatSamplingResults = () => {
    return [
        'Classification',
        // for Landsat, we only need to include data from the first 7 bands
        ...LANDSAT_BAND_NAMES.slice(0, 7),
        'Longitude',
        'Latitude',
        'SceneId',
    ];
};

const getHeadersForEmitSamplingResults = () => {
    return [
        'Classification',
        // for Landsat, we only need to include data from the first 7 bands
        ...EMIT_BAND_NAMES.slice(0, 284),
        'Longitude',
        'Latitude',
        'SceneId',
    ];
};
const getCsvString4LandsatSamplingResults = async (
    classification: string,
    data: FormattedSpectralSamplingData[]
): Promise<string> => {
    const rows: string[][] = [];

    for (const d of data) {
        const { bandValues, location, objectIdOfSelectedScene } = d || {};

        // skip if location or object id id not found
        if (!location || !objectIdOfSelectedScene) {
            continue;
        }

        // skip if bandValues contain bad pixel values
        if (bandValues.filter((d) => d === null).length !== 0) {
            continue;
        }

        const landsatScene = await getLandsatSceneByObjectId(
            objectIdOfSelectedScene
        );

        const row = [
            classification,
            // for Landsat, we only need to include data from the first 7 bands
            ...bandValues.slice(0, 7).map((d) => d.toString()),
            location.longitude.toFixed(5),
            location.latitude.toFixed(5),
            landsatScene.name,
        ];

        rows.push(row);
    }

    const csvStr = convert2csv(getHeadersForLandsatSamplingResults(), rows);

    return csvStr;
};

const getCsvString4AveragedLandsatSamplingResults = (
    classification: string,
    averagedBandValues: number[]
) => {
    const rows: string[][] = [
        [
            classification,
            // for Landsat, we only need to include data from the first 7 bands
            ...averagedBandValues.slice(0, 7).map((d) => d.toString()),
        ],
    ];

    const csvStr = convert2csv(getHeadersForLandsatSamplingResults(), rows);

    return csvStr;
};

export const saveLandsatSamplingResults = async (
    classification: string,
    data: FormattedSpectralSamplingData[],
    averagedBandValues: number[]
) => {
    const zip = new JSZip();

    zip.file(
        `${classification}-samples.csv`,
        getCsvString4LandsatSamplingResults(classification, data)
    );
    zip.file(
        `${classification}-average.csv`,
        getCsvString4AveragedLandsatSamplingResults(
            classification,
            averagedBandValues
        )
    );

    const content = await zip.generateAsync({ type: 'blob' });

    downloadBlob(content, `${classification}-sample-tables.zip`);
};
///////Emit

const getCsvString4EmitSamplingResults = async (
    classification: string,
    data: FormattedSpectralSamplingData[]
): Promise<string> => {
    const rows: string[][] = [];

    for (const d of data) {
        const { bandValues, location, objectIdOfSelectedScene } = d || {};

        // skip if location or object id id not found
        if (!location || !objectIdOfSelectedScene) {
            continue;
        }

        // skip if bandValues contain bad pixel values
        if (bandValues.filter((d) => d === null).length !== 0) {
            continue;
        }

        const emitScene = await getEmitSceneByObjectId(
            objectIdOfSelectedScene
        );

        const row = [
            classification,
            // for Landsat, we only need to include data from the first 7 bands
            ...bandValues.slice(0, 7).map((d) => d.toString()),
            location.longitude.toFixed(5),
            location.latitude.toFixed(5),
            emitScene.name,
        ];

        rows.push(row);
    }

    const csvStr = convert2csv(getHeadersForEmitSamplingResults(), rows);

    return csvStr;
};

const getCsvString4AveragedEmitSamplingResults = (
    classification: string,
    averagedBandValues: number[]
) => {
    const rows: string[][] = [
        [
            classification,
            // for Landsat, we only need to include data from the first 7 bands
            ...averagedBandValues.slice(0, 7).map((d) => d.toString()),
        ],
    ];

    const csvStr = convert2csv(getHeadersForEmitSamplingResults(), rows);

    return csvStr;
};

export const saveEmitSamplingResults = async (
    classification: string,
    data: FormattedSpectralSamplingData[],
    averagedBandValues: number[]
) => {
    const zip = new JSZip();

    zip.file(
        `${classification}-samples.csv`,
        getCsvString4EmitSamplingResults(classification, data)
    );
    zip.file(
        `${classification}-average.csv`,
        getCsvString4AveragedEmitSamplingResults(
            classification,
            averagedBandValues
        )
    );

    const content = await zip.generateAsync({ type: 'blob' });

    downloadBlob(content, `${classification}-sample-tables.zip`);
};


