import { AnimationFrameData } from '.';
import { loadImageAsMEMFS } from '../snippets/loadImage';

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
};

const getImageFileNameByIndex = (index: number) => {
    let name = index.toString();

    while (name.length < 3) {
        name = '0' + name;
    }

    return 'img' + name + '.jpeg';
};

/**
 * get array of input image files as MEMFS
 */
const fetchImageFiles = async (data: AnimationFrameData[]) => {
    const res = await Promise.all(
        data.map((animationFrameData, index) => {
            const name = getImageFileNameByIndex(index);
            console.log(name);
            return loadImageAsMEMFS(animationFrameData.image.src, name);
        })
    );

    return res;
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
}: Props): Promise<Blob> => {
    const inputImages = await fetchImageFiles(data);
    console.log(inputImages);

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
            TOTAL_MEMORY: 4e8, // 16G
            // ALLOW_MEMORY_GROWTH: 1,
            arguments: ['-r', '1', '-i', 'img%03d.jpeg', '-r', '16', 'out.mp4'],
            MEMFS: inputImages,
        });
    });
};
