// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectMapCenter } from '@shared/store/Map/selectors';
// import { useDispatch } from 'react-redux';
// // import { updateObjectIdOfSelectedScene } from '@shared/store/ImageryScene/thunks';
// import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
// import { selectLandsatMissionsToBeExcluded } from '@shared/store/Landsat/selectors';
// import { queryAvailableScenes } from '@shared/store/Landsat/thunks';
// import { selectAcquisitionYear } from '@shared/store/ImageryScene/selectors';

// /**
//  * This custom hook queries the landsat service and find landsat scenes
//  * that were acquired within the selected year and intersect with the center of the map screen
//  * @returns
//  */
// export const useQueryAvailableLandsatScenes = (): void => {
//     const dispatch = useDispatch();

//     const acquisitionYear = useSelector(selectAcquisitionYear);

//     const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

//     const missionsToBeExcluded = useSelector(selectLandsatMissionsToBeExcluded);

//     /**
//      * current map center
//      */
//     const center = useSelector(selectMapCenter);

//     useEffect(() => {
//         if (!center || !acquisitionYear) {
//             return;
//         }

//         if (isAnimationPlaying) {
//             return;
//         }

//         dispatch(queryAvailableScenes(acquisitionYear));
//     }, [center, acquisitionYear, isAnimationPlaying, missionsToBeExcluded]);

//     return null;
// };
