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
import { downloadBlob } from '@shared/utils/snippets/downloadBlob';
import JSZip from 'jszip';
import { getLandsatSceneByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';
import { SpectralSamplingToolSupportedService } from '@shared/store/SpectralSamplingTool/reducer';
import { LandsatScene, Sentinel2Scene } from '@typing/imagery-service';
import { getSentinel2SceneByObjectId } from '@shared/services/sentinel-2/getSentinel2Scenes';

const getHeadersForLandsatSamplingResults = (bandNames: string[]) => {
    return ['Classification', ...bandNames, 'Longitude', 'Latitude', 'SceneId'];
};

const getCsvString4LandsatSamplingResults = async (
    classification: string,
    data: FormattedSpectralSamplingData[],
    bandNames: string[],
    targetService: SpectralSamplingToolSupportedService
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

        let scene: LandsatScene | Sentinel2Scene = null;

        if (targetService === 'landsat') {
            scene = await getLandsatSceneByObjectId(objectIdOfSelectedScene);
        } else if (targetService === 'sentinel-2') {
            scene = await getSentinel2SceneByObjectId(objectIdOfSelectedScene);
        }

        const row = [
            classification,
            ...bandValues.slice(0, bandNames.length).map((d) => d.toString()),
            location.longitude.toFixed(5),
            location.latitude.toFixed(5),
            scene.name,
        ];

        rows.push(row);
    }

    const csvStr = convert2csv(
        getHeadersForLandsatSamplingResults(bandNames),
        rows
    );

    return csvStr;
};

const getCsvString4AveragedLandsatSamplingResults = (
    classification: string,
    averagedBandValues: number[],
    bandNames: string[]
) => {
    const rows: string[][] = [
        [
            classification,
            ...averagedBandValues
                .slice(0, bandNames.length)
                .map((d) => d.toString()),
        ],
    ];

    const csvStr = convert2csv(
        getHeadersForLandsatSamplingResults(bandNames),
        rows
    );

    return csvStr;
};

export const saveSamplingResults = async ({
    classification,
    data,
    averagedBandValues,
    targetService,
    bandNames,
}: {
    classification: string;
    data: FormattedSpectralSamplingData[];
    averagedBandValues: number[];
    targetService: SpectralSamplingToolSupportedService;
    bandNames: string[];
}) => {
    const zip = new JSZip();

    zip.file(
        `${classification}-samples.csv`,
        getCsvString4LandsatSamplingResults(
            classification,
            data,
            bandNames,
            targetService
        )
    );
    zip.file(
        `${classification}-average.csv`,
        getCsvString4AveragedLandsatSamplingResults(
            classification,
            averagedBandValues,
            bandNames
        )
    );

    const content = await zip.generateAsync({ type: 'blob' });

    downloadBlob(content, `${classification}-sample-tables.zip`);
};
