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

import React from 'react';

export const DynamicModeInfo = () => {
    return (
        <div className="max-w-xl mx-auto lg:mx-20">
            <div className="text-center mb-3">
                <span className="uppercase text-sm">Dynamic View</span>
            </div>

            <p className="text-sm opacity-80">
                In the current map display, the most recent and most cloud free
                scenes from the Landsat surface temperature archive are
                prioritized and dynamically fused into a single thermal layer.
                As you explore, the map continues to dynamically fetch and
                render the best available scenes.
            </p>
        </div>
    );
};
