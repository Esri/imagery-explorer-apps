import { SpectralIndex } from '@shared/store/Analysis/reducer';
import {
    getMosaicRuleByObjectId,
    getRasterFunctionBySpectralIndex,
} from './helpers';
import { LANDSAT_LEVEL_2_SERVICE_URL } from './config';

type ComputeHistogramOptions = {
    /**
     * map resolution
     */
    resolution: number;
    /**
     * user selected spectral index
     */
    spectralIndex: SpectralIndex;
    /**
     * object Id of the Landsat scene
     */
    objectId: number;
};

export const computeHistogram = async ({
    resolution,
    spectralIndex,
    objectId,
}: ComputeHistogramOptions) => {
    const params = new URLSearchParams({
        f: 'json',
        pixelSize: JSON.stringify({
            x: resolution,
            y: resolution,
        }),
        renderingRule: JSON.stringify(
            getRasterFunctionBySpectralIndex(spectralIndex)
        ),
        mosaicRule: JSON.stringify(getMosaicRuleByObjectId(objectId)),
    });

    const res = await fetch(
        LANDSAT_LEVEL_2_SERVICE_URL + '/computehistograms?' + params.toString()
    );

    const data = await res.json();

    return data;
};
