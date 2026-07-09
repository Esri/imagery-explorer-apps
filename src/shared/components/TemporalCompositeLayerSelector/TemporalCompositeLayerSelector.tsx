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
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import CompositeIndicatorRGB from './images/Composite_RGB.png';

type ViewCompositeButtonProps = {
    /**
     * if true, the temporal composite layer is currently turned on the map
     */
    isCompositeLayerOn: boolean;
    /**
     * If true, the legend of the button on top left corner will be hidden
     */
    hideLegend?: boolean;
    /**
     * Emits when user clicks the button to toggle the temporal composite layer on the map
     * @returns
     */
    viewCompositeLayerButtonOnClick: () => void;
};

/**
 * This component is the button that toggles the temporal composite layer on the map.
 * It is used in the TemporalCompositeLayerSelector component. The button will have a decorative RGB indicator when the composite layer is on, and will not have the indicator when the composite layer is off.
 */
export const ViewCompositeLayerButton: FC<ViewCompositeButtonProps> = ({
    isCompositeLayerOn,
    hideLegend = false,
    viewCompositeLayerButtonOnClick,
}) => {
    const { t } = useTranslation();

    return (
        <div>
            <Button
                appearance={isCompositeLayerOn ? 'solid' : 'transparent'}
                scale="s"
                onClickHandler={viewCompositeLayerButtonOnClick}
                decorativeIndicator={
                    isCompositeLayerOn === true ? 'left' : null
                }
                label="view composite layer"
            >
                <div className="text-xs normal-case">
                    <span className="uppercase">{t('view_composite')}</span>
                </div>
            </Button>

            {hideLegend !== true && (
                <img
                    src={CompositeIndicatorRGB}
                    className="absolute top-0 left-0"
                />
            )}
        </div>
    );
};
