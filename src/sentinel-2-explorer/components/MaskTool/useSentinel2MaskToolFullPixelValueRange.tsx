import { selectSelectedIndex4MaskTool } from '@shared/store/MaskTool/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export const useSentinel2MaskToolFullPixelValueRange = () => {
    const spectralIndex = useAppSelector(
        selectSelectedIndex4MaskTool
    ) as SpectralIndex;

    const fullPixelValueRange = useMemo(() => {
        return [-1, 1];
    }, [spectralIndex]);

    return fullPixelValueRange;
};
