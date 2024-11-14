import classNames from 'classnames';
import React, { FC } from 'react';
import { SAVE_OPTION_ROW_CLASS } from './SaveOptionButton';

type SaveOptionsListHeaderProps = {
    title: string;
};

export const SaveOptionsListHeader: FC<SaveOptionsListHeaderProps> = ({
    title,
}) => {
    return (
        <div
            className={classNames(
                SAVE_OPTION_ROW_CLASS,
                'mb-6 border-b pb-1 border-custom-light-blue-25'
            )}
        >
            <div className="uppercase text-lg">{title}</div>
            <div className="opacity-50">About</div>
        </div>
    );
};
