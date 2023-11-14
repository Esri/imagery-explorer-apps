import './CloseButton.css';
import React, { FC } from 'react';

type Props = {
    onClick: () => void;
};

export const CloseButton: FC<Props> = ({ onClick }: Props) => {
    return (
        <div className="close-button text-custom-light-blue">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                height="64"
                width="64"
                className="absolute top-1 right-1 cursor-pointer"
                onClick={onClick}
            >
                <path
                    fill="currentColor"
                    d="M23.985 8.722L16.707 16l7.278 7.278-.707.707L16 16.707l-7.278 7.278-.707-.707L15.293 16 8.015 8.722l.707-.707L16 15.293l7.278-7.278z"
                />
                <path fill="none" d="M0 0h32v32H0z" />
            </svg>
        </div>
    );
};
