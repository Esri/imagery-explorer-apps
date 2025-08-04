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

import classNames from 'classnames';

// import { SpectralIndex } from '@typing/imagery-service';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { Button } from '@shared/components/Button';

import CompositeIndicatorRed from './images/Composite_Red.png';
import CompositeIndicatorGreen from './images/Composite_Green.png';
import CompositeIndicatorBlue from './images/Composite_Blue.png';
import CompositeIndicatorRGB from './images/Composite_RGB.png';
import { formatFormattedDateStrInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';
import { CalciteIcon } from '@esri/calcite-components-react';

type Props = {
    /**
     * Id of the query params for the selected imagery scene
     */
    idOfSelectedQueryParams: string;
    /**
     * query params of the imagery scene to be used as the red band
     */
    queryParams4ImagerySceneOfRedBand: QueryParams4ImageryScene;
    /**
     * query params of the imagery scene to be used as the green band
     */
    queryParams4ImagerySceneOfGreenBand: QueryParams4ImageryScene;
    /**
     * query params of the imagery scene to be used as the blue band
     */
    queryParams4ImagerySceneOfBlueBand: QueryParams4ImageryScene;
    /**
     * if true, show the temporal composite layer
     */
    isCompositeLayerOn: boolean;
    /**
     * if true, the "View Composite" button should be disabled.
     * This happens if one of the RGB band layer does not have a acquisition date selected
     */
    viewCompositeLayerDisabled: boolean;
    /**
     * Emits when user selects an imagery scene for a particular band
     * @param uniqueId Id of the query params for the imagery scene that user selects
     * @returns void
     */
    activeSceneOnChange: (uniqueId: string) => void;
    /**
     * Emits when use clicks on the "View Composite" button
     * @returns void
     */
    viewCompositeLayerButtonOnClick: () => void;
    /**
     * Emits when use clicks on the swap button
     * @returns void
     */
    swapButtonOnClick: (indexOfSceneA: number, indexOfSceneB: number) => void;
};

type ButtonTextLabelProps = {
    nameOfScene: string;
    queryParams: QueryParams4ImageryScene;
};

const ButtonTextLabel: FC<ButtonTextLabelProps> = ({
    nameOfScene,
    queryParams,
}) => {
    if (!queryParams || !queryParams.acquisitionDate) {
        return (
            <div className="text-xs normal-case">
                <span>{nameOfScene}</span>
                {/* <br />
                <span className="uppercase">{nameOfScene}</span> */}
            </div>
        );
    }

    return (
        <div className="text-xs normal-case">
            <span className="">
                {formatFormattedDateStrInUTCTimeZone(
                    queryParams.acquisitionDate
                )}
            </span>
        </div>
    );
};

export const TemporalCompositeLayerSelector: FC<Props> = ({
    idOfSelectedQueryParams,
    queryParams4ImagerySceneOfRedBand,
    queryParams4ImagerySceneOfGreenBand,
    queryParams4ImagerySceneOfBlueBand,
    isCompositeLayerOn,
    viewCompositeLayerDisabled,
    activeSceneOnChange,
    viewCompositeLayerButtonOnClick,
    swapButtonOnClick,
}) => {
    const { t } = useTranslation();

    if (
        !queryParams4ImagerySceneOfRedBand ||
        !queryParams4ImagerySceneOfGreenBand ||
        !queryParams4ImagerySceneOfBlueBand
    ) {
        return null;
    }

    const shouldHighlightScene4Red =
        queryParams4ImagerySceneOfRedBand?.uniqueId ===
            idOfSelectedQueryParams && isCompositeLayerOn === false;

    const shouldHighlightScene4Green =
        queryParams4ImagerySceneOfGreenBand?.uniqueId ===
            idOfSelectedQueryParams && isCompositeLayerOn === false;

    const shouldHighlightScene4Blue =
        queryParams4ImagerySceneOfBlueBand?.uniqueId ===
            idOfSelectedQueryParams && isCompositeLayerOn === false;

    return (
        <div>
            <div className={classNames('relative mb-1')}>
                <Button
                    appearance={
                        shouldHighlightScene4Red ? 'solid' : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activeSceneOnChange(
                            queryParams4ImagerySceneOfRedBand.uniqueId
                        );
                    }}
                    decorativeIndicator={
                        shouldHighlightScene4Red ? 'left' : null
                    }
                >
                    <div className="text-xs normal-case">
                        {/* <span>choose</span>
                        <br />
                        <span className="uppercase">scene for Red</span> */}
                        <ButtonTextLabel
                            nameOfScene={t('choose_red_band', { ns: APP_NAME })}
                            queryParams={queryParams4ImagerySceneOfRedBand}
                        />
                    </div>
                </Button>

                <img
                    src={CompositeIndicatorRed}
                    className="absolute top-0 left-0"
                />
            </div>

            <div
                className="flex justify-center cursor-pointer w-full"
                title={t('swap_red_green', { ns: APP_NAME })}
                onClick={swapButtonOnClick.bind(null, 0, 1)}
            >
                <CalciteIcon icon="arrow-up-down" scale="s" />
            </div>

            <div className={classNames('relative mb-1')}>
                <Button
                    appearance={
                        shouldHighlightScene4Green ? 'solid' : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activeSceneOnChange(
                            queryParams4ImagerySceneOfGreenBand.uniqueId
                        );
                    }}
                    decorativeIndicator={
                        shouldHighlightScene4Green ? 'left' : null
                    }
                >
                    <div className="text-xs normal-case">
                        {/* <span>choose</span>
                        <br />
                        <span className="uppercase">scene for Green</span> */}
                        <ButtonTextLabel
                            nameOfScene={t('choose_green_band', {
                                ns: APP_NAME,
                            })}
                            queryParams={queryParams4ImagerySceneOfGreenBand}
                        />
                    </div>
                </Button>

                <img
                    src={CompositeIndicatorGreen}
                    className="absolute top-0 left-0"
                />
            </div>

            <div
                className="flex justify-center cursor-pointer w-full"
                title={t('swap_green_blue', { ns: APP_NAME })}
                onClick={swapButtonOnClick.bind(null, 1, 2)}
            >
                <CalciteIcon icon="arrow-up-down" scale="s" />
            </div>

            <div className={classNames('relative mb-1')}>
                <Button
                    appearance={
                        shouldHighlightScene4Blue ? 'solid' : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activeSceneOnChange(
                            queryParams4ImagerySceneOfBlueBand.uniqueId
                        );
                    }}
                    decorativeIndicator={
                        shouldHighlightScene4Blue ? 'left' : null
                    }
                >
                    <div className="text-xs normal-case">
                        {/* <span>choose</span>
                        <br />
                        <span className="uppercase">scene for Blue</span> */}

                        <ButtonTextLabel
                            nameOfScene={t('choose_blue_band', {
                                ns: APP_NAME,
                            })}
                            queryParams={queryParams4ImagerySceneOfBlueBand}
                        />
                    </div>
                </Button>

                <img
                    src={CompositeIndicatorBlue}
                    className="absolute top-0 left-0"
                />
            </div>

            <div
                className={classNames('relative mt-4', {
                    'is-disabled': viewCompositeLayerDisabled,
                })}
            >
                <Button
                    appearance={isCompositeLayerOn ? 'solid' : 'transparent'}
                    scale="s"
                    onClickHandler={viewCompositeLayerButtonOnClick}
                    decorativeIndicator={
                        isCompositeLayerOn === true ? 'left' : null
                    }
                >
                    <div className="text-xs normal-case">
                        <span className="uppercase">
                            {t('view_composite', { ns: APP_NAME })}
                        </span>
                    </div>
                </Button>

                <img
                    src={CompositeIndicatorRGB}
                    className="absolute top-0 left-0"
                />
            </div>
        </div>
    );
};
