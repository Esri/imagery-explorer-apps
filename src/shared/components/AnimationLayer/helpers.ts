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

export const loadImage = async (
    imageURL: string
): Promise<HTMLImageElement> => {
    const image = new Image();
    image.src = imageURL;

    return new Promise((resolve) => {
        image.onload = () => {
            resolve(image);
        };
    });
};

export const createVideoViaMediaRecorder = async ({
    mediaLayerElements,
    animationSpeed,
    width,
    height,
}: Props): Promise<Blob> => {
    // load media layer elements as an array of HTML Image Elements
    const images = await Promise.all(
        mediaLayerElements.map((elem) => loadImage(elem.image as string))
    );

    return new Promise((resolve, reject) => {
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

        // return blob once media recorder stops recording
        mediaRecorder.addEventListener('stop', () => {
            // downloadBlob(new Blob(chunks, { type: 'video/webm' }), 'output.webm');
            resolve(new Blob(chunks, { type: 'video/webm' }));
        });

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
    });
};
