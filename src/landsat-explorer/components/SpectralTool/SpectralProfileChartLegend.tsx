import React, { FC } from 'react';
import { SpectralProfileFeatureOfInterest } from './SpectralToolContainer';
import { FillColorByFeatureOfInterest } from './config';

type Props = {
    featureOfInterest: SpectralProfileFeatureOfInterest;
};

type LegendItemProps = {
    label: string;
    fill: string;
};

const LegendItem: FC<LegendItemProps> = ({ label, fill }) => {
    return (
        <div className="flex items-center">
            <div
                className="w-[12px] h-[2px]"
                style={{
                    background: fill,
                }}
            ></div>
            <span className="ml-2 text-xs text-custom-light-blue-80">
                {label}
            </span>
        </div>
    );
};

export const SpectralProfileChartLegend: FC<Props> = ({
    featureOfInterest,
}) => {
    if (!featureOfInterest) {
        return null;
    }

    return (
        <div className="w-full mt-3">
            <LegendItem
                label="Spectral signature of selected location"
                fill="var(--custom-light-blue-90)"
            />

            <LegendItem
                label={'Spectral signature of ' + featureOfInterest}
                fill={FillColorByFeatureOfInterest[featureOfInterest]}
            />
        </div>
    );
};
