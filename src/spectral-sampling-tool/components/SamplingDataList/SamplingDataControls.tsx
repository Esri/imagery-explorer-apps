import classNames from 'classnames';
import React, { FC } from 'react';

type Props = {
    /**
     * if ture, Add a Frame Button should be disabled.
     * This happenes when number of frames hits the upper limit
     */
    shouldDisableAddButton?: boolean;
    /**
     * fires when user clicks on "Add A Scene" button
     * @returns void
     */
    addButtonOnClick: () => void;
};

export const SamplingDataControls: FC<Props> = ({
    shouldDisableAddButton,
    addButtonOnClick,
}) => {
    return (
        <div
            className={classNames(
                'w-full cursor-pointer text-center flex items-center',
                {
                    'is-disabled': shouldDisableAddButton,
                }
            )}
            onClick={addButtonOnClick}
        >
            <calcite-icon icon="plus" scale="s" />
            <span
                className=" text-custom-light-blue uppercase ml-1 underline"
                style={{
                    fontSize: `.7rem`,
                }}
            >
                Add A Sampling Point
            </span>
        </div>
    );
};
