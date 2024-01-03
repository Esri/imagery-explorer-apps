import React, { useEffect, useState } from 'react';
import { Notification } from './Notification';
import { useShouldHideNitification } from './useShouldHideNitification';

export const NotificationContainer = () => {
    const { shouldHide, hideNotification } = useShouldHideNitification();

    if (shouldHide) {
        return null;
    }

    return (
        <Notification closeButtonOnClick={hideNotification}>
            <p className="text-sm max-w-3xl">
                Level-1 product processing of Landsat 7, Landsat 8, and Landsat
                9 scenes acquired December 19, 2023, to the present has been
                paused while engineers investigate an issue with the processing
                systems.{' '}
                <a
                    className=" underline"
                    href="https://www.usgs.gov/landsat-missions/news/landsat-level-1-product-processing-temporarily-paused"
                    target="_blank"
                    rel="noreferrer"
                >
                    Learn more
                </a>
            </p>
        </Notification>
    );
};
