import { selectIsMapUpdating } from '@shared/store/Map/selectors';
import { selectMaskLayerVisibleArea } from '@shared/store/MaskTool/selectors';
import { numberWithCommas } from 'helper-toolkit-ts';
import React from 'react';
import { useSelector } from 'react-redux';

export const MaskLayerVisibleAreaInfo = () => {
    const maskArea = useSelector(selectMaskLayerVisibleArea);

    const isMapUpdating = useSelector(selectIsMapUpdating);

    if (maskArea === null) {
        return null;
    }

    const getFormattedArea = () => {
        if (!maskArea) {
            return 0;
        }

        if (maskArea > 100) {
            return numberWithCommas(Math.floor(maskArea));
        }

        return maskArea.toFixed(2);
    };

    return (
        <div className="absolute top-3 right-0 text-xs">
            {isMapUpdating ? (
                <div className="flex justify-end">
                    <calcite-loader inline />
                    <span>Loading mask layer</span>
                </div>
            ) : (
                <p>Estimated Mask Area: {getFormattedArea()} Sq.Km</p>
            )}
        </div>
    );
};
