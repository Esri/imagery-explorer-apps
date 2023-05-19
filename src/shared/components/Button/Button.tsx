import classNames from 'classnames';
import React, { FC } from 'react';

type ButtonAppearance = 'solid' | 'transparent';

type Props = {
    /**
     * The appearence of the button
     */
    appearance?: ButtonAppearance;
    onClickHandler: () => void;
    children?: React.ReactNode;
};

export const Button: FC<Props> = ({
    appearance = 'transparent',
    onClickHandler,
    children,
}: Props) => {
    return (
        <div
            className={classNames(
                'p-2 px-4 border min-w-[9rem] shrink-0 text-sm md:text-base border-custom-light-blue border-opacity-50 uppercase cursor-pointer text-center',
                {
                    'bg-custom-light-blue': appearance === 'solid',
                    'text-custom-background': appearance === 'solid',
                    'drop-shadow-custom-light-blue': appearance === 'solid',
                    'bg-custom-background': appearance === 'transparent',
                    'text-custom-light-blue': appearance === 'transparent',
                }
            )}
            onClick={onClickHandler}
        >
            {children}
        </div>
    );
};
