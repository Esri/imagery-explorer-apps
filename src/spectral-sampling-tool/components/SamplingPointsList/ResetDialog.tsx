import { Button } from '@shared/components/Button';
import React, { FC } from 'react';

type Props = {
    cancelButtonOnClick: () => void;
    resetButtonOnClick: () => void;
};

export const ResetDialog: FC<Props> = ({
    cancelButtonOnClick,
    resetButtonOnClick,
}) => {
    return (
        <div>
            <p className="text-xs">
                Reset current sampling session. All existing sampling points
                will be removed.
            </p>

            <div className="my-1">
                <Button scale="s" onClickHandler={cancelButtonOnClick}>
                    Go back
                </Button>
            </div>

            <Button scale="s" onClickHandler={resetButtonOnClick}>
                Reset
            </Button>
        </div>
    );
};
