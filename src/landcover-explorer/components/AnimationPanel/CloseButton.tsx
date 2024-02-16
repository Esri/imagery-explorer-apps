import React from 'react';
import { useDispatch } from 'react-redux';
import { animationModeUpdated } from '@landcover-explorer/store/UI/reducer';

const CloseButton = () => {
    const dispatch = useDispatch();
    return (
        <div
            className="absolute top-0 right-0 w-40 h-40 text-white"
            style={{
                background: `linear-gradient(215deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%)`,
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                height="64"
                width="64"
                className="absolute top-1 right-1 cursor-pointer"
                onClick={() => {
                    dispatch(animationModeUpdated(null));
                }}
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

export default CloseButton;
