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

import classNames from 'classnames';
import React, { FC } from 'react';
import {
    SENTINEL_2_10M_LAND_COVER_ITEM_URL,
    SENTINEL_2_ITEM_URL,
} from '@landcover-explorer/constants/map';
import { THEME_COLOR_LIGHT_BLUE } from '@landcover-explorer/constants/style';
import DownloadIcon from './DownloadIcon';
import OpenIcon from './OpenIcon';
import SaveWebMapIcon from './SaveWebMapIcon';
import { Button } from '@shared/components/Button';

type LayerSelectorButtonProps = {
    /**
     * If true, the layer controlled by this button is deing displayed on the map
     */
    active?: boolean;
    onClickHandler: () => void;
    children?: React.ReactNode;
};

const BUTTON_CONATINER_CLASSNAMES = 'relative flex-grow mb-3'; //'my-3';

const ICONS_CONATINER_CLASSNAMES = 'mt-2 flex items-center justify-end';

const LayerSelectorButton: FC<LayerSelectorButtonProps> = ({
    active,
    onClickHandler,
    children,
}: LayerSelectorButtonProps) => {
    return (
        <div
            className={classNames(
                'p-2 px-4 border w-36 shrink-0 text-sm md:text-base border-custom-light-blue border-opacity-50 uppercase cursor-pointer text-center',
                {
                    'bg-custom-light-blue': active,
                    'text-custom-background': active,
                    'bg-custom-background': !active,
                    'text-custom-light-blue': !active,
                }
            )}
            style={{
                filter: active
                    ? `drop-shadow(1px 1px 4px rgba(191,238,255, .5))`
                    : 'none',
            }}
            onClick={onClickHandler}
        >
            {children}
        </div>
    );
};

type Props = {
    shouldShowSentinel2Layer: boolean;
    disabled?: boolean;
    landcoverButtonOnClick: () => void;
    // downloadLandcoverButtonOnClick: () => void;
    imageryButtonOnClick: () => void;
    // saveWebMapButtonOnClick: () => void;
};

const LayerSelector: FC<Props> = ({
    shouldShowSentinel2Layer,
    disabled,
    landcoverButtonOnClick,
    imageryButtonOnClick,
}: // downloadLandcoverButtonOnClick,
// saveWebMapButtonOnClick,
Props) => {
    return (
        <div
            className={classNames('relative flex flex-col', {
                'disabled-when-animation-mode-is-on': disabled,
            })}
        >
            <div className={classNames('relative flex-grow mb-2')}>
                <Button
                    fullHeight={true}
                    appearance={
                        shouldShowSentinel2Layer === false
                            ? 'solid'
                            : 'transparent'
                    }
                    onClickHandler={landcoverButtonOnClick}
                    decorativeIndicator={
                        shouldShowSentinel2Layer === false ? 'right' : null
                    }
                >
                    <span className="uppercase">Land Cover</span>
                </Button>
            </div>

            <div className={'relative flex-grow '}>
                <Button
                    fullHeight={true}
                    appearance={
                        shouldShowSentinel2Layer ? 'solid' : 'transparent'
                    }
                    onClickHandler={imageryButtonOnClick}
                    decorativeIndicator={
                        shouldShowSentinel2Layer ? 'right' : null
                    }
                >
                    <span className="uppercase">Imagery</span>
                </Button>
            </div>

            {/* <div className={BUTTON_CONATINER_CLASSNAMES}>
                <LayerSelectorButton
                    onClickHandler={landcoverButtonOnClick}
                    active={!shouldShowSentinel2Layer}
                >
                    Land Cover
                </LayerSelectorButton>

                <div className={ICONS_CONATINER_CLASSNAMES}>
                    <div
                        title="Launch download options for Land Cover"
                        className="mr-2"
                    >
                        <DownloadIcon
                            onClick={downloadLandcoverButtonOnClick}
                        />
                    </div>

                    <div
                        title="Export land cover to a new ArcGIS Online web map"
                        className="mr-2"
                    >
                        <SaveWebMapIcon onClick={saveWebMapButtonOnClick} />
                    </div>

                    <div title="About Land Cover">
                        <OpenIcon
                            onClick={() => {
                                window.open(
                                    SENTINEL_2_10M_LAND_COVER_ITEM_URL,
                                    '_blank'
                                );
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className={BUTTON_CONATINER_CLASSNAMES}>
                <LayerSelectorButton
                    onClickHandler={imageryButtonOnClick}
                    active={shouldShowSentinel2Layer}
                >
                    Imagery
                </LayerSelectorButton>

                <div className={ICONS_CONATINER_CLASSNAMES}>
                    <div title="About Imagery">
                        <OpenIcon
                            onClick={() => {
                                window.open(SENTINEL_2_ITEM_URL, '_blank');
                            }}
                        />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default LayerSelector;
