import { debounce } from '@shared/utils/snippets/debounce';
import classNames from 'classnames';
import React, { FC, useState } from 'react';

type Props = {
    content: string;
    width?: number;
    children?: React.ReactNode;
};

export const Tooltip: FC<Props> = ({ content, width = 130, children }) => {
    const [visible, setIsVisible] = useState<boolean>(false);

    const toggleTooltipVisibility = debounce((val: boolean) => {
        setIsVisible(val);
    }, 150);

    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
                toggleTooltipVisibility(true);
            }}
            onMouseLeave={() => {
                toggleTooltipVisibility(false);
            }}
        >
            {children}
            <div
                className={classNames(
                    'absolute inline-block left-1/2 bottom-[125%] translate-x-[-50%] bg-custom-background text-custom-light-blue-90 p-1 px-2 border border-custom-light-blue-50 text-xs z-10',
                    {
                        hidden: visible === false,
                    }
                )}
                dangerouslySetInnerHTML={{ __html: content }}
                style={{
                    width: `${width}px`,
                }}
            ></div>
        </div>
    );
};
