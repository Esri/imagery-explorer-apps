import GroupLayer from '@arcgis/core/layers/GroupLayer';
import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useLockedRelativeOrbit } from '../../hooks/useLockedRelativeOrbit';
import { LockedRelativeOrbitFootprintLayer } from './LockedRelativeOrbitFootprintLayer';
import { IFeature } from '@esri/arcgis-rest-feature-service';
import { getFeatureByObjectId } from '@shared/services/helpers/getFeatureById';
import { SENTINEL_1_SERVICE_URL } from '@shared/services/sentinel-1/config';
import { useSelector } from 'react-redux';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const LockedRelativeOrbitFootprintLayerContainer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    /**
     * Locked relative orbit to be used by the different Analyze tools (e.g. temporal composite and change compare)
     */
    const { lockedRelativeOrbit, objectIdOfSceneWithLockedRelativeOrbit } =
        useLockedRelativeOrbit();

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const [footPrintFeature, setFootPrintFeature] = useState<IFeature>();

    const isVisible = useMemo(() => {
        // no need to show it if user has already selected an scene
        if (objectIdOfSelectedScene) {
            return false;
        }

        return lockedRelativeOrbit !== null;
    }, [lockedRelativeOrbit, objectIdOfSelectedScene]);

    useEffect(() => {
        (async () => {
            const feature = objectIdOfSceneWithLockedRelativeOrbit
                ? await getFeatureByObjectId(
                      SENTINEL_1_SERVICE_URL,
                      objectIdOfSceneWithLockedRelativeOrbit
                  )
                : null;

            setFootPrintFeature(feature);
        })();
    }, [objectIdOfSceneWithLockedRelativeOrbit]);

    return (
        <LockedRelativeOrbitFootprintLayer
            mapView={mapView}
            groupLayer={groupLayer}
            visible={isVisible}
            footPrintFeature={footPrintFeature}
        />
    );
};
