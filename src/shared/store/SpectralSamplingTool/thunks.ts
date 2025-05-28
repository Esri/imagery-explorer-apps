/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Point from '@arcgis/core/geometry/Point';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    selectIdOfSelectedItemInListOfQueryParams,
    selectSelectedItemFromListOfQueryParams,
} from '../ImageryScene/selectors';
import {
    SpectralSamplingData,
    samplingDataUpdated,
    dataOfSelectedSamplingPointChanged,
    classificationNameUpdated,
    targetServiceUpdated,
} from './reducer';
import {
    selectSelectedSpectralSamplingPointData,
    selectSpectralSamplingPointsData,
    selectTargetService,
} from './selectors';
import { getLandsatPixelValues } from '@shared/services/landsat-level-2/getLandsatPixelValues';
import { queryParamsListChanged } from '../ImageryScene/reducer';
import { getSentinel2PixelValues } from '@shared/services/sentinel-2/getSentinel2PixelValues';
import {
    deleteSessionDataFromIndexedDB,
    SpectralSamplingToolSessionData,
} from '@shared/utils/indexedDB/sessioOfSpectralSamplingTool';

let abortController: AbortController = null;

export const addSpectralSamplingPoint =
    (uniqueId: string) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        const existingSamplingPoints = selectSpectralSamplingPointsData(
            getState()
        );

        const data: SpectralSamplingData = {
            uniqueId,
            location: null,
            bandValues: null,
            isLoading: false,
        };

        const updatedSamplingPoints: SpectralSamplingData[] = [
            ...existingSamplingPoints,
            data,
        ];

        dispatch(samplingDataUpdated(updatedSamplingPoints));

        // dispatch(queryLocationChanged(point));
    };

export const removeSpectralSamplingPoint =
    (idOfItem2Remove: string) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        const existingSamplingPoints = selectSpectralSamplingPointsData(
            getState()
        );

        // remove the sampling point by id
        const updatedSamplingPoints = existingSamplingPoints.filter(
            (d) => d.uniqueId !== idOfItem2Remove
        );

        dispatch(samplingDataUpdated(updatedSamplingPoints));

        // dispatch(queryLocationChanged(point));
    };

export const updateLocationOfSpectralSamplingPoint =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        // dispatch(queryLocationChanged(point));

        const targetService = selectTargetService(getState());

        const idOfSelectedSamplingPoint =
            selectIdOfSelectedItemInListOfQueryParams(getState());

        const selectedSpectralSamplingPointData =
            selectSelectedSpectralSamplingPointData(getState());

        const queryParamsOfSelectedSpectralSamplingPoint =
            selectSelectedItemFromListOfQueryParams(getState());

        if (!idOfSelectedSamplingPoint) {
            console.log(
                'no selected sampling point is found, abort calling updateLocationOfSpectralSamplingPoint'
            );
            return;
        }

        if (
            !queryParamsOfSelectedSpectralSamplingPoint ||
            !queryParamsOfSelectedSpectralSamplingPoint.acquisitionDate ||
            !queryParamsOfSelectedSpectralSamplingPoint.objectIdOfSelectedScene
        ) {
            console.log(
                'select a imagery scene first, abort calling updateLocationOfSpectralSamplingPoint'
            );
            return;
        }

        if (selectedSpectralSamplingPointData?.location) {
            console.log(
                'sampling point aleady has a location selected, abort calling updateLocationOfSpectralSamplingPoint'
            );
            return;
        }

        // save the user selected location and set loading indicator to true
        let updatedData4SelectedSamplingPoint: SpectralSamplingData = {
            ...selectedSpectralSamplingPointData,
            location: {
                ...point.toJSON(),
                latitude: point.latitude,
                longitude: point.longitude,
            },
            isLoading: true,
        };

        dispatch(
            dataOfSelectedSamplingPointChanged({
                id: idOfSelectedSamplingPoint,
                data: updatedData4SelectedSamplingPoint,
            })
        );

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        try {
            let bandValues: number[] = null;

            if (targetService === 'landsat') {
                bandValues = await getLandsatPixelValues({
                    point,
                    objectIds: [
                        queryParamsOfSelectedSpectralSamplingPoint.objectIdOfSelectedScene,
                    ],
                    abortController,
                });
            } else if (targetService === 'sentinel-2') {
                bandValues = await getSentinel2PixelValues({
                    point,
                    objectIds: [
                        queryParamsOfSelectedSpectralSamplingPoint.objectIdOfSelectedScene,
                    ],
                    abortController,
                });
            }

            if (!bandValues) {
                throw new Error(
                    'failed to get band values for the input location'
                );
            }

            updatedData4SelectedSamplingPoint = {
                ...updatedData4SelectedSamplingPoint,
                bandValues,
                isLoading: false,
            };

            dispatch(
                dataOfSelectedSamplingPointChanged({
                    id: idOfSelectedSamplingPoint,
                    data: updatedData4SelectedSamplingPoint,
                })
            );
        } catch (err) {
            console.log(err);

            // failed to get band values for the input location
            // this can happen when user selects a point outside of the imagery scene
            // or clicked on a bad pixel. Just reset the location to null to enforce user picks up
            // a different location
            updatedData4SelectedSamplingPoint = {
                ...updatedData4SelectedSamplingPoint,
                location: null,
                isLoading: false,
            };

            dispatch(
                dataOfSelectedSamplingPointChanged({
                    id: idOfSelectedSamplingPoint,
                    data: updatedData4SelectedSamplingPoint,
                })
            );
        }
    };

/**
 * Reset current sampling session will remove all sampling points and query params associated with it,
 * it will also reset classification name
 * @returns
 */
export const resetCurrentSamplingSession =
    () => (dispatch: StoreDispatch, getState: StoreGetState) => {
        dispatch(samplingDataUpdated([]));

        dispatch(
            queryParamsListChanged({
                queryParams: [],
                selectedItemID: '',
            })
        );

        dispatch(classificationNameUpdated(''));

        dispatch(targetServiceUpdated(null));

        // dispatch(queryLocationChanged(point));
    };

export const resumePreviousSession =
    (sessionData: SpectralSamplingToolSessionData) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        const {
            targetService,
            sessionName,
            queryParamsForSamplingPoints,
            samplingPoints,
        } = sessionData || {};

        if (!targetService || !sessionName) {
            console.log(
                'no target service or session name found in the session data'
            );
            return;
        }

        dispatch(samplingDataUpdated(samplingPoints || []));

        dispatch(
            queryParamsListChanged({
                queryParams: queryParamsForSamplingPoints || [],
                selectedItemID: queryParamsForSamplingPoints[0]?.uniqueId || '',
            })
        );

        dispatch(classificationNameUpdated(sessionName));

        dispatch(targetServiceUpdated(targetService));
    };
