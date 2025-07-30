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

import { CalciteIcon } from '@esri/calcite-components-react';
import { usePrevious } from '@shared/hooks/usePrevious';
import classNames from 'classnames';
import React, { FC, useEffect, useLayoutEffect, useRef } from 'react';

export type AnimationFrameInfo = {
    /**
     * unique identifier of this frame
     */
    frameId: string;
    // /**
    //  * acquisition date that will be used to query Imagery Scene for this frame
    //  */
    // acquisitionDate: string;
    /**
     * label of acquisition date for the imagery scene of selected frame,
     * it shuld be in format of `MMM dd, yyyy`, (e.g., `Feb-03, 2023`)
     */
    acquisitionDateLabel: string;
    /**
     * name of the raster function that will be used to render the Imagery Scene for this frame
     */
    rasterFunctionName: string;
    /**
     * if true, this Animation frame is selected
     */
    selected: boolean;
};

type Props = {
    data: AnimationFrameInfo[];
    /**
     * If ture, this component will be disabled
     */
    disabled: boolean;
    /**
     * fires when user select a frame
     * @param frameId
     * @returns
     */
    frameOnSelect: (frameId: string) => void;
    // /**
    //  * fires when user clicks on "Add A Scene" button
    //  * @returns void
    //  */
    // addButtonOnClick: () => void;
    /**
     * fires when user clicks on "Remove Scene" button
     * @param id identifier of the scene to be removed
     * @returns void
     */
    removeButtonOnClick: (frameId: string) => void;
};

export const AnimationFramesList: FC<Props> = ({
    data,
    disabled,
    frameOnSelect,
    // addButtonOnClick,
    removeButtonOnClick,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * track the number of frame from the previous state of the animation frames data
     */
    const prevNumOfAnimationFrames = usePrevious(data?.length);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        // we should only auto-scoll to the bottom of the list when user
        // adds a new frame.
        if (data?.length > prevNumOfAnimationFrames) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [data?.length]);

    return (
        <div
            className={classNames({
                'is-disabled': disabled,
            })}
        >
            <div
                ref={containerRef}
                className={classNames(
                    'overflow-y-auto max-h-[177px] fancy-scrollbar',
                    {
                        'pr-1': data && data.length > 5,
                    }
                )}
                data-testid="animation-frames-list"
            >
                {data.map((d, index) => {
                    const {
                        frameId,
                        acquisitionDateLabel,
                        rasterFunctionName,
                        selected,
                    } = d;

                    return (
                        <div
                            key={frameId}
                            data-testid={`animation-frame-card-${index}`}
                            data-selected={selected}
                            className={classNames(
                                /**
                                 * add `group` class name to this element, so the close button can be displayed when hover over this element
                                 * @see https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state
                                 */
                                'relative flex items-center px-1 h-[30px] mb-1',
                                'border border-custom-light-blue-80 cursor-pointer group horizontal-indicator-on-left',
                                {
                                    'bg-custom-light-blue': selected,
                                    'text-custom-background': selected,
                                    'drop-shadow-custom-light-blue-50':
                                        selected,
                                }
                            )}
                        >
                            <div
                                className="w-full text-xs mr-1 text-center leading-[.9rem]"
                                onClick={frameOnSelect.bind(null, frameId)}
                            >
                                <span>{acquisitionDateLabel}</span>
                                <br />
                                <span>{rasterFunctionName}</span>
                            </div>

                            <div
                                data-testid={`remove-animation-frame-button-${index}`}
                                // only show close icon when hover over the frame card, which is controlled by the `group-hover:block` class name
                                className="absolute top-0 right-0 hidden group-hover:block"
                                onClick={removeButtonOnClick.bind(
                                    null,
                                    frameId
                                )}
                            >
                                <CalciteIcon
                                    icon="x"
                                    scale="s"
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* <div className="" onClick={addButtonOnClick}>
                <span className="text-xs text-custom-light-blue uppercase border border-custom-light-blue-80 cursor-pointer p-1">
                    Add A Frame
                </span>
            </div> */}
        </div>
    );
};
