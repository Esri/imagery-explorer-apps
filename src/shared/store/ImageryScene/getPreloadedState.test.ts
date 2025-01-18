import { getPreloadedState4ImageryScenes } from './getPreloadedState';
import { InterestingPlaceData } from '@typing/shared';
import { initialImagerySceneState } from './reducer';

describe('getPreloadedState4ImageryScenes', () => {
    const randomInterestingPlace: InterestingPlaceData = {
        name: 'Interesting Place 1',
        location: {
            center: [-117.1825, 34.0556],
            zoom: 10,
        },
        renderer: 'NDVI',
        thumbnail: null,
    };

    const defaultRasterFunction = 'Natural Color with DRA';

    it('should return initial state with dynamic mode', () => {
        const hashParams = new URLSearchParams();
        const state = getPreloadedState4ImageryScenes(
            hashParams,
            randomInterestingPlace,
            defaultRasterFunction
        );

        expect(state.mode).toBe('dynamic');
        expect(state).toEqual({
            ...initialImagerySceneState,
            mode: 'dynamic',
            tool: 'mask',
            queryParams4MainScene: {
                ...initialImagerySceneState.queryParams4MainScene,
                rasterFunctionName: randomInterestingPlace.renderer,
            },
            queryParams4SecondaryScene: {
                ...initialImagerySceneState.queryParams4SecondaryScene,
                rasterFunctionName: defaultRasterFunction,
            },
            queryParamsList: {
                byId: {},
                ids: [],
                selectedItemID: null,
            },
        });
    });

    it('should handle query params for main and secondary scenes', () => {
        const hashParams = new URLSearchParams(
            `mode=swipe&mainScene=2024-06-16|Natural Color with DRA|0&secondaryScene=2025-01-12|Color Infrared with DRA|1`
        );

        const state = getPreloadedState4ImageryScenes(
            hashParams,
            null,
            defaultRasterFunction
        );

        expect(state).toMatchObject({
            ...initialImagerySceneState,
            mode: 'swipe',
            queryParams4MainScene: {
                uniqueId: null,
                objectIdOfSelectedScene: 0,
                rasterFunctionName: 'Natural Color with DRA',
                acquisitionDate: '2024-06-16',
                acquisitionDateRange: {
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                },
            },
            queryParams4SecondaryScene: {
                uniqueId: null,
                objectIdOfSelectedScene: 1,
                rasterFunctionName: 'Color Infrared with DRA',
                acquisitionDate: '2025-01-12',
                acquisitionDateRange: {
                    startDate: '2025-01-01',
                    endDate: '2025-12-31',
                },
            },
        });
    });

    it('should handle list of query params from hash params', () => {
        const hashParams = new URLSearchParams(
            `mode=animate&animationScenes=2023-02-01|Natural Color with DRA|100,2024-04-01|Short-wave Infrared with DRA|101,2025-01-01|NDVI Colorized|102`
        );

        const state = getPreloadedState4ImageryScenes(
            hashParams,
            randomInterestingPlace,
            defaultRasterFunction
        );

        expect(state).toMatchObject({
            mode: 'animate',
            queryParamsList: {
                byId: {
                    '1': {
                        uniqueId: '1',
                        objectIdOfSelectedScene: 100,
                        rasterFunctionName: 'Natural Color with DRA',
                        acquisitionDate: '2023-02-01',
                        acquisitionDateRange: {
                            startDate: '2023-01-01',
                            endDate: '2023-12-31',
                        },
                    },
                    '2': {
                        uniqueId: '2',
                        objectIdOfSelectedScene: 101,
                        rasterFunctionName: 'Short-wave Infrared with DRA',
                        acquisitionDate: '2024-04-01',
                        acquisitionDateRange: {
                            startDate: '2024-01-01',
                            endDate: '2024-12-31',
                        },
                    },
                    '3': {
                        uniqueId: '3',
                        objectIdOfSelectedScene: 102,
                        rasterFunctionName: 'NDVI Colorized',
                        acquisitionDate: '2025-01-01',
                        acquisitionDateRange: {
                            startDate: '2025-01-01',
                            endDate: '2025-12-31',
                        },
                    },
                },
                ids: ['1', '2', '3'],
                selectedItemID: '1',
            },
        });
    });
});
