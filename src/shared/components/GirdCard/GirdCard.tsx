import classNames from 'classnames';
import React, { FC } from 'react';

type Props = {
    /**
     * label text to be displayed at bottom of the card
     */
    label?: string;
    /**
     * url of the background thumbnail image
     */
    thumbnail: string;
    /**
     * if true, use the "selected" style
     */
    selected: boolean;
    /**
     * emits when user clicks on this card
     * @returns
     */
    onClick: () => void;
};

/**
 * This is a tiny rectangle card that will be used to populate the "Renderer" and "Interesting Places" grid list
 * @param param0
 * @returns
 */
export const GirdCard: FC<Props> = ({
    label,
    thumbnail,
    selected,
    onClick,
}) => {
    return (
        <div
            className={classNames('relative w-24 h-12 bg-cover cursor-pointer')}
            style={{
                background: `url(${thumbnail})`,
            }}
            onClick={onClick}
        >
            <div
                className={classNames('absolute top-0 left-0 w-full h-full', {
                    'border-2': selected,
                    'border-custom-light-blue': selected,
                    'drop-shadow-custom-light-blue': selected,
                })}
                style={{
                    background: `linear-gradient(0deg, rgba(2,28,36,1) 0%, rgba(2,28,36,0.6) 30%, rgba(2,28,36,0) 50%, rgba(2,28,36,0) 100%)`,
                }}
            ></div>

            <div className="absolute bottom-0 left-0 right-0 text-center text-ellipsis whitespace-nowrap overflow-hidden z-10">
                <span className="text-xs">{label}</span>
            </div>
        </div>
    );
};
