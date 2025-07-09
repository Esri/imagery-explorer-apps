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

import React, { FC, useRef } from 'react';
import classNames from 'classnames';
import { RasterFunctionInfo } from '@typing/imagery-service';
import { GirdCard } from '../GirdCard/GirdCard';
import useGetTooltipPositionOnHover from '@shared/hooks/useGetTooltipPositionOnHover';
import { Tooltip } from '../Tooltip';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { useTranslation } from 'react-i18next';

type Props = {
    /**
     * tooltip text that will be displayed when user hovers the info icon next to the header
     */
    headerTooltip: string;
    /**
     * name of selected raster function
     */
    nameOfSelectedRasterFunction: string;
    /**
     * list of available raster functions
     */
    rasterFunctionInfo: RasterFunctionInfo[];
    /**
     * if true, Raster Function selector should be disabled
     */
    disabled: boolean;
    /**
     * The width of header tooltip container in px. The default width is 240px and this value can be used to override that value
     */
    widthOfTooltipContainer?: number;
    /**
     * Fires when user selects a new raster function
     * @param name name of new raster function
     * @returns
     */
    onChange: (name: string) => void;
    /**
     * Emits when users hovers a grid item in th list
     */
    itemOnHover: (data?: RasterFunctionInfo) => void;
};

export const RasterFunctionSelector: FC<Props> = ({
    headerTooltip,
    nameOfSelectedRasterFunction,
    rasterFunctionInfo,
    disabled,
    widthOfTooltipContainer,
    onChange,
    itemOnHover,
}) => {
    const containerRef = useRef<HTMLDivElement>();
    useGetTooltipPositionOnHover(containerRef);

    const { t } = useTranslation();

    return (
        <div
            className={classNames('h-full w-auto select-none', {
                'mx-4': IS_MOBILE_DEVICE,
            })}
            ref={containerRef}
        >
            <div
                className={classNames(
                    'text-center mb-3 flex items-center justify-center',
                    {
                        'is-disabled': disabled,
                    }
                )}
            >
                <Tooltip
                    content={headerTooltip}
                    width={widthOfTooltipContainer || 240}
                >
                    <calcite-icon scale="s" icon="information" />
                </Tooltip>

                <span className="uppercase ml-2 text-sm">{t('renderer')}</span>
            </div>

            <div
                className="flex flex-wrap max-w-[310px] justify-center gap-[5px] max-h-[155px] pr-1 overflow-x-hidden overflow-y-auto fancy-scrollbar"
                data-testid="renderer-selector-container"
            >
                {rasterFunctionInfo.map((d) => {
                    const { name, thumbnail, label } = d;

                    const selected =
                        // disabled === false &&
                        nameOfSelectedRasterFunction === name;

                    return (
                        <GirdCard
                            key={name}
                            label={label || name}
                            thumbnail={thumbnail}
                            selected={selected}
                            disabled={disabled}
                            onClick={() => {
                                onChange(name);
                            }}
                            onMouseEnter={itemOnHover.bind(null, d)}
                            onMouseLeave={itemOnHover.bind(null, null)}
                        />
                    );
                })}
            </div>
        </div>
    );
};
