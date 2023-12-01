import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useChartData } from './useChartData';
import { SpectralProfileChart } from '@landsat-explorer/components/SpectralTool/SpectralProfileChart';

export const SamplingResultsContainer = () => {
    const chartData = useChartData();

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
                <div className="w-full h-[120px] my-2">
                    <SpectralProfileChart chartData={chartData} />
                </div>
            )}
        </div>
    );
};
