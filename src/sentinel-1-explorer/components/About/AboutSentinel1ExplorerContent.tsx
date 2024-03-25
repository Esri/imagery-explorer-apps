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

import { appConfig } from '@shared/config';
import React from 'react';

export const AboutSentinel1ExplorerContent = () => {
    return (
        <div
            className="py-10"
            style={{
                maxWidth: 1680,
            }}
        >
            <div className="flex items-center mb-8">
                <div className=" text-custom-light-blue text-3xl pr-4 mr-4">
                    <span>{appConfig.title}</span>
                </div>
            </div>

            <div className="mb-8 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    About the data
                </h3>

                <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi esse quos ab vel, ducimus deserunt temporibus quam
                    soluta assumenda! Doloribus repudiandae id voluptatem sint
                    incidunt numquam vero! Enim, amet natus?
                </p>
            </div>

            <div className="mb-8 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    About the app
                </h3>

                <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid nesciunt qui maxime mollitia odit dolorum, quod
                    repellat cum amet nihil natus! Itaque inventore tempore
                    nihil repudiandae. Earum tempore quos reprehenderit.
                </p>
            </div>

            <div className="mb-4 font-light">
                <h3 className="text-2xl text-custom-light-blue mb-4">
                    Attribution and Terms of Use
                </h3>
            </div>
        </div>
    );
};
