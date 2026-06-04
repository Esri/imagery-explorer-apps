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
import React, { FC } from 'react';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { useTranslation } from 'react-i18next';
import { Button } from '@shared/components/Button';
import { ViewCompositeLayerButton } from '@shared/components/TemporalCompositeLayerSelector/TemporalCompositeLayerSelector';
import { getTimeStrInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import CompositeIndicatorRed from '@shared/components/TemporalCompositeLayerSelector/images/Composite_Red.png';

export type ActiveScene4ChangeCompareTool = 'scene a' | 'scene b';

type Props = {
    activeScene: ActiveScene4ChangeCompareTool;
    /**
     * if true, user is viewing the temporal composite layer on the map, which is the layer that composites Scene A and Scene B together
     */
    isTemporalCompositeLayerOn: boolean;
    /**
     * if true,  view composite layer button is disabled, because the composite layer cannot be turned on the map without selecting both Scene A and Scene B
     */
    viewCompositeLayerDisabled: boolean;
    /**
     * query params for selected Scene A
     */
    queryParams4SceneA: QueryParams4ImageryScene;
    /**
     * query params for selected Scene B
     */
    queryParams4SceneB: QueryParams4ImageryScene;
    /**
     * emits when user clicks on view composite layer button to toggle the temporal composite layer on the map
     * @returns
     */
    viewCompositeLayerButtonOnClick: () => void;
    /**
     * emits when user selects an active scene
     * @returns
     */
    activeSceneOnChange: (val: ActiveScene4ChangeCompareTool) => void;
    /**
     * Emits when user clicks on swap button to swap Scene A and Scene B
     * @returns
     */
    swapButtonOnClick: () => void;
};

type ButtonTextLabelProps = {
    nameOfScene: ActiveScene4ChangeCompareTool;
    queryParams4ActiveScene: QueryParams4ImageryScene;
};

const ButtonTextLabel: FC<ButtonTextLabelProps> = ({
    nameOfScene,
    queryParams4ActiveScene,
}) => {
    const { t } = useTranslation();

    const nameLabel = nameOfScene === 'scene a' ? t('scene_a') : t('scene_b');

    if (!queryParams4ActiveScene || !queryParams4ActiveScene.acquisitionDate) {
        return (
            <div className="text-xs normal-case">
                <span>{t('choose')}</span>
                <br />
                <span className="uppercase">{nameLabel}</span>
            </div>
        );
    }

    return (
        <div className="text-xs normal-case">
            <span className="uppercase">{nameLabel}</span>
            <br />
            <span className="">{queryParams4ActiveScene.acquisitionDate}</span>
            <br />
            <span>
                {getTimeStrInUTCTimeZone(
                    queryParams4ActiveScene.acquisitionTimestampOfSelectedScene,
                    true
                )}
            </span>
        </div>
    );
};

export const DRXTemporalCompositeLayerSelector: FC<Props> = ({
    activeScene,
    isTemporalCompositeLayerOn,
    queryParams4SceneA,
    queryParams4SceneB,
    activeSceneOnChange,
    viewCompositeLayerButtonOnClick,
    swapButtonOnClick,
    viewCompositeLayerDisabled,
}) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className={classNames('relative mb-1')}>
                <Button
                    appearance={
                        activeScene === 'scene a' &&
                        isTemporalCompositeLayerOn === false
                            ? 'solid'
                            : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activeSceneOnChange('scene a');
                    }}
                    decorativeIndicator={
                        activeScene === 'scene a' &&
                        isTemporalCompositeLayerOn === false
                            ? 'left'
                            : null
                    }
                >
                    {/* <div className="text-xs normal-case">
                        <span>choose</span>
                        <br />
                        <span className="uppercase">scene a</span>
                    </div> */}
                    <ButtonTextLabel
                        nameOfScene={'scene a'}
                        queryParams4ActiveScene={queryParams4SceneA}
                    />
                </Button>

                <div
                    className="absolute top-0 left-0"
                    style={{
                        width: 0,
                        height: 0,
                        borderTop: '12px solid red',
                        borderRight: '12px solid transparent',
                    }}
                />
            </div>

            {/* <div className='text-center leading-none'>
                <span>-</span>
            </div> */}

            <div
                data-testid="temporal-composite-tool-swap-button"
                className="flex justify-center cursor-pointer w-full my-1"
                title="swap scene a and scene b"
                onClick={swapButtonOnClick}
            >
                <calcite-icon icon="arrow-up-down" scale="s" />
            </div>

            <div className={classNames('relative mb-1')}>
                <Button
                    appearance={
                        activeScene === 'scene b' &&
                        isTemporalCompositeLayerOn === false
                            ? 'solid'
                            : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activeSceneOnChange('scene b');
                    }}
                    decorativeIndicator={
                        activeScene === 'scene b' &&
                        isTemporalCompositeLayerOn === false
                            ? 'left'
                            : null
                    }
                >
                    {/* <div className="text-xs normal-case">
                        <span>choose</span>
                        <br />
                        <span className="uppercase">scene b</span>
                    </div> */}
                    <ButtonTextLabel
                        nameOfScene={'scene b'}
                        queryParams4ActiveScene={queryParams4SceneB}
                    />
                </Button>

                <div
                    className="absolute top-0 left-0"
                    style={{
                        width: 0,
                        height: 0,
                        borderTop: '12px solid cyan',
                        borderRight: '12px solid transparent',
                    }}
                />
            </div>

            <div
                className={classNames('relative mt-2', {
                    'is-disabled': viewCompositeLayerDisabled,
                })}
            >
                <ViewCompositeLayerButton
                    isCompositeLayerOn={isTemporalCompositeLayerOn}
                    hideLegend={true}
                    viewCompositeLayerButtonOnClick={
                        viewCompositeLayerButtonOnClick
                    }
                />
            </div>
        </div>
    );
};
