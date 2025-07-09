import { ImageryExplorerAppInfo } from '@shared/hooks/useDataOfImageryExplorerApps';
import React, { FC } from 'react';

type Props = {
    /**
     * Header text for the app list
     * This will be displayed at the top of the app list section.
     */
    header: string;
    /**
     * List of app names to be displayed
     * Each app name will be rendered as a clickable item in the list.
     */
    apps: ImageryExplorerAppInfo[];
    /**
     * callback function to handle click events on app items
     * This function will be called with the URL of the clicked app.
     */
    onClick: (url: string) => void;
};

/**
 * Renders a list of application launch items with a header.
 *
 * @param header - The header text to display above the list.
 * @param apps - An array of app objects to display in the list. Each app should have a `title`, `tooltip`, and `url`.
 * @param onClick - Callback function invoked when an app item is clicked. Receives the app's `url` as an argument.
 *
 * @returns A React element displaying the header and a clickable list of apps, or `null` if no apps are provided.
 */
export const AppLauchList: FC<Props> = ({ header, apps, onClick }) => {
    if (!apps || apps.length === 0) {
        return null;
    }

    return (
        <div className="mb-1">
            <div className="px-2 py-2 text-xs text-custom-light-blue-50">
                <span>{header}</span>
            </div>

            {apps.map((d) => {
                return (
                    <span
                        key={d.title}
                        title={d.tooltip}
                        onClick={onClick.bind(null, d.url)}
                    >
                        <div className="w-full px-2 py-1 text-xs cursor-pointer flex items-center">
                            <calcite-icon
                                icon="launch"
                                scale="s"
                                style={{ opacity: '.5' }}
                            />
                            <span className="ml-2 text-lg">{d.title}</span>
                        </div>
                    </span>
                );
            })}
        </div>
    );
};
