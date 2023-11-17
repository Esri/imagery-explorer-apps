import { AnimationFrameData } from '.';
import { getFileName, getImageBlob } from './helpers';

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

type CreateVideoViaImages2VideoResponse = {
    /**
     * name of the output .mp4 file
     */
    filename: string;
    /**
     * content of the output .mp4 file
     */
    fileContent: Blob;
};

// const IMAGES_2_VIDEO_API_ROOT_URL = 'http://localhost:3000';
const IMAGES_2_VIDEO_API_ROOT_URL =
    'https://imagery-animation-dev.westus2.cloudapp.azure.com';

/**
 * check the status of a pending video encoding job.
 * @param jobId
 * @param abortController
 * @returns
 */
const checkJobStatus = async (
    jobId: string,
    abortController: AbortController
): Promise<boolean> => {
    const maxRetries = 5;

    let retries = 0;

    const jobStatusRequestURL = `${IMAGES_2_VIDEO_API_ROOT_URL}/api/job/${jobId}/status`;

    return new Promise((resolve, reject) => {
        const fetchJobStatus = async () => {
            try {
                const res = await fetch(jobStatusRequestURL, {
                    signal: abortController.signal,
                });

                if (res.ok) {
                    return resolve(true);
                }

                if (retries < maxRetries) {
                    retries++;
                    fetchJobStatus();
                } else {
                    reject();
                }
            } catch (err) {
                reject(err);
            }
        };

        fetchJobStatus();
    });
};

const fetchOutputMP4File = async (
    jobId: string,
    abortController: AbortController
): Promise<Blob> => {
    const outputMP4FileURL = `${IMAGES_2_VIDEO_API_ROOT_URL}/video/${jobId}.mp4`;

    const res = await fetch(outputMP4FileURL, {
        signal: abortController.signal,
    });

    const body = await res.blob();

    return body;
};

/**
 * Create a new job that encodes a MP4 video from images in the input data
 * @param param0
 * @returns
 */
export const createVideoViaImages2Video = async ({
    data,
    animationSpeed,
    outputWidth,
    outputHeight,
    sourceImageWidth,
    sourceImageHeight,
    abortController,
}: Props): Promise<CreateVideoViaImages2VideoResponse> => {
    const OUTPUT_CONTENT_TYPE = 'image/jpeg';

    const formdata = new FormData();

    let framerate = 60;

    if (animationSpeed) {
        framerate = 1000 / animationSpeed;
    }

    formdata.append('framerate', framerate.toString());

    for (let i = 0; i < data.length; i++) {
        const { image, footer } = data[i];

        const blob = await getImageBlob({
            image,
            footer,
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

    // wait after video encoding job is done
    await checkJobStatus(jobId, abortController);

    const blobOfOutputMP4 = await fetchOutputMP4File(jobId, abortController);

    return {
        filename: jobId + '.mp4',
        fileContent: blobOfOutputMP4,
    };
};
