// /* Copyright 2025 Esri
//  *
//  * Licensed under the Apache License Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *     http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

// import {
//     ImageryServiceTimeExtentData,
//     RasterFunctionInfo,
// } from '@typing/imagery-service';
// import React, { useState, createContext, useEffect } from 'react';

// type RrasterFunctionLabelMap = Map<string, string>;

// type AppContextValue = {
//     timeExtent: ImageryServiceTimeExtentData;
//     /**
//      * Map object that can be used to get the label text of a raster function by it's name
//      */
//     rasterFunctionLabelMap: RrasterFunctionLabelMap;
//     /**
//      * raster function info of the imagery service
//      */
//     rasterFunctionInfo: RasterFunctionInfo[];
// };

// type AppContextProviderProps = {
//     /**
//      * time extent of the imagery service
//      */
//     timeExtent: ImageryServiceTimeExtentData;
//     /**
//      * raster functions of the imagert service
//      */
//     rasterFunctionInfo: RasterFunctionInfo[];
//     children?: React.ReactNode;
// };

// export const AppContext = createContext<AppContextValue>(null);

// const getRasterFunctionLabelMap = (
//     rasterFunctionInfo: RasterFunctionInfo[]
// ) => {
//     const rasterFunctionLabelMap = new Map();

//     // const infos = [...LANDSAT_RASTER_FUNCTION_INFOS];

//     for (const { name, label } of rasterFunctionInfo) {
//         rasterFunctionLabelMap.set(name, label);
//     }

//     return rasterFunctionLabelMap;
// };

// const AppContextProvider: React.FC<AppContextProviderProps> = ({
//     timeExtent,
//     rasterFunctionInfo,
//     children,
// }: AppContextProviderProps) => {
//     const [appContextValue, setAppContextValue] = useState<AppContextValue>({
//         timeExtent,
//         rasterFunctionLabelMap: rasterFunctionInfo
//             ? getRasterFunctionLabelMap(rasterFunctionInfo)
//             : null,
//         rasterFunctionInfo,
//     });

//     // const init = async () => {
//     //     // const contextValue: AppContextValue = {
//     //     //     darkMode: false
//     //     // };
//     //     // setValue(contextValue);
//     // };

//     // React.useEffect(() => {
//     //     init();
//     // }, []);

//     // useEffect(()=>{
//     //     console.log('App Context', appContextValue)
//     // }, [appContextValue])

//     return (
//         <AppContext.Provider value={appContextValue}>
//             {children}
//         </AppContext.Provider>
//     );
// };

// export default AppContextProvider;
