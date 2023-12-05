import { convert2csv } from '@shared/utils/snippets/convert2csv';
import { FormattedSpectralSamplingData } from '../SamplingPointsList/useFormattedSpectralSamplingData';
import { LANDSAT_BAND_NAMES } from '@shared/services/landsat-level-2/config';
import { downloadBlob } from '@shared/utils/snippets/downloadBlob';
import JSZip from 'jszip';

export const saveLandsatSamplingResults = async (
    classification: string,
    data: FormattedSpectralSamplingData[]
) => {
    const rows: string[][] = data.map((d) => {
        const { bandValues, location, objectIdOfSelectedScene } = d;

        return [
            classification,
            // for Landsat, we only need to include data from the first 7 bands
            ...bandValues.slice(0, 7).map((d) => d.toString()),
            location.longitude.toFixed(5),
            location.latitude.toFixed(5),
        ];
    });

    const csvStr = convert2csv(
        [
            'Classification',
            // for Landsat, we only need to include data from the first 7 bands
            ...LANDSAT_BAND_NAMES.slice(0, 7),
            'Longitude',
            'Latitude',
        ],
        rows
    );

    const zip = new JSZip();

    zip.file('sampling-results.csv', csvStr);

    const content = await zip.generateAsync({ type: 'blob' });

    downloadBlob(content, `spectral-sampling-results-${classification}.zip`);
};
