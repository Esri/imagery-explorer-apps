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
import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '@shared/store/configureStore';
import { useAppDispatch } from '@shared/store/configureStore';
import {
    shouldShowAboutThisAppToggled,
    showDocPanelToggled,
} from '../../store/UI/reducer';
import useOnClickOutside from '@shared/hooks/useOnClickOutside';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { APP_NAME, AppName } from '@shared/config';
import { encodeMapCenter } from '@shared/utils/url-hash-params/map';
import { selectMapCenter, selectMapZoom } from '@shared/store/Map/selectors';
import { UrlHashParamKey } from '@shared/utils/url-hash-params';

type Props = {
    /**
     * title of the explorer app
     */
    title: string;
    /**
     * if true, show the doc button that allows user to launch the doc panel
     */
    showDocButton?: boolean;
    /**
     * tooltip text for the open documentation button
     */
    docButtonTooltip?: string;
};

export const IMAGERY_EXPLORER_APPS: {
    appName: AppName;
    title: string;
    url: string;
}[] = [
    {
        appName: 'landcoverexplorer',
        title: 'Sentinel-2 Land Cover Explorer',
        url: '/landcoverexplorer',
    },
    {
        appName: 'landsatexplorer',
        title: 'Landsat Explorer',
        url: '/landsatexplorer',
    },
    {
        appName: 'sentinel1explorer',
        title: 'Sentinel-1 Explorer',
        url: '/sentinel1explorer',
    },
    {
        appName: 'sentinel2explorer',
        title: 'Sentinel-2 Explorer',
        url: '/sentinel2explorer',
    },
];

const AppHeader: FC<Props> = ({ title, showDocButton, docButtonTooltip }) => {
    const dispatch = useAppDispatch();

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const [showImageryExplorerAppsList, setShowImageryExplorerAppsList] =
        useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>();

    const mapCenter = useAppSelector(selectMapCenter);

    const zoom = useAppSelector(selectMapZoom);

    const launchImageryExplorerApp = (url: string) => {
        const key: UrlHashParamKey = 'mapCenter';
        const targetURL = url + `#${key}=${encodeMapCenter(mapCenter, zoom)}`;
        window.open(targetURL, '_blank');
    };

    useOnClickOutside(
        containerRef,
        setShowImageryExplorerAppsList.bind(null, false)
    );

    return (
        <div
            className={classNames(
                'absolute z-10 text-custom-light-blue flex top-0 left-0 right-0 md:top-map-ui-top-position md:left-map-ui-top-position md:right-auto',
                {
                    hidden: isAnimationPlaying,
                }
            )}
            ref={containerRef}
        >
            <div
                className="theme-background p-1 h-app-header-size w-app-header-size flex items-center justify-center border-r border-custom-light-blue-50"
                onClick={() => {
                    dispatch(shouldShowAboutThisAppToggled());
                }}
                title="About this app"
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
                    <div className="flex-grow">
                        <span className="text-sm md:text-lg">{title}</span>
                    </div>

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
            </div>

            {showDocButton && (
                <div
                    className="h-app-header-size w-app-header-size  theme-background cursor-pointer border-l border-custom-light-blue-50 pl-2 flex items-center"
                    onClick={() => {
                        dispatch(showDocPanelToggled());
                    }}
                    title={docButtonTooltip || ''}
                >
                    <calcite-icon icon="open-book" />
                </div>
            )}

            {showImageryExplorerAppsList && (
                <div
                    className={classNames(
                        'absolute left-0 md:left-app-header-size top-app-header-size theme-background w-full md:w-[300px] border-t border-custom-light-blue-50'
                    )}
                >
                    <div className="px-2 py-2 text-xs text-custom-light-blue-50">
                        <span>Image Explorer Apps</span>
                    </div>

                    {IMAGERY_EXPLORER_APPS
                        // should not show current app in the list
                        .filter((d) => d.appName !== APP_NAME)
                        .map((d) => {
                            return (
                                <span
                                    key={d.title}
                                    // href={d.url}
                                    // target="_blank"
                                    title={`Launch the ${d.title} in a new tab`}
                                    // rel="noreferrer"
                                    onClick={launchImageryExplorerApp.bind(
                                        null,
                                        d.url
                                    )}
                                >
                                    <div className="w-full px-2 py-1 text-xs cursor-pointer flex items-center">
                                        <calcite-icon
                                            icon="launch"
                                            scale="s"
                                            style={{ opacity: '.5' }}
                                        />
                                        <span className="ml-2 text-lg">
                                            {d.title}
                                        </span>
                                    </div>
                                </span>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default AppHeader;
