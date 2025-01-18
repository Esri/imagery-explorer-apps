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

import {
    AnimationSpeedControl,
    AnimationSpeedSlider,
} from '@shared/components/AnimationControl/AnimationSpeedControl';
import { selectShouldShowSentinel2Layer } from '@shared/store/LandcoverExplorer/selectors';
import {
    animationSpeedChanged,
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
import React, { FC } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';

type SaveOptionsProps = {
    donwloadButtonOnClick: () => void;
    saveWebmapButtonOnClick: () => void;
};

type AnimationOptionsProps = {
    animationSpeed: number;
    /**
     * fires when user makes change to Animation Speed
     * @param newSpeed speed in milliseconds
     * @returns
     */
    speedOnChange: (newSpeed?: number) => void;
    copyLinkOnClick: () => void;
    donwloadAnimationOnClick: () => void;
};

type OptionButtonProps = {
    label: string;
    icon: string;
    onClick: () => void;
};

export const OptionButton: FC<OptionButtonProps> = ({
    label,
    icon,
    onClick,
}) => {
    return (
        <div className="cursor-pointer flex items-center" onClick={onClick}>
            <calcite-icon icon={icon} scale="s" />
            <span className="ml-1 text-xs">{label}</span>
        </div>
    );
};

export const SaveOptions: FC<SaveOptionsProps> = ({
    donwloadButtonOnClick,
    saveWebmapButtonOnClick,
}) => {
    const animationMode = useAppSelector(selectAnimationStatus);

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSentinel2Layer
    );

    if (animationMode !== null) {
        return null;
    }

    // no need to show save options if the Sentinel-2 Imagery Layer is on
    // but we still want to add to a place holder component to prevent the TimeSlider from jumping up and down.
    if (shouldShowSentinel2Layer) {
        return (
            <div className="h-[16px] w-full">
                {/* <span className='text-xs'>Save options are only enabled for Land Cover layer</span> */}
            </div>
        );
    }

    return (
        <div className={classNames('flex items-center justify-around')}>
            {/* <div className='cursor-pointer flex items-center'
                onClick={donwloadButtonOnClick}
            >
                <calcite-icon icon="download-to" scale="s" />
                <span className='ml-1'>Download as GeoTIFF</span>
            </div> */}

            <OptionButton
                label="Download GeoTIFF"
                icon="download-to"
                onClick={donwloadButtonOnClick}
            />

            {/* <div className='cursor-pointer flex items-center' 
                onClick={saveWebmapButtonOnClick}
            >
                <calcite-icon icon="launch" scale="s" />
                <span className='ml-1'>Publish to ArcGIS</span>
            </div> */}

            <OptionButton
                label="Publish to ArcGIS"
                icon="launch"
                onClick={saveWebmapButtonOnClick}
            />
        </div>
    );
};

export const AnimationOptions: FC<AnimationOptionsProps> = ({
    animationSpeed,
    copyLinkOnClick,
    donwloadAnimationOnClick,
    speedOnChange,
}: AnimationOptionsProps) => {
    const animationMode = useAppSelector(selectAnimationStatus);

    if (!animationMode) {
        return null;
    }

    return (
        <div className="flex items-center justify-around">
            <div className="flex items-center w-24">
                <AnimationSpeedSlider
                    speedInMilliseonds={animationSpeed}
                    speedOnChange={speedOnChange}
                />

                <span className="ml-3">Speed</span>
            </div>

            <OptionButton
                label="Copy Link"
                icon="link"
                onClick={copyLinkOnClick}
            />

            <OptionButton
                label="Download MP4"
                icon="download-to"
                onClick={donwloadAnimationOnClick}
            />
        </div>
    );
};

export const ExtraOptions = () => {
    const dispatch = useAppDispatch();

    const animationSpeed = useAppSelector(selectAnimationSpeed);

    return (
        <div className="w-full my-6 text-xs">
            <SaveOptions
                donwloadButtonOnClick={() => {
                    dispatch(showDownloadPanelToggled(true));
                }}
                saveWebmapButtonOnClick={() => {
                    dispatch(showSaveWebMapPanelToggled());
                }}
            />

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
            />
        </div>
    );
};
