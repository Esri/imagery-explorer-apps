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
    /**
     * fire when user clicks the button
     * @returns
     */
    onClickHandler: () => void;
    children?: React.ReactNode;
    /**
     * scale/size of the button
     */
    scale?: 's' | 'm';
};

export const Button: FC<Props> = ({
    appearance = 'transparent',
    fullHeight = false,
    onClickHandler,
    children,
    scale = 'm',
}: Props) => {
    return (
        <div
            className={classNames(
                'p-2 px-4 border min-w-[9rem] shrink-0 text-sm border-custom-light-blue border-opacity-50 uppercase cursor-pointer text-center',
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
                }
            )}
            onClick={onClickHandler}
        >
            <div className="w-full">{children}</div>
        </div>
    );
};
