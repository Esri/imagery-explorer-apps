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
                'absolute top-0 right-0 w-[280px] h-[72px] pl-4 pr-[80px]',
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

            {status === 'finished' && (
                <div className="flex items-center">
                    <calcite-icon
                        icon="x"
                        style={
                            {
                                cursor: 'pointer',
                            } as React.CSSProperties
                        }
                        onClick={closeButtonOnClick}
                    />
                    <p className="ml-1">
                        Complete! Check browser downloads for the MP4 file.
                    </p>
                </div>
            )}
        </div>
    );
};
