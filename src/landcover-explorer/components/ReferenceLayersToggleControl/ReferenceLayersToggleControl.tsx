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

// import classNames from 'classnames';
// import React, { FC } from 'react';
// import { useAppDispatch } from '@shared/store/configureStore';
// import { useAppSelector } from '@shared/store/configureStore';
// import {
//     showMapLabelToggled,
//     showTerrainToggled,
// } from '@shared/store/Map/reducer';
// import {
//     selectShowMapLabel,
//     selectShowTerrain,
// } from '@shared/store/Map/selectors';
// import { selectAnimationStatus } from '@shared/store/UI/selectors';
// import { useTranslation } from 'react-i18next';

// type ToggleButtonProps = {
//     label: string;
//     active: boolean;
//     onToggle: () => void;
// };

// const CheckIcon = (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 16 16"
//         height="16"
//         width="16"
//     >
//         <path
//             fill="currentColor"
//             d="M14.071 15a.929.929 0 0 0 .929-.929V2.93a.929.929 0 0 0-.929-.93H2.93a.929.929 0 0 0-.93.929V14.07a.929.929 0 0 0 .929.929zM3 3h11v11H3zm9.262 2l.738.738-5.443 5.43-2.822-2.822.738-.738 2.084 2.088z"
//         />
//         <path fill="none" d="M0 0h16v16H0z" />
//     </svg>
// );

// const UncheckIcon = (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 16 16"
//         height="16"
//         width="16"
//     >
//         <path
//             fill="currentColor"
//             d="M14.071 15a.929.929 0 0 0 .929-.929V2.93a.929.929 0 0 0-.929-.93H2.93a.929.929 0 0 0-.93.929V14.07a.929.929 0 0 0 .929.929zM3 3h11v11H3z"
//         />
//         <path fill="none" d="M0 0h16v16H0z" />
//     </svg>
// );

// const ToggleButton: FC<ToggleButtonProps> = ({
//     label,
//     active,
//     onToggle,
// }: ToggleButtonProps) => {
//     return (
//         <div
//             className="mx-2 cursor-pointer z-10 flex items-center"
//             onClick={onToggle}
//         >
//             {active ? CheckIcon : UncheckIcon}
//             <span className="ml-1">{label}</span>
//         </div>
//     );
// };

// const LayersToggleControl = () => {
//     const dispatch = useAppDispatch();

//     const { t } = useTranslation();

//     const animationMode = useAppSelector(selectAnimationStatus);

//     const showMapLabel = useAppSelector(selectShowMapLabel);

//     const showTerrain = useAppSelector(selectShowTerrain);

//     return (
//         <div
//             className={classNames(
//                 'absolute bg-custom-background flex py-2 px-2 text-custom-light-blue text-xs top-map-ui-top-position',
//                 {
//                     hidden: animationMode !== null,
//                 }
//             )}
//             style={{
//                 // width: SEARCH_WIDGET_WIDTH, // this is the width of JSAPI search Widget
//                 right: 15, // this is the margin to right value of JSAPI search Widget
//                 // top: 15, // this is the margin to top value of JSAPI search Widget
//             }}
//         >
//             <ToggleButton
//                 label={t('map_labels')} // Translate the label for Map Labels
//                 active={showMapLabel}
//                 onToggle={() => {
//                     // console.log('toggle map labels');
//                     dispatch(showMapLabelToggled());
//                 }}
//             />

//             <ToggleButton
//                 label={t('terrain')} // Translate the label for Terrain
//                 active={showTerrain}
//                 onToggle={() => {
//                     // console.log('toggle Terrain');
//                     dispatch(showTerrainToggled());
//                 }}
//             />
//         </div>
//     );
// };

// export default LayersToggleControl;
