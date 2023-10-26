import { AnimationFrameData } from '.';

type Props = {
    /**
     * array of animation frame data to be used to create video file
     */
    data: AnimationFrameData[];
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
    /**
     * width of the original animation frame image that will be used to encode the output video file
     */
    widthOfOriginalAnimationFrame: number;
    /**
     * height of the original animation frame image that will be used to encode the output video file
     */
    heightOfOriginalAnimationFrame: number;
};

/**
 * Generates an image name with leading zero padding to ensure a consistent
 * file name length. If the length of the file name is shorter than the input
 * length, it adds padding zeros to the left of the index.
 *
 * @param index - The index or identifier for the image.
 * @param length - The desired length of the output name.
 * @param extension - The desired extension of the output file name.
 *
 * @returns The formatted image name as a string.
 *
 * @example
 * ```js
 * getName4OutputMEMFS(0, 3, 'jpeg') // returns `000.jpeg`
 * ```
 */
const getName4OutputMEMFS = (
    index: number,
    length: number,
    extension: string
) => {
    let name = index.toString();

    while (name.length < length) {
        name = '0' + name;
    }

    return name + '.' + extension;
};

/**
 * This function converts an `AnimationFrameData` object into a MEMFS object,
 * which is the format expected by `FFMPEG.js` for processing. It takes an image,
 * resizes it to specified dimensions, converts it to a JPEG blob, and then
 * creates a MEMFS object containing the image data.
 *
 * @param data - The `AnimationFrameData` object representing the input image.
 * @param outputName - The name to assign to the resulting MEMFS object.
 * @param height - The height of the input image.
 * @param width - The width of the input image.
 * @returns A Promise that resolves to a MEMFS object containing the image data.
 */
const getImageAsMEMFS = async (params: {
    data: AnimationFrameData;
    outputName: string;
    height: number;
    width: number;
    widthOfOriginalAnimationFrame: number;
    heightOfOriginalAnimationFrame: number;
}) => {
    const {
        data,
        outputName,
        height,
        width,
        widthOfOriginalAnimationFrame,
        heightOfOriginalAnimationFrame,
    } = params;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    // let adjustedWidth = widthOfOriginalAnimationFrame;
    // let adjustedHeight = heightOfOriginalAnimationFrame;

    // // need to update adjusted width and height so the original animation frames can be stretched to fit into the canvas
    // if(widthOfOriginalAnimationFrame < width || heightOfOriginalAnimationFrame < height){

    // }

    // const dx = (adjustedWidth - canvas.width) / 2;
    // const dy = (adjustedHeight - canvas.height) / 2;

    context.drawImage(data.image, 0, 0, canvas.width, canvas.height);

    // Export the canvas content as a JPEG blob.
    const blob: Blob = await new Promise((resolveBlob, rejectBlob) => {
        canvas.toBlob(resolveBlob, 'image/jpeg');
    });

    const arrayBuffer = await blob.arrayBuffer();

    return {
        name: outputName,
        data: arrayBuffer,
    };
};

/**
 * make a video (in MP4 format) using FFMPEG
 * @param param0
 * @returns
 */
export const createVideoViaFFMPEG = async ({
    data,
    animationSpeed,
    width,
    height,
    widthOfOriginalAnimationFrame,
    heightOfOriginalAnimationFrame,
}: Props): Promise<Blob> => {
    const inputImages = await Promise.all(
        data.map((d, index) => {
            const name = getName4OutputMEMFS(index, 3, 'jpeg');
            return getImageAsMEMFS({
                data: d,
                outputName: name,
                height,
                width,
                widthOfOriginalAnimationFrame,
                heightOfOriginalAnimationFrame,
            });
        })
    );
    // console.log(inputImages)

    const worker = new Worker('./public/lib/ffmpeg-worker-mp4-v3.1.9001.js');

    return new Promise((resolve, reject) => {
        worker.onmessage = function (e) {
            const msg = e.data;
            let blob: Blob = null;
            switch (msg.type) {
                case 'stdout':
                case 'stderr':
                    console.log('stderr' + msg.data);
                    break;
                case 'exit':
                    console.log('Process exited with code ' + msg.data);
                    //worker.terminate();
                    break;
                case 'done':
                    blob = new Blob([msg.data.MEMFS[0].data], {
                        type: 'video/mp4',
                    });

                    resolve(blob);
                    break;
            }
        };

        worker.postMessage({
            type: 'run',
            TOTAL_MEMORY: 16e8, // 16G
            // ALLOW_MEMORY_GROWTH: 1,
            arguments: [
                '-r',
                '1',
                '-i',
                '%03d.jpeg',
                '-c:v',
                'libx264',
                '-r',
                '16',
                'out.mp4',
            ],
            MEMFS: inputImages,
        });
    });
};