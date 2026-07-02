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
import { Button } from '../Button';
import { QueryParams4ImageryScene } from '../../store/ImageryScene/reducer';
import classNames from 'classnames';
import { SwipeLayerSelectorButtonContent } from './SwipeLayerSelectorButtonContent';

// import { getRasterFunctionLabelText } from '@shared/services/helpers/getRasterFunctionLabelText';

type Side4SwipeMode = 'left' | 'right';

type Props = {
    selectedSide: Side4SwipeMode;
    queryParams4SceneOnLeft: QueryParams4ImageryScene;
    queryParams4SceneOnRight: QueryParams4ImageryScene;
    tooltip4LeadingLayerSelector?: string;
    tooltip4TrailingLayerSelector?: string;
    /**
     * Whether to use the acquisition timestamp as the label in the SwipeLayerSelector instead of the raster function name.
     */
    useAcquisitionTimestampAsLabel?: boolean;
    onChange: (side: Side4SwipeMode) => void;
    swapButtonOnClick: () => void;
};

export const SwipeLayerSelector: FC<Props> = ({
    selectedSide,
    queryParams4SceneOnLeft,
    queryParams4SceneOnRight,
    useAcquisitionTimestampAsLabel = false,
    tooltip4LeadingLayerSelector,
    tooltip4TrailingLayerSelector,
    onChange,
    swapButtonOnClick,
}) => {
    return (
        <div className="flex flex-col h-full w-full">
            {/* {sides.map((side) => (
                <div
                    className={classNames(
                        'relative mb-1 h-1/2 flex items-center'
                    )}
                    key={side}
                >
                    <Button
                        appearance={
                            selectedSide === side ? 'solid' : 'transparent'
                        }
                        fullHeight={true}
                        onClickHandler={() => {
                            onChange(side);
                        }}
                        decorativeIndicator={
                            selectedSide === side ? 'left' : null
                        }
                    >
                        {getButtonContent(side)}
                    </Button>
                </div>
            ))} */}

            <div
                className={classNames('relative mb-1 h-1/2 flex items-center')}
                key={'left'}
                title={tooltip4LeadingLayerSelector}
            >
                <Button
                    appearance={
                        selectedSide === 'left' ? 'solid' : 'transparent'
                    }
                    fullHeight={true}
                    onClickHandler={() => {
                        onChange('left');
                    }}
                    decorativeIndicator={
                        selectedSide === 'left' ? 'left' : null
                    }
                    label="select leading layer"
                >
                    <SwipeLayerSelectorButtonContent
                        side="left"
                        queryParams={queryParams4SceneOnLeft}
                        selectedSide={selectedSide}
                        useAcquisitionTimestampAsLabel={
                            useAcquisitionTimestampAsLabel
                        }
                    />
                </Button>
            </div>

            <div
                data-testid="swipe-mode-side-swap-button"
                className="flex justify-center cursor-pointer w-full my-1"
                title="swap left and right side"
                onClick={swapButtonOnClick}
            >
                <calcite-icon icon="arrow-up-down" scale="s" />
            </div>

            <div
                className={classNames('relative mb-1 h-1/2 flex items-center')}
                key={'right'}
                title={tooltip4TrailingLayerSelector}
            >
                <Button
                    appearance={
                        selectedSide === 'right' ? 'solid' : 'transparent'
                    }
                    fullHeight={true}
                    onClickHandler={() => {
                        onChange('right');
                    }}
                    decorativeIndicator={
                        selectedSide === 'right' ? 'left' : null
                    }
                    label="select trailing layer"
                >
                    <SwipeLayerSelectorButtonContent
                        side="right"
                        queryParams={queryParams4SceneOnRight}
                        selectedSide={selectedSide}
                        useAcquisitionTimestampAsLabel={
                            useAcquisitionTimestampAsLabel
                        }
                    />
                </Button>
            </div>
        </div>
    );
};
