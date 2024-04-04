/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC, useEffect, useRef, useState } from 'react';
import IImageElement from '@arcgis/core/layers/support/ImageElement';
import { downloadBlob } from '@shared/utils/snippets/downloadBlob';
// import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { loadImageAsHTMLIMageElement } from '@shared/utils/snippets/loadImage';
import { DownloadOptionsList } from './DownloadOptionsList';
import { Dimension, PreviewWindow } from './PreviewWindow';
import { useSelector } from 'react-redux';
import { selectShouldShowDownloadAnimationPanel } from '@shared/store/UI/selectors';
import { DownloadJobStatusInfo } from './DownloadJobStatus';
import { CloseButton } from '../CloseButton';
import { useDispatch } from 'react-redux';
import { showDownloadAnimationPanelChanged } from '@shared/store/UI/reducer';
// import { selectMapCenter } from '@shared/store/Map/selectors';
import { OpenDownloadPanelButton } from './OpenDownloadPanelButton';
import { appConfig } from '@shared/config';
import {
    convertImages2Video,
    AnimationFrameData,
} from '@vannizhang/images-to-video-converter-client';
import { CopyLinkButton } from './CopyLinkButton';
import { CopiedLinkMessage } from './CopiedLinkMessage';

// /**
//  * This object contains the data for each animation frame.
//  */
// export type AnimationFrameData4DownloadJob = {
//     /**
//      * The image element representing the median layer for this frame.
//      */
//     mediaLayerElement: IImageElement;
//     /**
//      * Additional information about this frame.
//      */
//     info: string;
// };

type Props = {
    /**
     * An array containing data representing the animation frames.
     */
    frameData4DownloadJob: AnimationFrameData[];
    /**
     * animation speed in millisecond
     */
    animationSpeed: number;
    /**
     * size of the map view window
     */
    mapViewWindowSize: Dimension;
    /**
     * name of the app/service to be added as prefix to the filename of the output .mp4 file
     */
    authoringAppName?: string;
};

/**
 * status of job to download animation as MP4
 */
export type DownloadJobStatus = 'pending' | 'finished' | 'cancelled' | 'failed';

export const AnimationDownloadPanel: FC<Props> = ({
    frameData4DownloadJob,
    animationSpeed,
    mapViewWindowSize,
    authoringAppName,
}) => {
    const dispatch = useDispatch();

    const shouldShowDownloadPanel = useSelector(
        selectShouldShowDownloadAnimationPanel
    );

    const [previewWindowSize, setPreviewWindowSize] = useState<Dimension>(null);

    const [downloadJobStatus, setDownloadJobStatus] =
        useState<DownloadJobStatus>(null);

    const abortController = useRef<AbortController>();

    const downloadAnimation = async (outputVideoDimension: Dimension) => {
        // // load media layer elements as an array of HTML Image Elements
        // const images = await Promise.all(
        //     frameData4DownloadJob.map((d) =>
        //         loadImageAsHTMLIMageElement(d.mediaLayerElement.image as string)
        //     )
        // );

        // const data: AnimationFrameData[] = images.map((image, index) => {
        //     // const queryParams = queryParams4ScenesInAnimationMode[index];

        //     return {
        //         image,
        //         imageInfo: frameData4DownloadJob[index].info,
        //     } as AnimationFrameData;
        // });

        setDownloadJobStatus('pending');

        const { width, height } = outputVideoDimension;

        try {
            if (abortController.current) {
                abortController.current.abort();
            }

            abortController.current = new AbortController();

            const { filename, fileContent } = await convertImages2Video({
                data: frameData4DownloadJob,
                animationSpeed,
                outputWidth: width,
                outputHeight: height,
                authoringApp: appConfig.title,
                abortController: abortController.current,
            });

            const outputFileName = authoringAppName
                ? `${authoringAppName}-animation-${filename}`
                : filename;

            downloadBlob(fileContent, outputFileName);

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

    if (!frameData4DownloadJob || !frameData4DownloadJob?.length) {
        return null;
    }

    return (
        <>
            <div className="absolute top-0 right-0 text-custom-light-blue z-10">
                {/* Download Button that opens the Download Animation Panel */}
                {shouldShowDownloadPanel === false && (
                    <>
                        <OpenDownloadPanelButton />
                        <CopyLinkButton />
                        <CopiedLinkMessage />
                    </>
                )}

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
