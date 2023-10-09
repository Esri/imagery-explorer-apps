import classNames from 'classnames';
import React, { FC } from 'react';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { SpectralIndex } from '@typing/imagery-service';
import { ActiveScene4ChangeCompareTool } from '@shared/store/ChangeCompareTool/reducer';

type Props = {
    activeScene: ActiveScene4ChangeCompareTool;
    /**
     * if true, user is viewing change on the map
     */
    isViewingChange: boolean;
    /**
     * if true, view change button shouldbe disabled
     */
    viewChangeButtonDisabled: boolean;
    /**
     * emits when user selects a new spectral index
     * @param val
     * @returns
     */
    selectedSpectralIndexOnChange: (val: SpectralIndex) => void;
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

export const ChangeCompareLayerSelector: FC<Props> = ({
    activeScene,
    isViewingChange,
    activeSceneOnChange,
    viewChangeButtonOnClick,
    selectedSpectralIndexOnChange,
    viewChangeButtonDisabled,
}) => {
    return (
        <div>
            <div className="mb-2">
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
            </div>

            <div className={classNames('relative mb-1')}>
                <Button
                    appearance={
                        activeScene === 'scene a' && isViewingChange === false
                            ? 'solid'
                            : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activeSceneOnChange('scene a');
                    }}
                    // decorativeIndicator={
                    //     selectedSide === 'left' ? 'left' : null
                    // }
                >
                    <div className="text-xs normal-case">
                        <span>choose</span>
                        <br />
                        <span className="uppercase">scene a</span>
                    </div>
                </Button>
            </div>

            {/* <div className='text-center leading-none'>
                <span>-</span>
            </div> */}

            <div className={classNames('relative mb-1')}>
                <Button
                    appearance={
                        activeScene === 'scene b' && isViewingChange === false
                            ? 'solid'
                            : 'transparent'
                    }
                    scale="s"
                    onClickHandler={() => {
                        activeSceneOnChange('scene b');
                    }}
                    // decorativeIndicator={
                    //     selectedSide === 'left' ? 'left' : null
                    // }
                >
                    <div className="text-xs normal-case">
                        <span>choose</span>
                        <br />
                        <span className="uppercase">scene b</span>
                    </div>
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
                    appearance={isViewingChange ? 'solid' : 'transparent'}
                    scale="s"
                    onClickHandler={viewChangeButtonOnClick}
                    // decorativeIndicator={
                    //     selectedSide === 'left' ? 'left' : null
                    // }
                >
                    <div className="text-xs normal-case">
                        <span className="uppercase">view change</span>
                        <br />
                        <span>Scene A - Scene B</span>
                    </div>
                </Button>
            </div>
        </div>
    );
};
