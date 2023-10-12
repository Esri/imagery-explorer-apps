import React, { FC, useEffect, useState } from 'react';
import IImageElement from 'esri/layers/support/ImageElement';

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

const createVideoFile = ({
    mediaLayerElements,
    animationSpeed,
    width,
    height,
}: Props) => {
    console.log('calling createVideoFile');

    const canvas = document.createElement('canvas') as any;
    canvas.width = width;
    canvas.height = height;

    const canvasStream = canvas.captureStream(30); // frames per second
    // console.log('Started stream capture from canvas element: ', stream);

    const chunks: Blob[] = [];

    const mediaRecorder = new MediaRecorder(canvasStream, {
        mimeType: 'video/webm',
    });

    // Record data in chunks array when data is available
    mediaRecorder.ondataavailable = (evt: any) => {
        chunks.push(evt.data);
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'test.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    };

    const ANIMATION_SPEED = 1000;

    const BACKGROUND_COLORS = [
        'lightblue',
        'lightpink',
        'lightgreen',
        'LightSalmon',
        'Lavender',
    ];

    let currNum = 0;

    let timeLastFrameWasRendered = performance.now();

    const animate = () => {
        if (performance.now() - timeLastFrameWasRendered < ANIMATION_SPEED) {
            requestAnimationFrame(animate);
            return;
        }

        timeLastFrameWasRendered = performance.now();

        const context = canvas.getContext('2d');

        // Clear the entire canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Set the background color
        const backgroundColor =
            BACKGROUND_COLORS[currNum % BACKGROUND_COLORS.length];
        context.fillStyle = backgroundColor; // Replace 'lightblue' with your desired color
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Define the text properties
        const text = currNum.toString();
        const fontSize = 50;
        const fontFamily = 'Arial';
        const x = 100; // X-coordinate
        const y = 100; // Y-coordinate

        // Set the text font style
        context.font = fontSize + 'px ' + fontFamily;

        // Set the text color
        context.fillStyle = 'black';

        // Add the text to the canvas at the specified coordinates
        context.fillText(text, x, y);

        currNum = (currNum + 1) % 10;

        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    mediaRecorder.start();

    setTimeout(() => {
        mediaRecorder.stop();
    }, 1000 * 10);
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

        createVideoFile({
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
            className="absolute bottom-4 right-0 w-40 h-40 text-white"
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
