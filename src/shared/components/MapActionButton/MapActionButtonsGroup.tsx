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

import MapView from '@arcgis/core/views/MapView';
import classNames from 'classnames';
import React, { FC } from 'react';

type Props = {
    mapView?: MapView;
    children?: React.ReactNode;
};

/**
 * This component groups custom Map Action Buttons together at the left side of the map container
 * @param param0
 * @returns
 */
export const MapActionButtonsGroup: FC<Props> = ({ mapView, children }) => {
    return (
        <div
            className={classNames(
                'absolute left-[16px] top-[56px] flex items-center gap-[1px]'
            )}
        >
            {mapView
                ? React.Children.map(children, (child) => {
                      if (!child) {
                          return null;
                      }

                      return React.cloneElement(
                          child as React.ReactElement<any>,
                          {
                              mapView,
                          }
                      );
                  })
                : null}
        </div>
    );
};

export const MapNavButtonsGroup: FC<Props> = ({ mapView, children }) => {
    return (
        <div
            className={classNames(
                'absolute right-[82px] top-[84px] flex items-center gap-[1px]'
            )}
        >
            {mapView
                ? React.Children.map(children, (child) => {
                      if (!child) {
                          return null;
                      }

                      return React.cloneElement(
                          child as React.ReactElement<any>,
                          {
                              mapView,
                          }
                      );
                  })
                : null}
        </div>
    );
};
