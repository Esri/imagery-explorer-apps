/* Copyright 2025 Esri
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

import React, { FC } from 'react';
import { MapActionButton } from '../MapActionButton/MapActionButton';
import { useAppSelector } from '@shared/store/configureStore';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import SearchWidget from './SearchWidget';
import MapView from '@arcgis/core/views/MapView';
import classNames from 'classnames';
import useOnClickOutside from '@shared/hooks/useOnClickOutside';

type Props = {
    mapView?: MapView;
};

export const SearchWidgetContainer: FC<Props> = ({ mapView }) => {
    const containerRef = React.useRef<HTMLDivElement>();

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const [isSearchWidgetOpen, setIsSearchWidgetOpen] = React.useState(false);

    useOnClickOutside(containerRef, () => {
        setIsSearchWidgetOpen(false);
    });

    if (!mapView) {
        return null;
    }

    return (
        <div className="relative" ref={containerRef}>
            <MapActionButton
                tooltip="Open Search Widget"
                onClickHandler={() => {
                    setIsSearchWidgetOpen(!isSearchWidgetOpen);
                }}
            >
                <calcite-icon icon="search" scale="s"></calcite-icon>
            </MapActionButton>

            <div
                className={classNames(
                    'absolute top-0 left-full ml-[2px] w-[230px] h-map-action-button-size',
                    {
                        hidden: !isSearchWidgetOpen,
                    }
                )}
            >
                <SearchWidget mapView={mapView} hide={isAnimationPlaying} />
            </div>
        </div>
    );
};
