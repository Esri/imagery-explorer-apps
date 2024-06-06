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

import { delay } from '@shared/utils/snippets/delay';
import classNames from 'classnames';
import { generateUID } from 'helper-toolkit-ts';
import React, { FC, useState } from 'react';

/**
 * data for a single row in Scene Info Table
 */
export type SceneInfoTableData = {
    /**
     * name of the field
     */
    name: string;
    /**
     * value of the field
     */
    value: string;
    /**
     * if true, user can click to copy this value
     */
    clickToCopy?: boolean;
};

type Props = {
    data: SceneInfoTableData[];
};

const SceneInfoRow: FC<SceneInfoTableData> = ({ name, value, clickToCopy }) => {
    const [hasCopied2Clipboard, setHasCopied2Clipboard] =
        useState<boolean>(false);

    const valueOnClickHandler = async () => {
        if (!clickToCopy) {
            return;
        }

        await navigator.clipboard.writeText(value);

        setHasCopied2Clipboard(true);

        await delay(2000);

        setHasCopied2Clipboard(false);
    };

    return (
        <>
            <div
                className="text-right pr-2"
                style={{
                    lineHeight: 1.15,
                }}
            >
                <span className="text-custom-light-blue-50">{name}</span>
            </div>

            <div
                className="relative group"
                style={{
                    lineHeight: 1.15,
                }}
                onClick={valueOnClickHandler}
            >
                <span
                    className={classNames(
                        'inline-block max-w-[170px] overflow-hidden whitespace-nowrap text-ellipsis',
                        {
                            'cursor-pointer': clickToCopy,
                        }
                    )}
                >
                    {value}
                </span>

                {clickToCopy && (
                    <div
                        className={`
                                absolute bottom-[25px] left-[-50px] w-[200px] p-1 text-xs z-50
                                bg-custom-background border border-custom-light-blue-50  
                                hidden group-hover:block break-words
                            `}
                    >
                        <p>{value}</p>
                        <div className="mt-1 flex items-center">
                            {/* <calcite-icon icon="copy-to-clipboard" scale="s" style={{opacity: .75}}></calcite-icon> */}
                            <span>
                                {hasCopied2Clipboard
                                    ? `Copied to clipboard`
                                    : 'Click to copy to clipboard.'}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export const SceneInfoTable: FC<Props> = ({ data }: Props) => {
    const getContent = () => {
        if (!data || !data.length) {
            return (
                <div className="text-xs opacity-80 text-center mx-auto max-w-[240px]">
                    <p className="my-3 mx-3">
                        Select an acquisition date in Calendar to find a scene.
                    </p>

                    <p>
                        Scenes are displayed based on their intersection with
                        the map&#39;s center.
                    </p>
                </div>
            );
        }

        return (
            <div
                className="grid grid-cols-2 text-xs"
                data-element="scene-info-table" // this [data-element] attribute will be used to monitor the health of the app
            >
                {data.map((d: SceneInfoTableData) => {
                    return <SceneInfoRow key={generateUID()} {...d} />;
                })}
            </div>
        );
    };
    return (
        <div
            className={classNames('analyze-tool-and-scene-info-container', {
                'is-disabled': data.length === 0,
            })}
        >
            <div className="text-center mb-3 mt-1">
                <h4 className="uppercase text-sm">Scene Information</h4>
            </div>
            {getContent()}
        </div>
    );
};
