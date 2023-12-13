import { convert2csv } from '@shared/utils/snippets/convert2csv';
import { FormattedSpectralSamplingData } from '../SamplingPointsList/useFormattedSpectralSamplingData';
import { LANDSAT_BAND_NAMES } from '@shared/services/landsat-level-2/config';
import { downloadBlob } from '@shared/utils/snippets/downloadBlob';
import JSZip from 'jszip';
import { getLandsatSceneByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';

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

const getCsvString4LandsatSamplingResults = async (
    classification: string,
    data: FormattedSpectralSamplingData[]
): Promise<string> => {
    const rows: string[][] = [];

    for (const d of data) {
        const { bandValues, location, objectIdOfSelectedScene } = d;

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
