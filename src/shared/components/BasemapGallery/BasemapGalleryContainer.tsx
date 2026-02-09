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

import React, { FC, useState, useRef } from 'react';
import { MapActionButton } from '../MapActionButton/MapActionButton';
import { useAppSelector } from '@shared/store/configureStore';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import BasemapGalleryWidget from './BasemapGallery';
import MapView from '@arcgis/core/views/MapView';
import classNames from 'classnames';
import useOnClickOutside from '@shared/hooks/useOnClickOutside';
import { useTranslation } from 'react-i18next';
import { CalciteIcon } from '@esri/calcite-components-react';

type Props = {
    mapView?: MapView;
};

export const BasemapGalleryContainer: FC<Props> = ({ mapView }) => {
    const { t } = useTranslation();

    const containerRef = useRef<HTMLDivElement>(null);

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const [isBasemapGalleryOpen, setIsBasemapGalleryOpen] = useState(false);

    useOnClickOutside(containerRef, () => {
        setIsBasemapGalleryOpen(false);
    });

    if (!mapView) {
        return null;
    }

    return (
        <div className="relative" ref={containerRef}>
            <MapActionButton
                tooltip={t('basemap_gallery_tooltip') || 'Change Basemap'}
                onClickHandler={() => {
                    setIsBasemapGalleryOpen(!isBasemapGalleryOpen);
                }}
            >
                <CalciteIcon icon="basemap" scale="s"></CalciteIcon>
            </MapActionButton>

            <div
                className={classNames(
                    'absolute top-0 left-full ml-[2px] z-20',
                    {
                        hidden: !isBasemapGalleryOpen,
                    }
                )}
                style={{
                    width: '350px',
                    maxHeight: '400px',
                    overflow: 'auto',
                }}
            >
                <BasemapGalleryWidget
                    mapView={mapView}
                    hide={isAnimationPlaying}
                />
            </div>
        </div>
    );
};
