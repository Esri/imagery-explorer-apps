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
import classNames from 'classnames';
import React, { FC } from 'react';
import { ReferenceLayersToggleControl } from './ReferenceLayersToggleControl';
import { useTranslation } from 'react-i18next';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { ReferenceLayersControlMobileDevice } from './ReferenceLayersControlMobileDevice';

type Props = {
    shoudHide: boolean;
};

export const ReferenceLayersControl: FC<Props> = ({ shoudHide }) => {
    return (
        <div
            className={classNames(
                'absolute text-custom-light-blue text-xs top-map-ui-top-position',
                {
                    hidden: shoudHide,
                }
            )}
            style={{
                right: 15, // this is the margin to right value of JSAPI search Widget
            }}
        >
            {IS_MOBILE_DEVICE ? (
                <ReferenceLayersControlMobileDevice />
            ) : (
                <ReferenceLayersToggleControl />
            )}
        </div>
    );
};
