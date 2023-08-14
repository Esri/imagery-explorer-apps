import './PopUp.css';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import IMapView from 'esri/views/MapView';
import IPoint from 'esri/geometry/Point';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectAvailableScenesByObjectId,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/Landsat/selectors';
import { selectActiveAnalysisTool } from '@shared/store/Analysis/selectors';
import { selectSwipeWidgetHandlerPosition } from '@shared/store/Map/selectors';
import { getSamples } from '@shared/services/landsat-2/getSamples';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { popupAnchorLocationChanged } from '@shared/store/Map/reducer';
import { getLoadingIndicator, getMainContent } from './helper';
import IReactiveUtils from 'esri/core/reactiveUtils';
import { loadModules } from 'esri-loader';

type Props = {
    mapView?: IMapView;
};

type MapViewOnClickHandler = (mapPoint: IPoint, mousePointX: number) => void;

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

    const availableScenes = useSelector(selectAvailableScenesByObjectId);

    const swipePosition = useSelector(selectSwipeWidgetHandlerPosition);

    const openPopupRef = useRef<MapViewOnClickHandler>();

    const closePopUp = () => {
        mapView.popup.close();
        dispatch(popupAnchorLocationChanged(null));
    };

    openPopupRef.current = async (mapPoint: IPoint, mousePointX: number) => {
        // no need to show pop-up if in Animation Mode
        // or it is using Profile Tool
        if (
            mode === 'animate' ||
            (mode === 'analysis' && analysisTool === 'profile')
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

            const objectId = queryParams?.objectIdOfSelectedScene;

            // cannot display popup if there is no objectId in queryParams for selected landsat scene
            if (!objectId || !availableScenes[objectId]) {
                throw new Error(
                    'objectIdOfSelectedScene is required to fetch popup data'
                );
            }

            const sceneData = availableScenes[objectId];

            if (controller) {
                controller.abort();
            }

            controller = new AbortController();

            const res = await getSamples(
                mapPoint,
                [queryParams.objectIdOfSelectedScene],
                controller
            );
            // console.log(res);

            if (!res.length || !res[0].values) {
                throw new Error('invalid getSampes response');
            }

            const title = `${sceneData.satellite} | ${format(
                sceneData.acquisitionDate,
                'MMM dd, yyyy'
            )}`;

            mapView.popup.open({
                // Set the popup's title to the coordinates of the location
                title: title,
                location: mapPoint, // Set the location of the popup to the clicked location
                content: getMainContent(res[0].values, mapPoint),
            });
        } catch (err) {
            console.error('failed to open popup for landsat scene', err);
            closePopUp();
        }
    };

    const init = async () => {
        // It's necessary to overwrite the default click for the popup
        // behavior in order to display your own popup
        mapView.popup.autoOpenEnabled = false;
        mapView.popup.dockEnabled = false;
        mapView.popup.collapseEnabled = false;
        mapView.popup.alignment = 'bottom-right';

        mapView.on('click', (evt) => {
            openPopupRef.current(evt.mapPoint, evt.x);
        });

        type Modules = [typeof IReactiveUtils];

        const [reactiveUtils] = await (loadModules([
            'esri/core/reactiveUtils',
        ]) as Promise<Modules>);

        reactiveUtils.watch(
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
