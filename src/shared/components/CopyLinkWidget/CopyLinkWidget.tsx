/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { CSSProperties, useState } from 'react';
import { MapActionButton } from '../MapActionButton/MapActionButton';
import { delay } from '@shared/utils/snippets/delay';
import {
    COPIED_LINK_MESSAGE_STRING,
    COPIED_LINK_MESSAGE_TIME_TO_STAY_OPEN_IN_MILLISECONDS,
} from '@shared/constants/UI';

export const CopyLinkWidget = () => {
    const [notificationMessage, setNotificationMessage] =
        useState<React.ReactNode>();

    const onClickHandler = async () => {
        await navigator.clipboard.writeText(window.location.href);

        setNotificationMessage(
            <>
                <calcite-icon
                    scale="s"
                    icon="check"
                    style={
                        {
                            marginRight: '.2rem',
                            paddingTop: '.1rem',
                        } as CSSProperties
                    }
                />
                <span className=" lin">{COPIED_LINK_MESSAGE_STRING}</span>
            </>
        );

        await delay(COPIED_LINK_MESSAGE_TIME_TO_STAY_OPEN_IN_MILLISECONDS);

        setNotificationMessage(null);
    };

    return (
        <MapActionButton
            // topPosition={130}
            onClickHandler={onClickHandler}
            notificationMessage={notificationMessage}
            tooltip={'Copy link to this app in its current state'}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height={24}
                width={24}
            >
                <path
                    fill="currentColor"
                    d="M7 14c0 .025.003.05.004.075l-3.54-3.54a5 5 0 0 1 7.072-7.07l4 4a4.992 4.992 0 0 1-1.713 8.187l-.237-.237a1.998 1.998 0 0 1-.413-.609 3.985 3.985 0 0 0 1.656-6.635l-4-4a4 4 0 0 0-5.369-.26l-.318-.387.318.386a4 4 0 0 0-.29 5.92l2.94 2.94A7.012 7.012 0 0 0 7 14zm16 4a4.97 4.97 0 0 0-1.464-3.536l-3.54-3.539c0 .025.004.05.004.075a7.087 7.087 0 0 1-.113 1.23l2.942 2.941a4 4 0 0 1-.128 5.78l.338.368-.338-.368a4 4 0 0 1-5.53-.122l-4-4a3.966 3.966 0 0 1 1.658-6.631 1.998 1.998 0 0 0-.415-.613l-.234-.234a5.004 5.004 0 0 0-1.907 1.315 5 5 0 0 0 .191 6.87l4 4A5 5 0 0 0 23 18z"
                />
                <path fill="none" d="M0 0h24v24H0z" />
            </svg>
        </MapActionButton>
    );
};
