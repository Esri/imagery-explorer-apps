import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectQueryParams4SceneInSelectedMode } from '../../../shared/store/Landsat/selectors';
import { selectMapCenter } from '../../../shared/store/Map/selectors';
import {
    LandsatScene,
    getLandsatScenes,
} from '../../services/landsat-2/getLandsatScenes';

/**
 * This custom hook queries the landsat service and find landsat scenes
 * that were acquired within the selected year and intersect with the center of the map screen
 * @returns
 */
const useAvailableScenes = () => {
    const { acquisitionYear } = useSelector(
        selectQueryParams4SceneInSelectedMode
    );

    /**
     * current map center
     */
    const center = useSelector(selectMapCenter);

    /**
     * available landsat scenes that intersect with input map geometry and were acquired during the input year.
     */
    const [availableScenes, setAvailableScenes] = useState<LandsatScene[]>([]);

    useEffect(() => {
        (async () => {
            const scenes = await getLandsatScenes({
                year: acquisitionYear,
                mapPoint: center,
                cloudCover: 1,
            });

            const availableScenes: LandsatScene[] = [];

            for (const scene of scenes) {
                const { formattedAcquisitionDate } = scene;

                // make sure to not push scene acquired from same day to the output
                if (
                    availableScenes.length &&
                    availableScenes[availableScenes.length - 1]
                        .formattedAcquisitionDate == formattedAcquisitionDate
                ) {
                    continue;
                }

                availableScenes.push(scene);
            }

            setAvailableScenes(scenes);
        })();
    }, [center, acquisitionYear]);

    return {
        availableScenes,
    };
};

export default useAvailableScenes;
