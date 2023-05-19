import React, { FC } from 'react';
import { AnimationStatus } from '../../store/UI/reducer';

const PlayButton = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
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
        height="24"
        width="24"
    >
        <path
            fill="currentColor"
            d="M4 22h6V2H4zM5 3h4v18H5zm9 19h6V2h-6zm1-19h4v18h-4z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const CloseButton = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path
            fill="currentColor"
            d="M17.45 8.257L13.207 12.5l4.243 4.243-.707.707-4.243-4.243-4.243 4.243-.707-.707 4.243-4.243L7.55 8.257l.707-.707 4.243 4.243 4.243-4.243zM22.8 12.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

type Props = {
    status: AnimationStatus;
    statusOnChange: (newStatus?: AnimationStatus) => void;
};

export const AnimationStatusControl: FC<Props> = ({
    status,
    statusOnChange,
}: Props) => {
    return (
        <div className="flex cursor-pointer">
            {!status && (
                <div onClick={statusOnChange.bind(null, 'loading')}>
                    {PlayButton}
                </div>
            )}
            {status === 'loading' && (
                <div>
                    <calcite-loader scale="m" active inline></calcite-loader>
                </div>
            )}
            {status === 'playing' && (
                <div onClick={statusOnChange.bind(null, 'pausing')}>
                    {PauseButton}
                </div>
            )}
            {status === 'pausing' && (
                <div onClick={statusOnChange.bind(null, 'playing')}>
                    {PlayButton}
                </div>
            )}
            {status && (
                <div onClick={statusOnChange.bind(null, null)}>
                    {CloseButton}
                </div>
            )}
        </div>
    );
};
