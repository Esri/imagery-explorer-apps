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
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { SpectralIndex } from '@typing/imagery-service';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { useTranslation } from 'react-i18next';

export type ActiveScene4ChangeCompareTool = 'scene a' | 'scene b';

type Props = {
    activeScene: ActiveScene4ChangeCompareTool;
    /**
     * if true, user is viewing change compare layer on the map
     */
    changeCompareLayerIsOn: boolean;
    /**
     * if true, view change button shouldbe disabled
     */
    viewChangeButtonDisabled: boolean;
    /**
     * query params for selected Scene A
     */
    queryParams4SceneA: QueryParams4ImageryScene;
    /**
     * query params for selected Scene B
     */
    queryParams4SceneB: QueryParams4ImageryScene;
    // /**
    //  * emits when user selects a new spectral index
    //  * @param val
    //  * @returns
    //  */
    // selectedSpectralIndexOnChange: (val: SpectralIndex) => void;
    /**
     * emits when user clicks on view change button
     * @returns
     */
    viewChangeButtonOnClick: () => void;
    /**
     * emits when user selects an active scene
     * @returns
     */
    activeSceneOnChange: (val: ActiveScene4ChangeCompareTool) => void;
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
        </div>
    );
};

export const ChangeCompareLayerSelector: FC<Props> = ({
    activeScene,
    changeCompareLayerIsOn,
    queryParams4SceneA,
    queryParams4SceneB,
    activeSceneOnChange,
    viewChangeButtonOnClick,
    // selectedSpectralIndexOnChange,
    viewChangeButtonDisabled,
}) => {
    const { t } = useTranslation();

    return (
        <div>
            {/* <div className="mb-2">
                <Dropdown
                    data={[
                        {
                            label: 'VEGETATION',
                            value: 'vegetation' as SpectralIndex,
                            selected: false,
                        },
                    ]}
                    onChange={(val: SpectralIndex) => {
                        // acquisitionYearOnChange(+val);
                    }}
                />
            </div> */}

            <div className={classNames('relative mb-1')}>
                <Button
                    appearance={
                        activeScene === 'scene a' &&
                        changeCompareLayerIsOn === false
                            ? 'solid'
                            : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activeSceneOnChange('scene a');
                    }}
                    decorativeIndicator={
                        activeScene === 'scene a' &&
                        changeCompareLayerIsOn === false
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
            </div>

            {/* <div className='text-center leading-none'>
                <span>-</span>
            </div> */}

            <div className={classNames('relative mb-1')}>
                <Button
                    appearance={
                        activeScene === 'scene b' &&
                        changeCompareLayerIsOn === false
                            ? 'solid'
                            : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activeSceneOnChange('scene b');
                    }}
                    decorativeIndicator={
                        activeScene === 'scene b' &&
                        changeCompareLayerIsOn === false
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
            </div>

            {/* <div className='text-center leading-none'>
                <span>=</span>
            </div> */}

            <div
                className={classNames('relative', {
                    'is-disabled': viewChangeButtonDisabled,
                })}
            >
                <Button
                    appearance={
                        changeCompareLayerIsOn ? 'solid' : 'transparent'
                    }
                    scale="s"
                    onClickHandler={viewChangeButtonOnClick}
                    decorativeIndicator={
                        changeCompareLayerIsOn === true ? 'left' : null
                    }
                >
                    <div className="text-xs normal-case">
                        <span className="uppercase">{t('view_change')}</span>
                        <br />
                        <span>{t('scene_a_scene_b')}</span>
                    </div>
                </Button>
            </div>
        </div>
    );
};
