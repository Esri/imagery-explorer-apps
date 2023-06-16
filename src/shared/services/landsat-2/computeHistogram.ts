import { SpectralIndex } from '@shared/store/Analysis/reducer';

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

export const computeHistogram = ({
    resolution,
    spectralIndex,
    objectId,
}: ComputeHistogramOptions) => {
    // return {}
};
