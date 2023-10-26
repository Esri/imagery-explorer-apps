import './PopUp.css';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/Landsat/selectors';
import { selectSwipeWidgetHandlerPosition } from '@shared/store/Map/selectors';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { popupAnchorLocationChanged } from '@shared/store/Map/reducer';
import { getLoadingIndicator, getMainContent } from './helper';
import { watch } from '@arcgis/core/core/reactiveUtils';
import {
    getPixelValuesFromIdentifyTaskResponse,
    identify,
} from '@shared/services/landsat-level-2/identify';
import { getFormattedLandsatScenes } from '@shared/services/landsat-level-2/getLandsatScenes';
// import { canBeConvertedToNumber } from '@shared/utils/snippets/canBeConvertedToNumber';

type Props = {
    mapView?: MapView;
};

type MapViewOnClickHandler = (mapPoint: Point, mousePointX: number) => void;

let controller: AbortController = null;

/**
 * Check and see if user clicked on the left side of the swipe widget
 * @param swipePosition position of the swipe handler, value should be bewteen 0 - 100
 * @param mapViewWidth width of the map view container
 * @param mouseX x position of the mouse click event
 * @returns boolean indicates if clicked on left side
 */
const didClickOnLeftSideOfSwipeWidget = (
    swipePosition: number,
    mapViewWidth: number,
    mouseX: number
) => {
    const widthOfLeftHalf = mapViewWidth * (swipePosition / 100);
    return mouseX <= widthOfLeftHalf;
};

export const Popup: FC<Props> = ({ mapView }: Props) => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useSelector(
        selectQueryParams4SecondaryScene
    );

    // const availableScenes = useSelector(selectAvailableScenesByObjectId);

    const swipePosition = useSelector(selectSwipeWidgetHandlerPosition);

    const openPopupRef = useRef<MapViewOnClickHandler>();

    const closePopUp = () => {
        if (controller) {
            controller.abort();
        }

        mapView.closePopup();

        dispatch(popupAnchorLocationChanged(null));
    };

    openPopupRef.current = async (mapPoint: Point, mousePointX: number) => {
        // no need to show pop-up if in Animation Mode
        if (mode === 'animate') {
            return;
        }

        // no need to show pop-up when using Trend or Spectral Profile Tool
        if (
            mode === 'analysis' &&
            (analysisTool === 'trend' || analysisTool === 'spectral')
        ) {
            return;
        }

        dispatch(popupAnchorLocationChanged(mapPoint.toJSON()));

        mapView.popup.open({
            title: null,
            location: mapPoint,
            content: getLoadingIndicator(),
        });

        try {
            let queryParams = queryParams4MainScene;

            // in swipe mode, we need to use the query Params based on position of mouse click event
            if (mode === 'swipe') {
                queryParams = didClickOnLeftSideOfSwipeWidget(
                    swipePosition,
                    mapView.width,
                    mousePointX
                )
                    ? queryParams4MainScene
                    : queryParams4SecondaryScene;
            }

            // let objectId = queryParams?.objectIdOfSelectedScene;
            // let sceneData = availableScenes[objectId];

            if (controller) {
                controller.abort();
            }

            controller = new AbortController();

            const res = await identify({
                point: mapPoint,
                objectId:
                    mode !== 'dynamic'
                        ? queryParams?.objectIdOfSelectedScene
                        : null,
                abortController: controller,
            });

            // console.log(res)

            const features = res?.catalogItems?.features;

            if (!features.length) {
                throw new Error('cannot find landsat scene');
            }

            const sceneData = getFormattedLandsatScenes(features)[0];

            const bandValues: number[] =
                getPixelValuesFromIdentifyTaskResponse(res);

            // if (res?.value && res?.value !== 'NoData') {
            //     // get pixel values from the value property first
            //     bandValues = res?.value.split(', ').map((d) => +d);
            // } else if (res?.properties?.Values[0]) {
            //     bandValues = res?.properties?.Values[0].split(' ').map((d) => {
            //         if (canBeConvertedToNumber(d) === false) {
            //             return null;
            //         }

            //         return +d;
            //     });
            // }

            if (!bandValues) {
                throw new Error('identify task does not return band values');
            }
            // console.log(bandValues)

            // // in dynamic mode, we will need to do the identify task first to find the landsat scene that is being displayed on the map
            // if (mode === 'dynamic') {
            //     const res = await identify({
            //         point: mapPoint,
            //         abortController: controller,
            //     });

            //     // console.log(res)

            //     const features = res?.catalogItems?.features;

            //     if (!features.length) {
            //         throw new Error('cannot find scene for dynamic mode');
            //     }

            //     sceneData = getFormattedLandsatScenes(features)[0];

            //     objectId = sceneData.objectId;
            // }

            // // cannot display popup if there is no objectId in queryParams for selected landsat scene
            // if (!objectId || !sceneData) {
            //     throw new Error(
            //         'objectIdOfSelectedScene is required to fetch popup data'
            //     );
            // }

            // const res = await getSamples(mapPoint, [objectId], controller);
            // // console.log(res);

            // if (!res.length || !res[0].values) {
            //     throw new Error('invalid getSampes response');
            // }

            const title = `${sceneData.satellite} | ${format(
                sceneData.acquisitionDate,
                'MMM dd, yyyy'
            )}`;

            mapView.openPopup({
                // Set the popup's title to the coordinates of the location
                title: title,
                location: mapPoint, // Set the location of the popup to the clicked location
                content: getMainContent(bandValues, mapPoint),
            });
        } catch (err: any) {
            console.error(
                'failed to open popup for landsat scene',
                err.message
            );

            // no need to close popup if the user just clicked on a different location before
            // the popup data is returned
            if (err.message.includes('aborted')) {
                return;
            }

            closePopUp();
        }
    };

    const init = async () => {
        // It's necessary to overwrite the default click for the popup
        // behavior in order to display your own popup
        mapView.popupEnabled = false;
        mapView.popup.dockEnabled = false;
        mapView.popup.collapseEnabled = false;
        mapView.popup.alignment = 'bottom-right';

        mapView.on('click', (evt) => {
            openPopupRef.current(evt.mapPoint, evt.x);
        });

        watch(
            () => mapView.popup.visible,
            (visible) => {
                // console.log('mapview popup updated', visible)
                if (!visible) {
                    // need to call closePopup whne popup becomes invisible
                    // so the Popup anchor location can also be removed from the map
                    closePopUp();
                }
            }
        );
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (mapView) {
            closePopUp();
        }
    }, [
        mode,
        analysisTool,
        queryParams4MainScene?.objectIdOfSelectedScene,
        queryParams4SecondaryScene?.objectIdOfSelectedScene,
        swipePosition,
    ]);

    return null;
};
