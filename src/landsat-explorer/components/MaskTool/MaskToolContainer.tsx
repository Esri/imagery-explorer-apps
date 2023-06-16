import {
    MaskMethodList,
    MaskPixelRangeSlider,
    MaskRenderingControls,
} from '@shared/components/MaskTool';
import { computeHistogram } from '@shared/services/landsat-2/computeHistogram';
import {
    maskLayerOpacityChanged,
    shouldClipMaskLayerToggled,
    spectralIndexChanged,
} from '@shared/store/Analysis/reducer';
import {
    selectMaskLayerOpcity,
    selectSpectralIndex,
    selectMaskOptions,
    selectShouldClipMaskLayer,
} from '@shared/store/Analysis/selectors';
import {
    updateMaskColor,
    updateSelectedRange,
} from '@shared/store/Analysis/thunks';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/Landsat/selectors';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const MaskToolContainer = () => {
    const dispatch = useDispatch();

    const selectedSpectralIndex = useSelector(selectSpectralIndex);

    const maskOptions = useSelector(selectMaskOptions);

    const opacity = useSelector(selectMaskLayerOpcity);

    const shouldClip = useSelector(selectShouldClipMaskLayer);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    // useEffect(()=>{
    //     (async()=>{
    //         try {
    //             if(!objectIdOfSelectedScene){
    //                 return
    //             }

    //             const res = await computeHistogram({
    //                 resolution: 76.43702828507347,
    //                 objectId: objectIdOfSelectedScene,
    //                 spectralIndex: selectedSpectralIndex
    //             })

    //             console.log(res)

    //         } catch(err){
    //             console.log(err)
    //         }
    //     })()
    // }, [objectIdOfSelectedScene, selectedSpectralIndex])

    return (
        <div className="w-[250px] h-full mx-4">
            <MaskMethodList
                selectedSpectralIndex={selectedSpectralIndex}
                onChange={(val) => {
                    dispatch(spectralIndexChanged(val));
                }}
            />

            <MaskPixelRangeSlider
                values={maskOptions.selectedRange}
                valOnChange={(index, value) => {
                    dispatch(updateSelectedRange(index, value));
                }}
            />

            <MaskRenderingControls
                selectedOpacity={opacity}
                shouldClip={shouldClip}
                color={maskOptions.color}
                colorOnChange={(color) => {
                    dispatch(updateMaskColor(color));
                }}
                shouldClipOnToggle={() => {
                    dispatch(shouldClipMaskLayerToggled());
                }}
                opacityOnChange={(val) => {
                    dispatch(maskLayerOpacityChanged(val));
                }}
            />
        </div>
    );
};
