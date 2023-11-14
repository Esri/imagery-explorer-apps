import { AnimationFrameData } from '.';
import { getFileName, getImageBlob, delay } from './helpers';

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
    outputWidth: number;
    /**
     * height of the output video file
     */
    outputHeight: number;
    /**
     * width of the original animation frame image that will be used to encode the output video file
     */
    sourceImageWidth: number;
    /**
     * height of the original animation frame image that will be used to encode the output video file
     */
    sourceImageHeight: number;
    /**
     * abort controller to cancel pending job
     */
    abortController: AbortController;
};

type CreateImages2VideoJobResponse = {
    jobId: string;
};

const IMAGES_2_VIDEO_API_ROOT_URL = 'http://localhost:3000';

const getOutputMP4File = async (
    jobId: string,
    abortController: AbortController
): Promise<Blob> => {
    let numOfTries = 0;

    const outputMP4FileURL = `${IMAGES_2_VIDEO_API_ROOT_URL}/video/${jobId}.mp4`;

    return new Promise((resolve, reject) => {
        const fetchData = async () => {
            // throw an error if the output video is not ready
            // after 24 attempts
            if (numOfTries > 24) {
                reject();
                return;
            }

            numOfTries++;

            // wait for 5 seconds before sending out the request
            await delay(5000);

            try {
                const res = await fetch(outputMP4FileURL, {
                    signal: abortController.signal,
                });

                if (!res.ok) {
                    fetchData();
                    return;
                }

                const body = await res.blob();
                resolve(body);
            } catch (err) {
                reject(err);
            }
        };

        fetchData();
    });
};

export const createVideoViaImages2Video = async ({
    data,
    animationSpeed,
    outputWidth,
    outputHeight,
    sourceImageWidth,
    sourceImageHeight,
    abortController,
}: Props) => {
    const OUTPUT_CONTENT_TYPE = 'image/jpeg';

    const formdata = new FormData();

    let framerate = 60;

    if (animationSpeed) {
        framerate = 1000 / animationSpeed;
    }

    formdata.append('framerate', framerate.toString());

    for (let i = 0; i < data.length; i++) {
        const { image } = data[i];

        const blob = await getImageBlob({
            image: image,
            outputContentType: OUTPUT_CONTENT_TYPE,
            outputHeight,
            outputWidth,
            sourceImageWidth,
            sourceImageHeight,
        });

        const file = new File([blob], getFileName(i, 3, 'jpeg'), {
            type: OUTPUT_CONTENT_TYPE,
        });

        formdata.append('images', file);
    }

    const res = await fetch(
        IMAGES_2_VIDEO_API_ROOT_URL + '/api/images-to-video',
        {
            method: 'POST',
            body: formdata,
        }
    );

    if (!res.ok) {
        throw new Error('failed to create new images-to-video task');
    }

    const { jobId } = (await res.json()) as CreateImages2VideoJobResponse;

    const blobOfOutputMP4 = await getOutputMP4File(jobId, abortController);

    return blobOfOutputMP4;
};
