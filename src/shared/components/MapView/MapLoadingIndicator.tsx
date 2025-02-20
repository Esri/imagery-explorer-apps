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

import classNames from 'classnames';
import React, { CSSProperties, FC } from 'react';

type Props = {
    /**
     * if true, show map loading indicator
     */
    active: boolean;
    /**
     * position of swipe widget handler on x axis
     */
    swipeWidgetHandlerPosition?: number;
};

export const MapLoadingIndicator: FC<Props> = ({
    active,
    swipeWidgetHandlerPosition,
}: Props) => {
    if (!active) {
        return null;
    }

    return (
        <>
            <div
                className={classNames(
                    'map-loading-indicator',
                    'flex items-center h-full absolute top-0 left-0 pointer-events-none'
                )}
                style={
                    {
                        width: swipeWidgetHandlerPosition
                            ? `${swipeWidgetHandlerPosition}%`
                            : '100%',
                        // '--calcite-ui-brand': 'var(--custom-light-blue)',
                        // '--calcite-ui-brand-hover': 'var(--custom-light-blue-70)',
                        // '--calcite-ui-brand-press': 'var(--custom-light-blue-50)'
                    } as CSSProperties
                }
            >
                <calcite-loader />
            </div>

            {swipeWidgetHandlerPosition && (
                <div
                    className={classNames(
                        'flex items-center h-full absolute top-0 right-0 pointer-events-none'
                    )}
                    style={
                        {
                            width: `${100 - swipeWidgetHandlerPosition}%`,
                            // '--calcite-ui-brand': 'var(--custom-light-blue)',
                            // '--calcite-ui-brand-hover': 'var(--custom-light-blue-70)',
                            // '--calcite-ui-brand-press': 'var(--custom-light-blue-50)'
                        } as CSSProperties
                    }
                >
                    <calcite-loader />
                </div>
            )}
        </>
    );
};
