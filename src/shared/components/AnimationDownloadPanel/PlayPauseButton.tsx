import { animationStatusChanged } from '@shared/store/UI/reducer';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const ICON_SIZE = 64;

const ContinuePlayButton = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={ICON_SIZE}
        width={ICON_SIZE}
    >
        <path
            fill="currentColor"
            d="M6 1.773v20.454l15-10.225zm1 1.892l12.225 8.337L7 20.335z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const PauseButton = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={ICON_SIZE}
        width={ICON_SIZE}
    >
        <path
            fill="currentColor"
            d="M4 22h6V2H4zM5 3h4v18H5zm9 19h6V2h-6zm1-19h4v18h-4z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

export const PlayPauseButton = () => {
    const dispatch = useDispatch();

    const status = useSelector(selectAnimationStatus);

    return (
        <div className="cursor-pointer">
            {status === 'playing' && (
                <div
                    onClick={() => {
                        dispatch(animationStatusChanged('pausing'));
                    }}
                >
                    {PauseButton}
                </div>
            )}
            {status === 'pausing' && (
                <div
                    onClick={() => {
                        dispatch(animationStatusChanged('playing'));
                    }}
                >
                    {ContinuePlayButton}
                </div>
            )}
        </div>
    );
};
