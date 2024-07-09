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

import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import RGBComposite from './img/RGBComposite.png';
import { formatFormattedDateStrInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import { ColorGroup, getColorGroup } from './helpers';
import classNames from 'classnames';

type Props = {
    isTemporalCompositeLayerOn: boolean;
    acquisitionDateOfImageryScene4RedBand: string;
    acquisitionDateOfImageryScene4GreenBand: string;
    acquisitionDateOfImageryScene4BlueBand: string;
};

type LegendLabelProps = {
    /**
     * name of color band: 'red' | 'green' | 'blue'
     */
    colorbandName: 'red' | 'green' | 'blue';
    /**
     * acqusition date of the selected imagery scene in format of 'YYYY-MM-DD'
     */
    formattedAcquisitionDate: string;
};

const SIZE_IMAGE = 120;

export const LegendLabel: FC<LegendLabelProps> = ({
    colorbandName,
    formattedAcquisitionDate,
}) => {
    return (
        <>
            <span className="uppercase">{colorbandName}</span>
            <br />
            <span className="opacity-50">
                {formattedAcquisitionDate
                    ? formatFormattedDateStrInUTCTimeZone(
                          formattedAcquisitionDate
                      )
                    : 'unselected'}
            </span>
        </>
    );
};

type TooltipData = {
    posX: number;
    posY: number;
    colorGroup: ColorGroup;
};

export const TemproalCompositeToolLegend: FC<Props> = ({
    isTemporalCompositeLayerOn,
    acquisitionDateOfImageryScene4RedBand,
    acquisitionDateOfImageryScene4GreenBand,
    acquisitionDateOfImageryScene4BlueBand,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>();
    const contextRef = useRef<CanvasRenderingContext2D>();

    const isDisabled = useMemo(() => {
        // legend should only be enabled when composite layer is on
        if (isTemporalCompositeLayerOn === false) {
            return true;
        }

        // legend should be disabled if imagery scene for one of color band does not have acquisition date selected
        if (
            !acquisitionDateOfImageryScene4RedBand ||
            !acquisitionDateOfImageryScene4GreenBand ||
            !acquisitionDateOfImageryScene4BlueBand
        ) {
            return true;
        }

        return false;
    }, [
        isTemporalCompositeLayerOn,
        acquisitionDateOfImageryScene4RedBand,
        acquisitionDateOfImageryScene4GreenBand,
        acquisitionDateOfImageryScene4BlueBand,
    ]);

    const [tooltipData, setTooltipData] = useState<TooltipData>();

    const tooltipContent: string[] = useMemo(() => {
        if (!tooltipData) {
            return null;
        }

        if (
            !acquisitionDateOfImageryScene4RedBand ||
            !acquisitionDateOfImageryScene4GreenBand ||
            !acquisitionDateOfImageryScene4BlueBand
        ) {
            return null;
        }

        const formattedDateRedBand = formatFormattedDateStrInUTCTimeZone(
            acquisitionDateOfImageryScene4RedBand
        );
        const formattedDateGreenBand = formatFormattedDateStrInUTCTimeZone(
            acquisitionDateOfImageryScene4GreenBand
        );
        const formattedDateBlueBand = formatFormattedDateStrInUTCTimeZone(
            acquisitionDateOfImageryScene4BlueBand
        );

        if (tooltipData.colorGroup === 'Red') {
            return [
                `Higher backscatter:`,
                `${formattedDateRedBand}`,
                `Lower backscatter:`,
                `${formattedDateGreenBand}`,
                `${formattedDateBlueBand}`,
            ];
        }

        if (tooltipData.colorGroup === 'Green') {
            return [
                `Higher backscatter:`,
                ` ${formattedDateGreenBand}`,
                `Lower backscatter:`,
                `${formattedDateRedBand}`,
                `${formattedDateBlueBand}`,
            ];
        }

        if (tooltipData.colorGroup === 'Blue') {
            return [
                `Higher backscatter:`,
                `${formattedDateBlueBand}`,
                `Lower backscatter:`,
                `${formattedDateRedBand}`,
                `${formattedDateGreenBand}`,
            ];
        }

        if (tooltipData.colorGroup === 'Yellow') {
            return [
                `Higher backscatter:`,
                `${formattedDateRedBand}`,
                `${formattedDateGreenBand}`,
                `Lower backscatter:`,
                `${formattedDateBlueBand}`,
            ];
        }

        if (tooltipData.colorGroup === 'Magenta') {
            return [
                `Higher backscatter: `,
                `${formattedDateRedBand}`,
                `${formattedDateBlueBand}`,
                `Lower backscatter: `,
                `${formattedDateGreenBand}`,
            ];
        }

        if (tooltipData.colorGroup === 'Cyan') {
            return [
                `Higher backscatter:`,
                ` ${formattedDateGreenBand}`,
                `${formattedDateBlueBand}`,
                `Lower backscatter:`,
                `${formattedDateRedBand}`,
            ];
        }

        return null;
    }, [
        tooltipData,
        acquisitionDateOfImageryScene4RedBand,
        acquisitionDateOfImageryScene4GreenBand,
        acquisitionDateOfImageryScene4BlueBand,
    ]);

    const pickColor = (event: React.MouseEvent) => {
        if (
            !acquisitionDateOfImageryScene4RedBand ||
            !acquisitionDateOfImageryScene4GreenBand ||
            !acquisitionDateOfImageryScene4BlueBand
        ) {
            return;
        }

        const bounding = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - bounding.left;
        const y = event.clientY - bounding.top;

        const pixel = contextRef.current.getImageData(x, y, 1, 1);
        const data = pixel.data;

        // const rgbColor = `rgb(${data[0]} ${data[1]} ${data[2]}})`;

        const colorGroup = getColorGroup(data[0], data[1], data[2]);

        const tooltipData: TooltipData = colorGroup
            ? {
                  posX: event.clientX,
                  posY: event.clientY,
                  colorGroup,
              }
            : null;

        setTooltipData(tooltipData);
    };

    useEffect(() => {
        const img = new Image();
        img.src = RGBComposite;

        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext('2d');

        img.addEventListener('load', () => {
            contextRef.current.drawImage(img, 0, 0, SIZE_IMAGE, SIZE_IMAGE);
        });
    }, []);

    return (
        <div
            className={classNames('relative text-center max-w-[220px]', {
                'is-disabled': isDisabled,
            })}
        >
            <div className="relative w-full text-center my-2">
                <canvas
                    ref={canvasRef}
                    className="inline-block"
                    width={SIZE_IMAGE}
                    height={SIZE_IMAGE}
                    onMouseMove={pickColor}
                    onMouseOut={setTooltipData.bind(null, null)}
                />

                <div className="absolute top-[20px] left-[-25px] text-right text-xs w-[75px]">
                    <LegendLabel
                        colorbandName="red"
                        formattedAcquisitionDate={
                            acquisitionDateOfImageryScene4RedBand
                        }
                    />
                </div>

                <div className="absolute top-[0px] right-[-25px] text-left text-xs w-[75px]">
                    <LegendLabel
                        colorbandName="green"
                        formattedAcquisitionDate={
                            acquisitionDateOfImageryScene4GreenBand
                        }
                    />
                </div>

                <div className="absolute bottom-[0px] right-[-5px] text-left text-xs w-[75px]">
                    <LegendLabel
                        colorbandName="blue"
                        formattedAcquisitionDate={
                            acquisitionDateOfImageryScene4BlueBand
                        }
                    />
                </div>
            </div>

            <p className="text-xs opacity-50">
                Lighter colors are higher overall backscatter and darker colors
                are lower.
            </p>

            {tooltipData && tooltipContent && (
                <div
                    className="fixed bg-custom-background border border-custom-light-blue-50 max-w-[250px] px-2 py-1 text-left leading-none"
                    style={{
                        left: tooltipData.posX + 10,
                        top: tooltipData.posY - 30,
                    }}
                >
                    {/* <span className="text-xs">{tooltipContent[0]}</span>
                    <br />
                    <span className="text-xs">{tooltipContent[1]}</span> */}
                    {tooltipContent.map((text, index) => {
                        const key = `${text}-${index}`;
                        return (
                            <p key={key} className="text-xs">
                                {text}
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
