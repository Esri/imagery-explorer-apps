import React, { FC } from 'react';

type Props = {
    title: string;
    subTitle?: string;
    expandButtonTooltip?: string;
    /**
     * Fires when click on the Open Icon
     */
    openButtonOnClick?: () => void;

    expandButtonOnClick?: () => void;
};

const HeaderText: FC<Props> = ({
    title,
    subTitle,
    expandButtonTooltip = '',
    openButtonOnClick,
    expandButtonOnClick,
}: Props) => {
    return (
        <div className="flex items-center justify-center mb-2 ">
            <h5 className="uppercase text-xs">
                <span className="opacity-90">{title}</span>
                {subTitle && <span className="opacity-50"> {subTitle}</span>}
            </h5>

            {openButtonOnClick && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 cursor-pointer opacity-50"
                    viewBox="0 0 16 16"
                    height="16"
                    width="16"
                    onClick={openButtonOnClick}
                >
                    <path
                        fill="currentColor"
                        d="M1 1h8v1H2v12h12V7h1v8H1zm7.325 7.382L14 2.707V5h1V1h-4v1h2.293L7.618 7.675z"
                    />
                    <path fill="none" d="M0 0h16v16H0z" />
                </svg>
            )}

            {expandButtonOnClick && (
                <div title={expandButtonTooltip} className="hidden md:block">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 cursor-pointer opacity-50"
                        viewBox="0 0 16 16"
                        height="16"
                        width="16"
                        onClick={expandButtonOnClick}
                    >
                        <path
                            fill="currentColor"
                            d="M9.644 5.649L13.244 2H11V1h4v4h-1V2.657L10.356 6.35zM2 13.343V11H1v4h4v-1H2.757l3.599-3.649-.712-.702zM11 15h4v-4h-1v2.243l-3.649-3.599-.702.712L13.343 14H11zM5 1H1v4h1V2.757l3.649 3.599.702-.712L2.657 2H5z"
                        />
                        <path fill="none" d="M0 0h16v16H0z" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default HeaderText;
