import { Button } from '@shared/components/Button';
import classNames from 'classnames';
import React, { FC } from 'react';

type SaveOptionButtonProps = {
    title: string;
    subtitle: string;
    desciprtion: string;
    disabled: boolean;
    /**
     * extra message to show
     */
    message?: string;
    onClick: () => void;
};

export const SAVE_OPTION_ROW_CLASS =
    'w-full grid grid-cols-save-option-list gap-4 md:gap-12 items-center';

export const SaveOptionButton: FC<SaveOptionButtonProps> = ({
    title,
    subtitle,
    desciprtion,
    message,
    disabled,
    onClick,
}) => {
    return (
        <div
            className={classNames(SAVE_OPTION_ROW_CLASS, 'my-6', {
                'opacity-50 pointer-events-none': disabled,
            })}
        >
            <div>
                <Button onClickHandler={onClick}>
                    <div className="text-center ">
                        <span className="uppercase">{title}</span>
                        <br />
                        <span className=" normal-case text-sm">{subtitle}</span>
                    </div>
                </Button>
            </div>

            <div className=" text-sm">
                <p
                    dangerouslySetInnerHTML={{
                        __html: message || desciprtion,
                    }}
                ></p>
            </div>
        </div>
    );
};
