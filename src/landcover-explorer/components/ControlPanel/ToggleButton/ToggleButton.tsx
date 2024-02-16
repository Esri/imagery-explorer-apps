import classNames from 'classnames';
import React, { FC } from 'react';

type Props = {
    hideControlPanel: boolean;
    onClickHandler: () => void;
};

const CheveronDownIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path fill="currentColor" d="M20.1 9L12 17.1 3.9 9z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const CheveronUpIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path fill="currentColor" d="M3.9 15L12 6.9l8.1 8.1z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const ToggleButton: FC<Props> = ({
    hideControlPanel,
    onClickHandler,
}: Props) => {
    return (
        <div
            className={classNames('absolute right-0 w-10 h-10', {
                'bottom-bottom-panel-height': hideControlPanel === false,
                'bottom-0': hideControlPanel,
            })}
        >
            <div
                className="absolute rounded-full top-5 w-full h-full theme-background text-custom-light-blue flex justify-center cursor-pointer"
                onClick={onClickHandler}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full rounded-full"
                    style={{
                        background: 'rgba(0,0,0,0.6)',
                    }}
                ></div>

                <div className="relative z-10">
                    {hideControlPanel ? CheveronUpIcon : CheveronDownIcon}
                </div>
            </div>
        </div>
    );
};

export default ToggleButton;
