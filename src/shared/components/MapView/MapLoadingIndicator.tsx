import classNames from 'classnames';
import React, { CSSProperties, FC } from 'react';

type Props = {
    /**
     * if true, show map loading indicator
     */
    active: boolean;
    /**
     * position of swipe widget handler on x axis
     */
    swipeWidgetHandlerPosition?: number;
};

export const MapLoadingIndicator: FC<Props> = ({
    active,
    swipeWidgetHandlerPosition,
}: Props) => {
    if (!active) {
        return null;
    }

    return (
        <>
            <div
                className={classNames(
                    'flex items-center h-full absolute top-0 left-0 pointer-events-none'
                )}
                style={
                    {
                        width: swipeWidgetHandlerPosition
                            ? `${swipeWidgetHandlerPosition}%`
                            : '100%',
                        // '--calcite-ui-brand': 'var(--custom-light-blue)',
                        // '--calcite-ui-brand-hover': 'var(--custom-light-blue-70)',
                        // '--calcite-ui-brand-press': 'var(--custom-light-blue-50)'
                    } as CSSProperties
                }
            >
                <calcite-loader />
            </div>

            {swipeWidgetHandlerPosition && (
                <div
                    className={classNames(
                        'flex items-center h-full absolute top-0 right-0 pointer-events-none'
                    )}
                    style={
                        {
                            width: `${100 - swipeWidgetHandlerPosition}%`,
                            // '--calcite-ui-brand': 'var(--custom-light-blue)',
                            // '--calcite-ui-brand-hover': 'var(--custom-light-blue-70)',
                            // '--calcite-ui-brand-press': 'var(--custom-light-blue-50)'
                        } as CSSProperties
                    }
                >
                    <calcite-loader />
                </div>
            )}
        </>
    );
};
