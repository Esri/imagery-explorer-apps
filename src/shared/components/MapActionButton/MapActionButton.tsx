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

// import {
//     selectAnimationStatus,
//     selectIsAnimationPlaying,
// } from '@shared/store/UI/selectors';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

type Props = {
    /**
     * tooltip of the button
     */
    tooltip: string;
    /**
     * notification message to be displayed next to the action button
     */
    notificationMessage?: string | React.ReactNode;
    /**
     * if true, show loading indicator
     */
    showLoadingIndicator?: boolean;
    /**
     * if true, the button should be disabled
     */
    disabled?: boolean;
    /**
     * marging space on top
     */
    topMarging?: number;
    /**
     * children element, can be be text or svg icon elements
     */
    children?: React.ReactNode;
    /**
     * emits when user clicks on the button
     * @returns
     */
    onClickHandler: () => void;
};

export const MapActionButton: FC<Props> = ({
    tooltip,
    notificationMessage,
    showLoadingIndicator,
    disabled,
    topMarging,
    children,
    onClickHandler,
}) => {
    // const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    return (
        <div
            className={classNames('relative z-10', {
                // hidden: isAnimationPlaying,
                'is-disabled': disabled,
            })}
            style={{
                marginTop: topMarging || 1,
            }}
            title={tooltip}
            onClick={onClickHandler}
        >
            <div className="w-map-action-button-size h-map-action-button-size flex items-center justify-center bg-custom-background text-custom-light-blue-90 cursor-pointer">
                {showLoadingIndicator ? (
                    <div className="w-full h-full flex items-center justify-center text-center">
                        <calcite-loader
                            scale="m"
                            inline
                            style={{ marginRight: 0 } as React.CSSProperties}
                        />
                    </div>
                ) : (
                    children
                )}
            </div>

            {notificationMessage ? (
                <div
                    className={classNames(
                        'absolute left-[110%] top-0 h-map-action-button-size px-2 flex items-center',
                        'w-auto whitespace-nowrap', // expand its width to cover the whole text content without wrapping the text
                        'bg-custom-background text-custom-light-blue-90 pointer-events-none text-xs'
                    )}
                >
                    {notificationMessage}
                </div>
            ) : null}
        </div>
    );
};
