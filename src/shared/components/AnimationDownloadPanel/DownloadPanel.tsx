import React, { FC, useEffect, useState } from 'react';
import IImageElement from '@arcgis/core/layers/support/ImageElement';
import { downloadBlob } from '@shared/utils/snippets/downloadBlob';
import { QueryParams4ImageryScene } from '@shared/store/Landsat/reducer';
import { loadImageAsHTMLIMageElement } from '@shared/utils/snippets/loadImage';
// import { createVideoViaMediaRecorder } from '@shared/utils/video-encoder/createVideoViaMediaRecorder';
import { AnimationFrameData } from '@shared/utils/video-encoder';
// import { createVideoViaFFMPEG } from '@shared/utils/video-encoder/createVideoViaFFMPEG';
import { DownloadOptionsList } from './DownloadOptionsList';
import classNames from 'classnames';
import { Dimension, PreviewWindow } from './PreviewWindow';
import { createVideoViaImages2Video } from '@shared/utils/video-encoder/createVideoViaImages2Video';
import { useSelector } from 'react-redux';
import { selectShouldShowDownloadAnimationPanel } from '@shared/store/UI/selectors';
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
     * size of the map view window
     */
    mapViewWindowSize: Dimension;
};

export const AnimationDownloadPanel: FC<Props> = ({
    mediaLayerElements,
    queryParams4ScenesInAnimationMode,
    animationSpeed,
    mapViewWindowSize,
}) => {
    const shouldShowDownloadPanel = useSelector(
        selectShouldShowDownloadAnimationPanel
    );

    const [previewWindowSize, setPreviewWindowSize] = useState<Dimension>();

    const [inProgressOfEncodingVideoFile, setInProgressOfEncodingVideoFile] =
        useState<boolean>();

    const downloadAnimation = async (outputVideoDimension: Dimension) => {
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

        setInProgressOfEncodingVideoFile(true);

        const { width, height } = outputVideoDimension;

        try {
            // const blobOfEncodedVideo = await createVideoViaFFMPEG({
            //     data,
            //     animationSpeed,
            //     width,
            //     height,
            //     widthOfOriginalAnimationFrame: mapViewWindowSize.width,
            //     heightOfOriginalAnimationFrame: mapViewWindowSize.height,
            // });

            // downloadBlob(blobOfEncodedVideo, 'output.mp4');

            const blobOfOutputMP4 = await createVideoViaImages2Video({
                data,
                animationSpeed,
                outputWidth: width,
                outputHeight: height,
                sourceImageHeight: mapViewWindowSize.height,
                sourceImageWidth: mapViewWindowSize.width,
            });

            downloadBlob(blobOfOutputMP4, 'output.mp4');
        } catch (err) {
            console.log(err);
        }

        setInProgressOfEncodingVideoFile(false);
    };

    if (!mediaLayerElements || !mediaLayerElements.length) {
        return null;
    }

    return (
        <>
            <div className="absolute top-0 right-0 w-48 text-white text-center">
                {/* <div className="absolute top-1 right-16 cursor-pointer z-10">
                    {inProgressOfEncodingVideoFile ? (
                        <div className="absolute top-0 right-0 w-16 h-16 flex justify-center items-center">
                            <calcite-loader scale="s" style={{ padding: 0 }} />
                        </div>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            height="64"
                            width="64"
                        >
                            <path
                                fill="currentColor"
                                d="M25 27H8v-1h17zm-3.646-9.646l-.707-.707L17 20.293V5h-1v15.293l-3.646-3.646-.707.707 4.853 4.853z"
                            />
                            <path fill="none" d="M0 0h32v32H0z" />
                        </svg>
                    )}
                </div> */}

                {shouldShowDownloadPanel && (
                    <div
                        className={classNames(
                            'absolute top-0 right-0 w-48 pt-16 z-10',
                            'theme-background'
                        )}
                    >
                        <DownloadOptionsList
                            onMouseEnter={(size) => {
                                if (!size) {
                                    return;
                                }

                                const [width, height] = size;

                                setPreviewWindowSize({
                                    width,
                                    height,
                                });
                                // console.log(size);
                            }}
                            onMouseLeave={setPreviewWindowSize.bind(null, null)}
                            onClick={(size) => {
                                if (!size) {
                                    return;
                                }

                                const [width, height] = size;

                                downloadAnimation({
                                    width,
                                    height,
                                });
                            }}
                        />
                    </div>
                )}
            </div>

            {previewWindowSize && (
                <PreviewWindow
                    previewWindowSize={previewWindowSize}
                    mapViewWindowSize={mapViewWindowSize}
                />
            )}
        </>
    );
};
