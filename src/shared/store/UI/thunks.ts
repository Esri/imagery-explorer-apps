/* Copyright 2024 Esri
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

import { delay } from '@shared/utils/snippets/delay';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    TooltipData,
    animationLinkIsCopiedChanged,
    tooltipDataChanged,
} from './reducer';
import { COPIED_LINK_MESSAGE_TIME_TO_STAY_OPEN_IN_MILLISECONDS } from '@shared/constants/UI';

const DebounceDealy = 250;

let debounceTimeOut: NodeJS.Timeout;

export const updateTooltipData =
    (data: TooltipData) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        clearTimeout(debounceTimeOut);

        if (!data) {
            dispatch(tooltipDataChanged(data));
            return;
        }

        debounceTimeOut = setTimeout(() => {
            dispatch(tooltipDataChanged(data));
        }, DebounceDealy);
    };

export const copyAnimationLink =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        await navigator.clipboard.writeText(window.location.href);

        // set to true to display the success message
        dispatch(animationLinkIsCopiedChanged(true));

        // the message should be turned off after 3 seconds
        await delay(COPIED_LINK_MESSAGE_TIME_TO_STAY_OPEN_IN_MILLISECONDS);
        dispatch(animationLinkIsCopiedChanged(false));
    };
