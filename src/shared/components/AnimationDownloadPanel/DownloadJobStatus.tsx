import React, { FC } from 'react';
import { DownloadJobStatus } from './DownloadPanel';
import classNames from 'classnames';

type Props = {
    status: DownloadJobStatus;
    /**
     * emits when user clicks on cancel button to cancel the pending download job
     * @returns
     */
    cancelButtonOnClick: () => void;
    /**
     * emit when user clicks on the close button to hide the notification message
     * @returns
     */
    closeButtonOnClick: () => void;
};

export const DownloadJobStatusInfo: FC<Props> = ({
    status,
    cancelButtonOnClick,
    closeButtonOnClick,
}) => {
    if (!status) {
        return null;
    }

    return (
        <div
            className={classNames(
                'absolute top-0 right-0 w-[220px] h-[72px] px-4',
                'flex items-center',
                'theme-background text-xs'
            )}
        >
            {status === 'pending' && (
                <div className="flex items-center">
                    <calcite-loader inline />
                    <span className="mr-1">Creating MP4.</span>
                    <span
                        className="underline cursor-pointer opacity-70 hover:opacity-100"
                        onClick={cancelButtonOnClick}
                    >
                        Cancel
                    </span>
                </div>
            )}

            {(status === 'finished' || status === 'failed') && (
                <div className="flex items-center">
                    <p className="mr-2">
                        {status === 'finished'
                            ? 'Complete! Check browser downloads for the MP4 file.'
                            : 'Failed to create MP4.'}
                    </p>

                    <calcite-icon
                        icon="x"
                        style={
                            {
                                cursor: 'pointer',
                            } as React.CSSProperties
                        }
                        onClick={closeButtonOnClick}
                    />
                </div>
            )}
        </div>
    );
};
