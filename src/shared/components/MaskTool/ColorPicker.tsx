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

import React, { useEffect, useRef, useState, FC } from 'react';
import './ColorPicker.css';
import useOnClickOutside from '@shared/hooks/useOnClickOutside';
import classNames from 'classnames';
import {
    CalciteColorPicker,
    CalciteIcon,
} from '@esri/calcite-components-react';

type Props = {
    color: number[];
    onChange: (color: number[]) => void;
};

export const ColorPicker: FC<Props> = ({ color, onChange }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // const calciteColorPickerRef = useRef<any>();

    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

    useOnClickOutside(containerRef, () => {
        setShowColorPicker(false);
    });

    useEffect(() => {
        // calciteColorPickerRef.current.addEventListener(
        //     'calciteColorPickerChange',
        //     (evt: any) => {
        //         console.log(evt.target.value);
        //         if (!evt?.target?.value) {
        //             return;
        //         }
        //         const { r, g, b } = evt.target.value || {};
        //         onChange([r, g, b]);
        //     }
        // );
    }, []);

    return (
        <div className="relative color-picker-custom-style" ref={containerRef}>
            <div
                className={classNames('absolute right-0 bottom-6 z-50', {
                    hidden: showColorPicker === false,
                })}
            >
                <CalciteColorPicker
                    // ref={calciteColorPickerRef}
                    format="rgb"
                    savedDisabled
                    channelsDisabled
                    scale="s"
                    value={{
                        r: color[0],
                        g: color[1],
                        b: color[2],
                    }}
                    onCalciteColorPickerChange={(evt: any) => {
                        console.log(evt.target.value);

                        if (!evt?.target?.value) {
                            return;
                        }

                        const { r, g, b } = evt.target.value || {};

                        onChange([r, g, b]);
                    }}
                />
            </div>

            <div
                className="flex items-center border border-custom-light-blue-50 p-1 cursor-pointer"
                onClick={setShowColorPicker.bind(null, !showColorPicker)}
            >
                <div
                    className="w-4 h-4"
                    style={{
                        background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                    }}
                ></div>

                <div className="flex items-center ml-1 ">
                    <CalciteIcon icon="caret-down" scale="s" />
                </div>
            </div>
        </div>
    );
};
