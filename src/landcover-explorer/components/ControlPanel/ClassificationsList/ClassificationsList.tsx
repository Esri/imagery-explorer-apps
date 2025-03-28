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
import React, { FC, useRef } from 'react';
import {
    LandCoverClassification,
    LandcoverClassificationData,
} from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { TooltipData } from '@shared/store/UI/reducer';
import HeaderText from '../HeaderText/HeaderText';
import useGetTooltipPositionOnHover from '@shared/hooks/useGetTooltipPositionOnHover';
import { APP_NAME } from '@shared/config';
import { useTranslation } from 'react-i18next';

type Props = {
    /**
     * array of Land Cover classifications data (from Sentinel2_10m_LandCover layer) that contains Name, Color and Description of each land cover type
     */
    data: LandcoverClassificationData[];
    /**
     * a specific land cover type selected by the user that will be used to filter the Land Cover Layer
     */
    selectedLandCover: LandCoverClassification;
    /**
     * Fires when user clicks a land cover item in the list
     */
    activeLandCoverOnChange: (data?: LandCoverClassification) => void;
    /**
     * Fires when users hovers a land cover item in th list
     */
    itemOnHover: (data?: TooltipData) => void;
    /**
     * If true, all items are disabled, this can happen when the animation mode is on
     */
    disabled?: boolean;
};

const ClassificationsList: FC<Props> = ({
    data,
    selectedLandCover,
    itemOnHover,
    activeLandCoverOnChange,
    disabled,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>();
    useGetTooltipPositionOnHover(containerRef);

    const { t } = useTranslation();

    return (
        <div
            className="text-center mx-4 my-12 md:my-0 shrink-0"
            ref={containerRef}
        >
            <HeaderText
                title={t('classes_selector_title', { ns: APP_NAME })} // Translate the title
                subTitle={t('classes_selector_subTitle', { ns: APP_NAME })} // Translate the subtitle
            />

            <div
                className={classNames(
                    'grid grid-cols-3 h-28 text-sm',
                    'mt-0 md:mt-8', // only add top margin space for the desktop view
                    { 'disabled-when-animation-mode-is-on': disabled }
                )}
            >
                {data
                    .filter((d) => d.ClassName !== 'No Data')
                    .map((d: LandcoverClassificationData) => {
                        const { Value, ClassName, Color, Description } = d;

                        const [Red, Green, Blue] = Color;

                        const isSelected = ClassName === selectedLandCover;

                        // const classNameTranslationKey = ClassName.replace(/\s/g, '_'); // Replace spaces with underscores for translation key
                        const descriptionTranslationKey =
                            ClassName + '_description'; // Create a translation key for the description

                        const classNameTranslated = t(ClassName, {
                            ns: APP_NAME,
                            defaultValue: ClassName, // Fallback to the original ClassName if translation is not available
                        }); // Translate the ClassName

                        const descriptionTranslated = t(
                            descriptionTranslationKey,
                            {
                                ns: APP_NAME,
                                defaultValue: Description, // Fallback to the original Description if translation is not available
                            }
                        ); // Translate the Description

                        return (
                            <div
                                key={Value}
                                className={classNames(
                                    'flex items-center cursor-pointer',
                                    {
                                        'opacity-50':
                                            selectedLandCover &&
                                            isSelected === false,
                                    }
                                )}
                                onClick={() => {
                                    const newVal =
                                        isSelected === false ? ClassName : null;

                                    activeLandCoverOnChange(newVal);
                                }}
                                onMouseEnter={() => {
                                    itemOnHover({
                                        title: classNameTranslated,
                                        content: descriptionTranslated,
                                    });
                                }}
                                onMouseLeave={() => {
                                    itemOnHover(null);
                                }}
                            >
                                <div
                                    className="w-4 h-4 shrink-0 border-2 border-white rounded-full"
                                    style={{
                                        background: `rgb(${Red}, ${Green}, ${Blue})`,
                                    }}
                                ></div>

                                <span className="ml-2 text-xs 2xl:text-sm">
                                    {/* {ClassName} */}
                                    {classNameTranslated}
                                </span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ClassificationsList;
