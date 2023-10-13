import React, { FC, useEffect, useState } from 'react';
import IImageElement from 'esri/layers/support/ImageElement';
import { downloadBlob } from '@shared/utils/snippets/downloadBlob';

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

const loadImage = async (imageURL: string): Promise<HTMLImageElement> => {
    const image = new Image();
    image.src = imageURL;

    return new Promise((resolve) => {
        image.onload = () => {
            resolve(image);
        };
    });
};

const createVideoViaMediaRecorder = async ({
    mediaLayerElements,
    animationSpeed,
    width,
    height,
}: Props) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    const canvasStream = canvas.captureStream(30); // frames per second
    // console.log('Started stream capture from canvas element: ', stream);

    const chunks: Blob[] = [];

    const mediaRecorder = new MediaRecorder(canvasStream, {
        mimeType: 'video/webm',
        /**
         * use 40000000 for 4K video
         * @see https://stackoverflow.com/questions/65800159/how-do-you-determine-bitspersecond-for-media-recording
         */
        bitsPerSecond: 40000000,
    });

    // Record data in chunks array when data is available
    mediaRecorder.addEventListener('dataavailable', (evt: BlobEvent) => {
        chunks.push(evt.data);
    });

    // save blob on media recorder stops recording
    mediaRecorder.addEventListener('stop', () => {
        downloadBlob(new Blob(chunks, { type: 'video/webm' }), 'output.webm');
    });

    // load media layer elements as an array of HTML Image Elements
    const images = await Promise.all(
        mediaLayerElements.map((elem) => loadImage(elem.image as string))
    );
    // console.log(images)

    let indexOfCurrFrame = 0;

    let timeLastFrameWasRendered: number = null;

    const animate = () => {
        if (
            timeLastFrameWasRendered !== null &&
            performance.now() - timeLastFrameWasRendered < animationSpeed
        ) {
            requestAnimationFrame(animate);
            return;
        }

        // no more frames to add, stop recording
        if (indexOfCurrFrame === images.length) {
            mediaRecorder.stop();
            return;
        }

        timeLastFrameWasRendered = performance.now();

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(
            images[indexOfCurrFrame],
            0,
            0,
            canvas.width,
            canvas.height
        );

        indexOfCurrFrame = indexOfCurrFrame + 1;

        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    mediaRecorder.start();
};

export const DownloadAnimationControl: FC<Props> = ({
    mediaLayerElements,
    animationSpeed,
    width,
    height,
}) => {
    const [isDownloading, setIsDownloading] = useState<boolean>(false);

    useEffect(() => {
        if (!isDownloading) {
            return;
        }

        createVideoViaMediaRecorder({
            mediaLayerElements,
            animationSpeed,
            width,
            height,
        });

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
