import { Button } from '@shared/components/Button';
import classNames from 'classnames';
import React, { FC } from 'react';

type SaveOptionButtonProps = {
    title: string;
    subtitle: string;
    desciprtion: string;
    onClick: () => void;
};

export const SAVE_OPTION_ROW_CLASS =
    'grid grid-cols-save-option-list gap-12 items-center';

export const SaveOptionButton: FC<SaveOptionButtonProps> = ({
    title,
    subtitle,
    desciprtion,
    onClick,
}) => {
    return (
        <div className={classNames(SAVE_OPTION_ROW_CLASS, 'my-6')}>
            <Button onClickHandler={onClick}>
                <div className="text-center ">
                    <span className="uppercase">{title}</span>
                    <br />
                    <span className=" normal-case text-sm">{subtitle}</span>
                </div>
            </Button>

            <p className=" text-sm">{desciprtion}</p>
        </div>
    );
};
