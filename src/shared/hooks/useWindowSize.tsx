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

import React, { useState, useEffect } from 'react';

const getSize = () => {
    return {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth,
    };
};

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(getSize());

    const handleResize = () => {
        setWindowSize(getSize());
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};

export default useWindowSize;
