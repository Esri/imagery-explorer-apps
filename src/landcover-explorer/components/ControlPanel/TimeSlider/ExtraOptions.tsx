import {
    showDownloadAnimationPanelChanged,
    showDownloadPanelToggled,
    showSaveWebMapPanelToggled,
} from '@shared/store/UI/reducer';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import { copyAnimationLink } from '@shared/store/UI/thunks';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

type SaveOptionsProps = {
    donwloadButtonOnClick: () => void;
    saveWebmapButtonOnClick: () => void;
};

type AnimationOptionsProps = {
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
    const animationMode = useSelector(selectAnimationStatus);

    if (animationMode !== null) {
        return null;
    }

    return (
        <div className="flex items-center justify-around">
            {/* <div className='cursor-pointer flex items-center'
                onClick={donwloadButtonOnClick}
            >
                <calcite-icon icon="download-to" scale="s" />
                <span className='ml-1'>Download as GeoTIFF</span>
            </div> */}

            <OptionButton
                label="Download as GeoTIFF"
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
    copyLinkOnClick,
    donwloadAnimationOnClick,
}) => {
    const animationMode = useSelector(selectAnimationStatus);

    if (!animationMode) {
        return null;
    }

    return (
        <div className="flex items-center justify-around">
            <OptionButton
                label="Copy Link"
                icon="link"
                onClick={copyLinkOnClick}
            />

            <OptionButton
                label="Download"
                icon="download-to"
                onClick={donwloadAnimationOnClick}
            />
        </div>
    );
};

export const ExtraOptions = () => {
    const dispatch = useDispatch();

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
                donwloadAnimationOnClick={() => {
                    dispatch(showDownloadAnimationPanelChanged(true));
                }}
                copyLinkOnClick={() => {
                    dispatch(copyAnimationLink());
                }}
            />
        </div>
    );
};
