import React, { FC, useEffect, useState } from 'react';
import IImageElement from 'esri/layers/support/ImageElement';
import { downloadBlob } from '@shared/utils/snippets/downloadBlob';
import { QueryParams4ImageryScene } from '@shared/store/Landsat/reducer';
import { loadImageAsHTMLIMageElement } from '@shared/utils/snippets/loadImage';
import { createVideoViaMediaRecorder } from '@shared/utils/video-encoder/createVideoViaMediaRecorder';
import { AnimationFrameData } from '@shared/utils/video-encoder';
import { createVideoViaFFMPEG } from '@shared/utils/video-encoder/createVideoViaFFMPEG';

type Props = {
    /**
     * array of image elements to be used to create video file
     */
    mediaLayerElements: IImageElement[];
    /**
     * array of query params corresponding to each element in media layer elements array.
     * it provides info that can be used to add text for each frame in the output animation.
     */
    queryParams4ScenesInAnimationMode: QueryParams4ImageryScene[];
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
    queryParams4ScenesInAnimationMode,
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

            // load media layer elements as an array of HTML Image Elements
            const images = await Promise.all(
                mediaLayerElements.map((elem) =>
                    loadImageAsHTMLIMageElement(elem.image as string)
                )
            );

            const data: AnimationFrameData[] = images.map((image, index) => {
                const queryParams = queryParams4ScenesInAnimationMode[index];

                return {
                    image,
                    textLabel: {
                        text: queryParams.acquisitionDate,
                        fontSize: 36,
                    },
                } as AnimationFrameData;
            });

            // const blobOfEncodedVideo = await createVideoViaMediaRecorder({
            //     data,
            //     animationSpeed,
            //     width,
            //     height,
            // });

            // downloadBlob(blobOfEncodedVideo, 'output.webm');

            const blobOfEncodedVideo = await createVideoViaFFMPEG({
                data,
                animationSpeed,
                width,
                height,
            });

            downloadBlob(blobOfEncodedVideo, 'output.mp4');

            setIsDownloading(false);
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
                <div className="absolute bottom-0 right-8">
                    <calcite-loader scale="s"></calcite-loader>
                </div>
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
