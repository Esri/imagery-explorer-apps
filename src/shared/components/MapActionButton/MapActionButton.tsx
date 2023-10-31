import {
    selectAnimationStatus,
    selectIsAnimationPlaying,
} from '@shared/store/UI/selectors';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

type Props = {
    /**
     * top position of this button in the map view
     */
    topPosition: number;
    /**
     * tooltip of the button
     */
    tooltip: string;
    /**
     * if true, show loading indicator
     */
    showLoadingIndicator?: boolean;
    /**
     * if true, the button should be disabled
     */
    disabled?: boolean;
    /**
     * children element, can be be text or svg icon elements
     */
    children?: React.ReactNode;
    /**
     * emits when user clicks on the button
     * @returns
     */
    onClickHandler: () => void;
};

export const MapActionButton: FC<Props> = ({
    topPosition,
    tooltip,
    showLoadingIndicator,
    disabled,
    children,
    onClickHandler,
}) => {
    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    return (
        <div
            className={classNames(
                'absolute left-[16px] w-map-action-button-size h-map-action-button-size z-10 flex items-center justify-center',
                'bg-custom-background text-custom-light-blue-90 cursor-pointer',
                {
                    hidden: isAnimationPlaying,
                    'is-disabled': disabled,
                }
            )}
            style={{
                top: topPosition,
            }}
            title={tooltip}
            onClick={onClickHandler}
        >
            {showLoadingIndicator ? (
                <div className="w-full h-full flex items-center justify-center text-center">
                    <calcite-loader
                        scale="m"
                        inline
                        style={{ marginRight: 0 } as React.CSSProperties}
                    />
                </div>
            ) : (
                children
            )}
        </div>
    );
};
