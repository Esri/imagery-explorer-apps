/* Copyright 2025 Esri
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

import {
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
} from '@shared/store/LandcoverExplorer/selectors';
import {
    animationSpeedChanged,
    animationStatusChanged,
    showDownloadAnimationPanelChanged,
    showDownloadPanelToggled,
    showSaveWebMapPanelToggled,
} from '@shared/store/UI/reducer';
import {
    selectAnimationSpeed,
    selectAnimationStatus,
} from '@shared/store/UI/selectors';
import { copyAnimationLink } from '@shared/store/UI/thunks';
import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import { useTranslation } from 'react-i18next';
import { AnimationOptions } from './AnimationOptions';
import { OptionButton } from './OptionButton';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';

type AnimationAndExportControlsProps = {
    /**
     * If true, the download GeoTIFF button will be shown.
     */
    showDownloadGeoTIFFButton: boolean;
    /**
     * If true, the animation controls will be shown.
     */
    showAnimationControls: boolean;
    /**
     * Emits when the user clicks on the 'play animation' button.
     * @returns void
     */
    toggleAnimationControlsButtonOnClick: (showShow: boolean) => void;
};

type DefaultOptionsProps = {
    showDownloadGeoTIFFButton: boolean;
    startAnimationOnClick: () => void;
    donwloadButtonOnClick: () => void;
    saveWebmapButtonOnClick: () => void;
};

const DefaultOptions: FC<DefaultOptionsProps> = ({
    showDownloadGeoTIFFButton,
    startAnimationOnClick,
    donwloadButtonOnClick,
    saveWebmapButtonOnClick,
}) => {
    const { t } = useTranslation();

    const mode = useAppSelector(selectMapMode);

    // const animationMode = useAppSelector(selectAnimationStatus);

    const showSatelliteImageryLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    // const showStartAnimationButton = mode === 'step';

    const showStartAnimationButton = useMemo(() => {
        if (mode === 'swipe') {
            return false;
        }

        return true;
    }, [mode]);

    const showDownloadButton =
        showDownloadGeoTIFFButton && showSatelliteImageryLayer === false;

    const showPublishToArcGISButton = showSatelliteImageryLayer === false;

    // if (animationMode !== null) {
    //     return null;
    // }

    // // return a placeholder if no buttons are shown
    // // this is to avoid empty space in the UI when no buttons are available
    // if (
    //     !showDownloadButton &&
    //     !showStartAnimationButton &&
    //     !showPublishToArcGISButton
    // ) {
    //     return (
    //         <div className="h-[16px] w-full">
    //             {/* <span className='text-xs'>Save options are only enabled for Land Cover layer</span> */}
    //         </div>
    //     );
    // }

    return (
        <div className={classNames('flex items-center justify-around')}>
            {/* <div className='cursor-pointer flex items-center'
                onClick={donwloadButtonOnClick}
            >
                <calcite-icon icon="download-to" scale="s" />
                <span className='ml-1'>Download as GeoTIFF</span>
            </div> */}

            {showStartAnimationButton && (
                <OptionButton
                    label={t('start_animation')}
                    icon="play"
                    onClick={startAnimationOnClick}
                />
            )}

            {showDownloadButton && (
                <OptionButton
                    label={t('donwload_geotiff')}
                    icon="download-to"
                    onClick={donwloadButtonOnClick}
                />
            )}

            {/* <div className='cursor-pointer flex items-center' 
                onClick={saveWebmapButtonOnClick}
            >
                <calcite-icon icon="launch" scale="s" />
                <span className='ml-1'>Publish to ArcGIS</span>
            </div> */}

            {showPublishToArcGISButton && (
                <OptionButton
                    label={t('publish_to_arcgis')}
                    icon="launch"
                    onClick={saveWebmapButtonOnClick}
                />
            )}
        </div>
    );
};

export const AnimationAndExportControls: FC<
    AnimationAndExportControlsProps
> = ({
    showDownloadGeoTIFFButton,
    showAnimationControls,
    toggleAnimationControlsButtonOnClick,
}) => {
    const dispatch = useAppDispatch();

    const animationSpeed = useAppSelector(selectAnimationSpeed);

    if (IS_MOBILE_DEVICE) {
        return null;
    }

    return (
        <div className="w-full my-6 text-xs">
            {showAnimationControls ? (
                <AnimationOptions
                    animationSpeed={animationSpeed}
                    donwloadAnimationOnClick={() => {
                        dispatch(showDownloadAnimationPanelChanged(true));
                    }}
                    copyLinkOnClick={() => {
                        dispatch(copyAnimationLink());
                    }}
                    speedOnChange={(speed: number) => {
                        dispatch(animationSpeedChanged(speed));
                    }}
                    closeAnimationControlsButtonOnClick={toggleAnimationControlsButtonOnClick.bind(
                        null,
                        false
                    )}
                />
            ) : (
                <DefaultOptions
                    showDownloadGeoTIFFButton={showDownloadGeoTIFFButton}
                    // startAnimationOnClick=
                    donwloadButtonOnClick={() => {
                        dispatch(showDownloadPanelToggled(true));
                    }}
                    saveWebmapButtonOnClick={() => {
                        dispatch(showSaveWebMapPanelToggled());
                    }}
                    startAnimationOnClick={toggleAnimationControlsButtonOnClick.bind(
                        null,
                        true
                    )}
                />
            )}
        </div>
    );
};
