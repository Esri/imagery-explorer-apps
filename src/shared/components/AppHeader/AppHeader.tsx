import './AppHeader.css';
import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { shouldShowAboutThisAppToggled } from '../../store/UI/reducer';
import useOnClickOutside from '@shared/hooks/useOnClickOutside';
import { selectAnimationStatus } from '@shared/store/UI/selectors';

type Props = {
    /**
     * title of the explorer app
     */
    title: string;
};

const IMAGERY_EXPLORER_APPS = [
    {
        title: 'Sentinel-2 Land Cover Explorer',
        url: '/landcoverexplorer',
    },
];

const AppHeader: FC<Props> = ({ title }) => {
    const dispatch = useDispatch();

    const animationStatus = useSelector(selectAnimationStatus);

    const shouldHide = animationStatus !== null;

    const [showImageryExplorerAppsList, setShowImageryExplorerAppsList] =
        useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>();

    useOnClickOutside(
        containerRef,
        setShowImageryExplorerAppsList.bind(null, false)
    );

    return (
        <div
            className={classNames(
                'absolute z-10 text-custom-light-blue flex top-0 left-0 right-0 md:top-app-header-position md:left-app-header-position md:right-auto',
                {
                    hidden: shouldHide,
                }
            )}
            ref={containerRef}
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
                    'relative theme-background p-1 px-2 text-lg font-light items-center h-app-header-size flex-grow md:flex-grow-0'
                )}
            >
                <div className="flex h-full items-center">
                    <span>Esri | {title}</span>

                    <div
                        className="cursor-pointer ml-2 flex items-center"
                        onClick={setShowImageryExplorerAppsList.bind(
                            null,
                            !showImageryExplorerAppsList
                        )}
                    >
                        {showImageryExplorerAppsList ? (
                            <calcite-icon icon="chevron-up" />
                        ) : (
                            <calcite-icon icon="chevron-down" />
                        )}
                    </div>
                </div>

                {showImageryExplorerAppsList && (
                    <div
                        className={classNames(
                            'absolute left-0 top-app-header-size theme-background w-full border-t border-custom-light-blue-50'
                        )}
                    >
                        {IMAGERY_EXPLORER_APPS.map((d) => {
                            return (
                                <a
                                    href={d.url}
                                    target="_blank"
                                    key={d.title}
                                    rel="noreferrer"
                                >
                                    <div className="w-full p-2 text-sm cursor-pointer flex items-center">
                                        <span className="mr-2">{d.title}</span>
                                        <calcite-icon icon="launch" scale="s" />
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppHeader;
