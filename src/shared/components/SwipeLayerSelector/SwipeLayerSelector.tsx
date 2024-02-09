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

import React, { FC } from 'react';
import { Button } from '../Button';
import { QueryParams4ImageryScene } from '../../store/ImageryScene/reducer';
import classNames from 'classnames';
import { getRasterFunctionLabelText } from '@shared/services/helpers/getRasterFunctionLabelText';

type Side4SwipeMode = 'left' | 'right';

type Props = {
    selectedSide: Side4SwipeMode;
    queryParams4SceneOnLeft: QueryParams4ImageryScene;
    queryParams4SceneOnRight: QueryParams4ImageryScene;
    onChange: (side: Side4SwipeMode) => void;
    swapButtonOnClick: () => void;
};

export const SwipeLayerSelector: FC<Props> = ({
    selectedSide,
    queryParams4SceneOnLeft,
    queryParams4SceneOnRight,
    onChange,
    swapButtonOnClick,
}) => {
    const getButtonContent = (side: Side4SwipeMode) => {
        const queryParams =
            side === 'left'
                ? queryParams4SceneOnLeft
                : queryParams4SceneOnRight;

        return (
            <>
                <div>
                    <span>{side}</span>
                </div>

                <div className="text-xs text-center lowercase">
                    {queryParams?.acquisitionDate ? (
                        <>
                            <span>{queryParams.acquisitionDate}</span>

                            <br />

                            <span className="normal-case">
                                {getRasterFunctionLabelText(
                                    queryParams?.rasterFunctionName
                                )}
                            </span>
                        </>
                    ) : (
                        <span>No Scene Selected</span>
                    )}
                </div>
            </>
        );
    };

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
                >
                    {getButtonContent('left')}
                </Button>
            </div>

            <div
                className="flex justify-center cursor-pointer w-full my-1"
                title="swap left and right side"
                onClick={swapButtonOnClick}
            >
                <calcite-icon icon="arrow-up-down" scale="s" />
            </div>

            <div
                className={classNames('relative mb-1 h-1/2 flex items-center')}
                key={'right'}
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
                >
                    {getButtonContent('right')}
                </Button>
            </div>
        </div>
    );
};
