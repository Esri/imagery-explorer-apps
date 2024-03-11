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

import { ImageryServiceTimeExtentData } from '@typing/imagery-service';
import React, { useState, createContext, useEffect } from 'react';

type AppContextValue = {
    timeExtent: ImageryServiceTimeExtentData;
};

type AppContextProviderProps = {
    timeExtent: ImageryServiceTimeExtentData;
    children?: React.ReactNode;
};

export const AppContext = createContext<AppContextValue>(null);

const AppContextProvider: React.FC<AppContextProviderProps> = ({
    timeExtent,
    children,
}: AppContextProviderProps) => {
    const [appContextValue, setAppContextValue] = useState<AppContextValue>({
        timeExtent,
    });

    // const init = async () => {
    //     // const contextValue: AppContextValue = {
    //     //     darkMode: false
    //     // };
    //     // setValue(contextValue);
    // };

    // React.useEffect(() => {
    //     init();
    // }, []);

    // useEffect(()=>{
    //     console.log('App Context', appContextValue)
    // }, [appContextValue])

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
