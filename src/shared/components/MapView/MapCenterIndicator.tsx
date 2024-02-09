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

import { selectAppMode } from '@shared/store/ImageryScene/selectors';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import MapAnchorImage from '../../statics/img/map-anchor.png';
import { SizeOfMapAnchorImage } from '@shared/constants/UI';

type Props = {
    shouldShow: boolean;
};

export const MapCenterIndicator: FC<Props> = ({ shouldShow }) => {
    return (
        <div
            className={classNames(
                'absolute top-[50%] left-[50%] pointer-events-none z-10',
                {
                    hidden: shouldShow === false,
                }
            )}
            style={{
                transform: `translate(-${SizeOfMapAnchorImage / 2}px, -${
                    SizeOfMapAnchorImage / 2
                }px)`,
            }}
        >
            <img src={MapAnchorImage} />
        </div>
    );
};
