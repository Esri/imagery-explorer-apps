import { selectSelectedIndex4MaskTool } from '@shared/store/MaskTool/selectors';
import { RadarIndex, SpectralIndex } from '@typing/imagery-service';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Sentinel1PixelValueRangeByIndex } from './Sentinel1MaskTool';

export const useSentinel1MaskToolFullPixelValueRange = () => {
    const selectedIndex = useSelector(
        selectSelectedIndex4MaskTool
    ) as RadarIndex;

    const fullPixelValueRange = useMemo(() => {
        return (
            Sentinel1PixelValueRangeByIndex[selectedIndex as RadarIndex] || [
                0, 0,
            ]
        );
    }, [selectedIndex]);

    return fullPixelValueRange;
};
