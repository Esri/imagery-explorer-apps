import React, { FC } from 'react';

type DownloadIconProps = {
    onClick: () => void;
};

const DownloadIcon: FC<DownloadIconProps> = ({
    onClick,
}: DownloadIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            viewBox="0 0 16 16"
            height="16"
            width="16"
            onClick={onClick}
        >
            <path
                fill="currentColor"
                d="M9 2v7.293l1.618-1.619.707.707-2.808 2.81-2.81-2.81.707-.707L8 9.26V2zM4 14h9v-1H4z"
            />
            <path fill="none" d="M0 0h16v16H0z" />
        </svg>
    );
};

export default DownloadIcon;
