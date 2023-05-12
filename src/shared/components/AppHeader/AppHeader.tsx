import './AppHeader.css';
import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { shouldShowAboutThisAppToggled } from '../../store/UI/reducer';

type Props = {
    /**
     * title of the explorer app
     */
    title: string;
};

const AppHeader: FC<Props> = ({ title }) => {
    const dispatch = useDispatch();

    const shouldHide = false; //useSelector(selectAnimationMode);

    return (
        <div
            className={classNames(
                'absolute z-10 text-custom-light-blue flex top-0 left-0 right-0 md:top-app-header-position md:left-app-header-position md:right-auto',
                {
                    hidden: shouldHide,
                }
            )}
        >
            <div
                className="theme-background p-1 h-app-header-size w-app-header-size flex items-center justify-center border-r border-custom-light-blue-50"
                onClick={() => {
                    dispatch(shouldShowAboutThisAppToggled());
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    className="cursor-pointer"
                >
                    <path
                        fill="currentColor"
                        d="M12.5 7.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1zM13 18V9h-2v1h1v8h-1v1h3v-1zm9.8-5.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"
                    />
                    <path fill="none" d="M0 0h24v24H0z" />
                </svg>
            </div>

            <div
                className={classNames(
                    'theme-background p-1 px-2 text-lg font-light flex items-center h-app-header-size flex-grow md:flex-grow-0'
                )}
            >
                <span>Esri | {title}</span>
            </div>
        </div>
    );
};

export default AppHeader;
