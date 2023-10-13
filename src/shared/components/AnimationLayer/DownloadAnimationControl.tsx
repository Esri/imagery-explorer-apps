import React, { FC, useEffect, useState } from 'react';
import IImageElement from 'esri/layers/support/ImageElement';
import { downloadBlob } from '@shared/utils/snippets/downloadBlob';
import { createVideoViaMediaRecorder } from './helpers';

type Props = {
    /**
     * array of image elements to be used to create video file
     */
    mediaLayerElements: IImageElement[];
    /**
     * animation speed in millisecond
     */
    animationSpeed: number;
    /**
     * width of the output video file
     */
    width: number;
    /**
     * height of the output video file
     */
    height: number;
};

export const DownloadAnimationControl: FC<Props> = ({
    mediaLayerElements,
    animationSpeed,
    width,
    height,
}) => {
    const [isDownloading, setIsDownloading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (!isDownloading) {
                return;
            }

            const outputVideo = await createVideoViaMediaRecorder({
                mediaLayerElements,
                animationSpeed,
                width,
                height,
            });

            downloadBlob(outputVideo, 'output.webm');
        })();
        // start making video file and downloading it
    }, [isDownloading]);

    if (!mediaLayerElements || !mediaLayerElements.length) {
        return null;
    }

    return (
        <div
            className="absolute bottom-4 right-0 w-40 h-40 text-white text-center"
            style={{
                background: `linear-gradient(300deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)`,
            }}
        >
            {isDownloading ? (
                <calcite-loader></calcite-loader>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    height="64"
                    width="64"
                    className="absolute bottom-1 right-1 cursor-pointer"
                    onClick={setIsDownloading.bind(null, true)}
                >
                    <path
                        fill="currentColor"
                        d="M25 27H8v-1h17zm-3.646-9.646l-.707-.707L17 20.293V5h-1v15.293l-3.646-3.646-.707.707 4.853 4.853z"
                    />
                    <path fill="none" d="M0 0h32v32H0z" />
                </svg>
            )}
        </div>
    );
};
