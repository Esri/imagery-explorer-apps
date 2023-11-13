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
};

const IMAGES_2_VIDEO_API_ROOT_URL = 'http://localhost:3000';

export const createVideoViaImages2Video = async ({
    data,
    animationSpeed,
    outputWidth,
    outputHeight,
    sourceImageWidth,
    sourceImageHeight,
}: Props) => {
    const OUTPUT_CONTENT_TYPE = 'image/jpeg';

    const formdata = new FormData();

    formdata.append('framerate', '1');

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

    const res = await fetch(IMAGES_2_VIDEO_API_ROOT_URL + '/images-to-video', {
        method: 'POST',
        body: formdata,
    });

    const resBody = await res.json();

    console.log(resBody);
};
