import './PopUp.css';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import IMapView from 'esri/views/MapView';
import IPoint from 'esri/geometry/Point';
import { useSelector } from 'react-redux';

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
    const wdithOfLeftHalf = mapViewWidth * (swipePosition / 100);
    return mouseX <= wdithOfLeftHalf;
};

const Popup: FC<Props> = ({ mapView }: Props) => {
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
        // // no need to show pop-up for sentinel-2 imagery layer until imagery is visible
        // if (
        //     shouldShowSentinel2Layer &&
        //     isSentinel2LayerOutOfVisibleRange === true
        // ) {
        //     return;
        // }

        const lat = Math.round(mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(mapPoint.longitude * 1000) / 1000;
        const title = `Landsat 9 | AUG 01, 2023`;

        mapView.popup.open({
            title: title,
            location: mapPoint,
            content: getLoadingIndicator(),
        });

        mapView.popup.open({
            // Set the popup's title to the coordinates of the location
            title: title,
            location: mapPoint, // Set the location of the popup to the clicked location
            content: getMainContent(),
        });
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

    // useEffect(() => {
    //     if (mapView) {
    //         mapView.popup.close();
    //     }
    // }, [
    //     aquisitionYear,
    //     aquisitionMonth,
    //     shouldShowSentinel2Layer,
    //     isSentinel2LayerOutOfVisibleRange,
    //     swipePosition,
    //     year4LeadingLayer,
    //     year4TrailingLayer,
    //     mode,
    // ]);

    return null;
};

export default Popup;
