import React, { FC, useEffect, useRef, useState } from 'react';
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
import { DownloadJobStatusInfo } from './DownloadJobStatus';
import { CloseButton } from '../CloseButton';
import { useDispatch } from 'react-redux';
import { showDownloadAnimationPanelChanged } from '@shared/store/UI/reducer';
import { selectMapCenter } from '@shared/store/Map/selectors';
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

/**
 * status of job to download animation as MP4
 */
export type DownloadJobStatus = 'pending' | 'finished' | 'cancelled' | 'failed';

export const AnimationDownloadPanel: FC<Props> = ({
    mediaLayerElements,
    queryParams4ScenesInAnimationMode,
    animationSpeed,
    mapViewWindowSize,
}) => {
    const dispatch = useDispatch();

    const shouldShowDownloadPanel = useSelector(
        selectShouldShowDownloadAnimationPanel
    );

    const mapCenter = useSelector(selectMapCenter);

    const [previewWindowSize, setPreviewWindowSize] = useState<Dimension>(null);

    const [downloadJobStatus, setDownloadJobStatus] =
        useState<DownloadJobStatus>(null);

    const abortController = useRef<AbortController>();

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
                footer: `Esri Landsat Explorer  |  ${
                    queryParams.acquisitionDate
                }  |  x ${mapCenter[0].toFixed(3)} y ${mapCenter[1].toFixed(
                    3
                )}  |  Esri, USGS, NASA`,
            } as AnimationFrameData;
        });

        setDownloadJobStatus('pending');

        const { width, height } = outputVideoDimension;

        try {
            if (abortController.current) {
                abortController.current.abort();
            }

            abortController.current = new AbortController();

            const { filename, fileContent } = await createVideoViaImages2Video({
                data,
                animationSpeed,
                outputWidth: width,
                outputHeight: height,
                sourceImageHeight: mapViewWindowSize.height,
                sourceImageWidth: mapViewWindowSize.width,
                abortController: abortController.current,
            });

            downloadBlob(fileContent, filename);

            setDownloadJobStatus('finished');
        } catch (err) {
            console.log(err);

            // no need to set status to failed if error
            // is caused by the user aborting the pending job
            if (err.name === 'AbortError') {
                return;
            }

            setDownloadJobStatus('failed');
        }
    };

    useEffect(() => {
        if (!shouldShowDownloadPanel) {
            setPreviewWindowSize(null);
            setDownloadJobStatus(null);

            if (abortController.current) {
                abortController.current.abort();
            }
        }
    }, [shouldShowDownloadPanel]);

    if (!mediaLayerElements || !mediaLayerElements.length) {
        return null;
    }

    return (
        <>
            <div className="absolute top-0 right-0 text-custom-light-blue z-10">
                {downloadJobStatus !== null && (
                    <DownloadJobStatusInfo
                        status={downloadJobStatus}
                        cancelButtonOnClick={() => {
                            // close animation download panel will also cancel any
                            // pending tasks
                            dispatch(showDownloadAnimationPanelChanged(false));
                        }}
                        closeButtonOnClick={() => {
                            dispatch(showDownloadAnimationPanelChanged(false));
                        }}
                    />
                )}

                {shouldShowDownloadPanel && downloadJobStatus === null && (
                    <>
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

                        <CloseButton
                            onClick={() => {
                                dispatch(
                                    showDownloadAnimationPanelChanged(false)
                                );
                            }}
                        />
                    </>
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
