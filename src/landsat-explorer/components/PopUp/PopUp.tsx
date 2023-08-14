import './PopUp.css';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import IMapView from 'esri/views/MapView';
import IPoint from 'esri/geometry/Point';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/Landsat/selectors';
import { selectActiveAnalysisTool } from '@shared/store/Analysis/selectors';
import { selectSwipeWidgetHandlerPosition } from '@shared/store/Map/selectors';
import { getSamples } from '@shared/services/landsat-2/getSamples';

type Props = {
    mapView?: IMapView;
};

type MapViewOnClickHandler = (mapPoint: IPoint, mousePointX: number) => void;

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
    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useSelector(
        selectQueryParams4SecondaryScene
    );

    const swipePosition = useSelector(selectSwipeWidgetHandlerPosition);

    const mapViewOnClickHandlerRef = useRef<MapViewOnClickHandler>();

    const getLoadingIndicator = () => {
        const popupDiv = document.createElement('div');
        popupDiv.innerHTML = `<calcite-loader active scale="s"></calcite-loader>`;
        return popupDiv;
    };

    const getMainContent = () => {
        const popupDiv = document.createElement('div');

        popupDiv.innerHTML = `
            <div class='text-custom-light-blue'>
                this is the custom popup
            </div>
        `;

        return popupDiv;
    };

    mapViewOnClickHandlerRef.current = async (
        mapPoint: IPoint,
        mousePointX: number
    ) => {
        // no need to show pop-up if in Animation Mode
        // or it is using Profile Tool
        if (
            mode === 'animate' ||
            (mode === 'analysis' && analysisTool === 'profile')
        ) {
            return;
        }

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

            // cannot display if not is dynamic mode and there is no queryParams for landsat scene
            if (mode !== 'dynamic' && !queryParams) {
                return;
            }

            const res = await getSamples(mapPoint, [
                queryParams.objectIdOfSelectedScene,
            ]);
            console.log(res);

            const lat = Math.round(mapPoint.latitude * 1000) / 1000;
            const lon = Math.round(mapPoint.longitude * 1000) / 1000;
            const title = `Landsat 9 | AUG 01, 2023`;

            mapView.popup.open({
                // Set the popup's title to the coordinates of the location
                title: title,
                location: mapPoint, // Set the location of the popup to the clicked location
                content: getMainContent(),
            });
        } catch (err) {
            console.log(err);
            mapView.popup.close();
        }
    };

    const init = async () => {
        // It's necessary to overwrite the default click for the popup
        // behavior in order to display your own popup
        mapView.popup.autoOpenEnabled = false;
        mapView.popup.dockEnabled = false;
        mapView.popup.collapseEnabled = false;

        mapView.on('click', (evt) => {
            mapViewOnClickHandlerRef.current(evt.mapPoint, evt.x);
        });
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (mapView) {
            mapView.popup.close();
        }
    }, [
        mode,
        analysisTool,
        queryParams4MainScene,
        queryParams4SecondaryScene,
        swipePosition,
    ]);

    return null;
};
