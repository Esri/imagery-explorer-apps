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
import { calcSpectralIndex } from '@shared/services/landsat-2/helpers';

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

    const availableScenes = useSelector(selectAvailableScenesByObjectId);

    const swipePosition = useSelector(selectSwipeWidgetHandlerPosition);

    const openPopupRef = useRef<MapViewOnClickHandler>();

    const getLoadingIndicator = () => {
        const popupDiv = document.createElement('div');
        popupDiv.innerHTML = `<calcite-loader scale="s"></calcite-loader>`;
        return popupDiv;
    };

    const getMainContent = (values: number[], mapPoint: IPoint) => {
        const lat = Math.round(mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(mapPoint.longitude * 1000) / 1000;

        const popupDiv = document.createElement('div');

        /**
         * Degree Symbol for Farhenheit: ℉
         */
        const farhenheitSign = `&#176;F`;

        /**
         * Degree Symbol for Celcius: C
         */
        const celciusSign = `&#176;C`;

        const surfaceTempFarhenheit =
            calcSpectralIndex('temperature farhenheit', values).toFixed(0) +
            farhenheitSign;

        const surfaceTempCelcius =
            calcSpectralIndex('temperature celcius', values).toFixed(0) +
            celciusSign;

        const vegetationIndex = calcSpectralIndex('vegetation', values).toFixed(
            3
        );

        const waterIndex = calcSpectralIndex('water', values).toFixed(3);

        popupDiv.innerHTML = `
            <div class='text-custom-light-blue text-xs'>
                <div class='mb-2'>
                    <span><span class='text-custom-light-blue-50'>Surface Temp:</span> ${surfaceTempFarhenheit} / ${surfaceTempCelcius}</span>
                    <br />
                    <span><span class='text-custom-light-blue-50'>NDVI:</span> ${vegetationIndex}</span>
                    <span class='ml-2'><span class='text-custom-light-blue-50'>MNDWI:</span> ${waterIndex}</span>
                </div>
                <div class='flex'>
                    <p><span class='text-custom-light-blue-50'>x</span> ${lon}</p>
                    <p class='ml-2'><span class='text-custom-light-blue-50'>y</span> ${lat}</p>
                </div>
            </div>
        `;

        return popupDiv;
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

            const res = await getSamples(mapPoint, [
                queryParams.objectIdOfSelectedScene,
            ]);
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
            openPopupRef.current(evt.mapPoint, evt.x);
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
