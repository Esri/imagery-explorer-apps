import './ScreenshotEffect.css';
import classNames from 'classnames';
import MapView from '@arcgis/core/views/MapView';
import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { MapActionButton } from '../MapActionButton/MapActionButton';
import { downloadBlob } from '@shared/utils/snippets/downloadBlob';
import { imageDataToBlob } from '@shared/utils/snippets/imageData2Blob';
import { delay } from '@shared/utils/snippets/delay';

type Props = {
    mapView?: MapView;
};

export const ScreenshotWidget: FC<Props> = ({ mapView }) => {
    const [isCapturingScreenshot, setIsCapturingScreenshot] =
        useState<boolean>(false);

    const disabled = useMemo(() => {
        if (isCapturingScreenshot) {
            return true;
        }

        return false;
    }, [isCapturingScreenshot]);

    const onClickHandler = () => {
        (async () => {
            setIsCapturingScreenshot(true);

            await delay(2000);

            const screenshot = await mapView.takeScreenshot();

            const blob = await imageDataToBlob(screenshot.data);

            downloadBlob(blob, 'snapshot.png');

            setIsCapturingScreenshot(false);
        })();
    };

    return (
        <>
            <MapActionButton
                topPosition={200}
                showLoadingIndicator={isCapturingScreenshot}
                tooltip="Save this map view as an image"
                disabled={disabled}
                onClickHandler={onClickHandler}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height={24}
                    width={24}
                >
                    <path
                        fill="currentColor"
                        d="M14.5 17a4.5 4.5 0 1 0-4.5-4.5 4.505 4.505 0 0 0 4.5 4.5zm0-8a3.5 3.5 0 1 1-3.5 3.5A3.504 3.504 0 0 1 14.5 9zM8 9H4V8h4zm4 10.999V19h9a1.001 1.001 0 0 0 1-1V8a1.001 1.001 0 0 0-1-1h-1.5A1.502 1.502 0 0 1 18 5.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5A1.502 1.502 0 0 1 9.5 7H7V6H5v1H3a1.001 1.001 0 0 0-1 1v8H1V8a2.002 2.002 0 0 1 2-2h1V5h4v1h1.5a.5.5 0 0 0 .5-.5A1.502 1.502 0 0 1 11.5 4h6A1.502 1.502 0 0 1 19 5.5a.5.5 0 0 0 .5.5H21a2.002 2.002 0 0 1 2 2v10a2.002 2.002 0 0 1-2 2zM6 23H5v-4.001H1V18h4v-4h1v4h4v.999H6z"
                    />
                    <path fill="none" d="M0 0h24v24H0z" />
                </svg>
            </MapActionButton>

            {isCapturingScreenshot && (
                <div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none screenshot-effect"></div>
            )}
        </>
    );
};
