import './Button.css';
import classNames from 'classnames';
import React, { FC } from 'react';

type ButtonAppearance = 'solid' | 'transparent';

type Props = {
    /**
     * The appearence of the button
     */
    appearance?: ButtonAppearance;
    /**
     * If true, the button should occupy the full height of the parent container
     */
    fullHeight?: boolean;

    children?: React.ReactNode;
    /**
     * scale/size of the button
     */
    scale?: 's' | 'm';
    /**
     * indicate the side that a decorative indicator should be added to
     */
    decorativeIndicator?: 'left' | 'right';
    /**
     * fire when user clicks the button
     * @returns
     */
    onClickHandler: () => void;
};

export const Button: FC<Props> = ({
    appearance = 'transparent',
    fullHeight = false,
    onClickHandler,
    children,
    scale = 'm',
    decorativeIndicator,
}: Props) => {
    return (
        <div
            className={classNames(
                'relative p-2 px-0 border min-w-[8rem] shrink-0 text-sm border-custom-light-blue border-opacity-50 uppercase cursor-pointer text-center select-none',
                {
                    'bg-custom-light-blue': appearance === 'solid',
                    'text-custom-background': appearance === 'solid',
                    'drop-shadow-custom-light-blue-50': appearance === 'solid',
                    'bg-custom-background': appearance === 'transparent',
                    'text-custom-light-blue': appearance === 'transparent',
                    'h-full': fullHeight,
                    'flex items-center': fullHeight,
                    'md:text-base': scale === 'm',
                    'min-w-[6rem]': scale === 's',
                    'horizontal-indicator-on-right':
                        decorativeIndicator === 'right',
                    'horizontal-indicator-on-left':
                        decorativeIndicator === 'left',
                }
            )}
            onClick={onClickHandler}
        >
            <div className="w-full">{children}</div>
        </div>
    );
};
