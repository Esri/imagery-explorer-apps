// /* Copyright 2024 Esri
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

// import classNames from 'classnames';
// import React, { FC, useRef, useState } from 'react';
// import useOnClickOutside from '@shared/hooks/useOnClickOutside';

// type DropdownData = {
//     /**
//      * value of this item
//      */
//     value: string;
//     /**
//      * label text will be displayed
//      */
//     label?: string;
//     /**
//      * If true, this item is selected
//      */
//     active: boolean;
// };

// type Props = {
//     data: DropdownData[];
//     disabled?: boolean;
//     onChange: (val: string) => void;
// };

// const Dropdown: FC<Props> = ({ data, disabled, onChange }: Props) => {
//     const [shouldShowOptions, setShouldShowOptions] = useState(false);

//     const containerRef = useRef<HTMLDivElement>();

//     useOnClickOutside(containerRef, () => {
//         setShouldShowOptions(false);
//     });

//     const getLabelForActiveItem = () => {
//         let activeItem = data.find((d) => d.active);

//         activeItem = activeItem || data[0];

//         return activeItem.label || activeItem.value;
//     };

//     return (
//         <div
//             ref={containerRef}
//             className={classNames('relative', {
//                 'disabled-when-animation-mode-is-on': disabled,
//             })}
//         >
//             <div
//                 className="border border-custom-light-blue-50 opacity-80 p-1 text-xs cursor-pointer flex items-center justify-between"
//                 onClick={() => {
//                     setShouldShowOptions(true);
//                 }}
//             >
//                 <span className="mr-1">{getLabelForActiveItem()}</span>

//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 16 16"
//                     height="16"
//                     width="16"
//                 >
//                     <path fill="currentColor" d="M13.1 6L8 11.1 2.9 6z" />
//                     <path fill="none" d="M0 0h16v16H0z" />
//                 </svg>
//             </div>

//             {shouldShowOptions && (
//                 <div className="absolute bottom-0 left-0 right-0 bg-custom-background border border-custom-light-blue-50 border-b-0 text-xs">
//                     {data.map((d, index) => {
//                         const { value, label } = d;

//                         return (
//                             <div
//                                 className="p-1 border-custom-light-blue-50 border-b cursor-pointer"
//                                 key={value}
//                                 onClick={() => {
//                                     onChange(value);
//                                     setShouldShowOptions(false);
//                                 }}
//                             >
//                                 {label || value}
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Dropdown;
