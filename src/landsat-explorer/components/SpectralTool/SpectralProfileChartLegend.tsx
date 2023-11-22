import React, { FC } from 'react';
// import { SpectralProfileFeatureOfInterest } from './SpectralToolContainer';
import { SpectralProfileFeatureOfInterest } from './config';

type Props = {
    featureOfInterest: SpectralProfileFeatureOfInterest;
};

type LegendItemProps = {
    label: string;
    fill: string;
    strokeDasharray?: string;
};

const LegendLineWidth = 16;
const LegendLineHeight = 2;

const LegendItem: FC<LegendItemProps> = ({ label, fill, strokeDasharray }) => {
    return (
        <div className="flex items-center">
            <svg
                height={LegendLineHeight}
                width={LegendLineWidth}
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <line
                    stroke={fill}
                    strokeWidth={3}
                    strokeDasharray={strokeDasharray}
                    x1="0"
                    x2={LegendLineWidth}
                    y1="0"
                    y2="0"
                />
            </svg>
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
                fill="var(--custom-light-blue-50)"
                strokeDasharray="3 1"
            />
        </div>
    );
};
