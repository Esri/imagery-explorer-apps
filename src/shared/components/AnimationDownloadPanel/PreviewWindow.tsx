import React, { FC, useMemo } from 'react';

export type Dimension = {
    width: number;
    height: number;
};

type Props = {
    /**
     * dimension of the preview window
     */
    previewWindowSize: Dimension;
    /**
     * dimension of the map view window
     */
    mapViewWindowSize: Dimension;
};

/**
 * Preview Window component helps user to visually see the portion of animation that will be included in the output mp4 file
 * @param param0
 * @returns
 */
export const PreviewWindow: FC<Props> = ({
    previewWindowSize,
    mapViewWindowSize,
}) => {
    /**
     * useMemo Hook for Adjusting Window Size
     *
     * This `useMemo` hook adjusts the size of a preview window (represented by the `size` variable)
     * to make sure it can fit within the preview window (represented by the `mapViewWindowSize` variable).
     *
     * @param {WindowSize} size - The original size of the preview window to be adjusted.
     * @param {WindowSize} mapViewWindowSize - The size of the map view window.
     * @returns {WindowSize | null} - The adjusted window size, or null if `size` is falsy.
     */
    const adjustedSize: Dimension = useMemo(() => {
        if (!previewWindowSize) {
            return null;
        }

        // Calculate the aspect ratio of the user selected output size size.
        const aspectRatio = previewWindowSize.width / previewWindowSize.height;

        if (mapViewWindowSize.height > mapViewWindowSize.width) {
            return {
                width: mapViewWindowSize.width,
                height: mapViewWindowSize.width * (1 / aspectRatio),
            };
        }

        return {
            height: mapViewWindowSize.height,
            width: mapViewWindowSize.height * aspectRatio,
        };
    }, [previewWindowSize]);

    if (!adjustedSize) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div
                style={{
                    width: adjustedSize.width,
                    height: adjustedSize.height,
                    boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.8)`,
                }}
            ></div>
        </div>
    );
};
