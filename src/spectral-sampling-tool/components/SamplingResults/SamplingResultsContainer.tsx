import { selectSpectralSamplingPointsData } from '@shared/store/SpectralSamplingTool/selectors';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const SamplingResultsContainer = () => {
    const samplingPointsData = useSelector(selectSpectralSamplingPointsData);

    const chartData = useMemo(() => {
        if (!samplingPointsData || !samplingPointsData.length) {
            return [];
        }

        return samplingPointsData.filter((d) => d.location && d.bandValues);
    }, [samplingPointsData]);

    return (
        <div
            className={classNames('w-[300px] h-full mx-2', {
                'is-disabled': chartData.length === 0,
            })}
        >
            <div className="text-center">
                <span className="uppercase text-sm ml-1">
                    Spectral Sampling Results
                </span>
            </div>

            {chartData.length === 0 ? (
                <div className="w-full mt-10 flex justify-center text-center">
                    <p className="text-sm opacity-80 w-3/4">
                        Add spectral sampling points on the map to view the
                        results.
                    </p>
                </div>
            ) : (
                <div className="w-full h-[120px] my-2"></div>
            )}
        </div>
    );
};
