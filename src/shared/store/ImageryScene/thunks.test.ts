import configureAppStore, { AppStore } from '../configureStore';
import reducer, {
    DefaultQueryParams4ImageryScene,
    ImageryScenesState,
    QueryParams4ImageryScene,
    activeAnalysisToolChanged,
    initialImagerySceneState,
    isSecondarySceneActiveToggled,
    modeChanged,
    queryParamsListChanged,
} from './reducer';
import { selectQueryParams4SceneInSelectedMode } from './selectors';
import { updateQueryParams4SceneInSelectedMode } from './thunks';

describe('thunks of ImageryScene slice of Redux Store', () => {
    let store: AppStore;

    beforeEach(() => {
        store = configureAppStore();
    });

    describe('test updateQueryParams4SceneInSelectedMode thunk', () => {
        const queryParams4MainScene: QueryParams4ImageryScene = {
            ...DefaultQueryParams4ImageryScene,
            uniqueId: 'mainScene',
        };

        const queryParams4SecondaryScene: QueryParams4ImageryScene = {
            ...DefaultQueryParams4ImageryScene,
            uniqueId: 'secondaryScene',
        };

        const queryParams4AnotherScene: QueryParams4ImageryScene = {
            ...DefaultQueryParams4ImageryScene,
            uniqueId: 'anotherScene',
        };

        it('should update queryParams4MainScene by default', () => {
            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams4MainScene,
                objectIdOfSelectedScene: 1,
            };

            store.dispatch(
                updateQueryParams4SceneInSelectedMode(updatedQueryParams)
            );

            expect(
                selectQueryParams4SceneInSelectedMode(store.getState())
            ).toMatchObject(updatedQueryParams);
        });

        it('should update queryParams4MainScene in "swipe" mode by default', () => {
            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams4MainScene,
                objectIdOfSelectedScene: 2,
            };

            store.dispatch(modeChanged('swipe'));

            store.dispatch(
                updateQueryParams4SceneInSelectedMode(updatedQueryParams)
            );

            expect(
                selectQueryParams4SceneInSelectedMode(store.getState())
            ).toMatchObject(updatedQueryParams);
        });

        it('should update queryParams4SecondaryScene in "swipe" mode when secondary scene is active', () => {
            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams4SecondaryScene,
                objectIdOfSelectedScene: 3,
            };

            store.dispatch(modeChanged('swipe'));
            store.dispatch(isSecondarySceneActiveToggled(true));

            store.dispatch(
                updateQueryParams4SceneInSelectedMode(updatedQueryParams)
            );

            expect(
                selectQueryParams4SceneInSelectedMode(store.getState())
            ).toMatchObject(updatedQueryParams);
        });

        it('should update queryParams4MainScene in "analysis" mode by default', () => {
            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams4MainScene,
                objectIdOfSelectedScene: 4,
            };

            store.dispatch(modeChanged('analysis'));

            store.dispatch(
                updateQueryParams4SceneInSelectedMode(updatedQueryParams)
            );

            expect(
                selectQueryParams4SceneInSelectedMode(store.getState())
            ).toMatchObject(updatedQueryParams);
        });

        it('should update queryParams4SecondaryScene in "ChangeCompareTool" when secondary scene is active', () => {
            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams4SecondaryScene,
                objectIdOfSelectedScene: 5,
            };

            store.dispatch(modeChanged('analysis'));
            store.dispatch(activeAnalysisToolChanged('change'));
            store.dispatch(isSecondarySceneActiveToggled(true));

            store.dispatch(
                updateQueryParams4SceneInSelectedMode(updatedQueryParams)
            );

            expect(
                selectQueryParams4SceneInSelectedMode(store.getState())
            ).toMatchObject(updatedQueryParams);
        });

        it('should update queryParams for selected scene in "animate" mode', () => {
            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams4AnotherScene,
                objectIdOfSelectedScene: 6,
            };

            store.dispatch(modeChanged('animate'));
            store.dispatch(
                queryParamsListChanged({
                    queryParams: [
                        queryParams4MainScene,
                        queryParams4SecondaryScene,
                        queryParams4AnotherScene,
                    ],
                    selectedItemID: queryParams4AnotherScene.uniqueId,
                })
            );

            store.dispatch(
                updateQueryParams4SceneInSelectedMode(updatedQueryParams)
            );

            expect(
                selectQueryParams4SceneInSelectedMode(store.getState())
            ).toMatchObject(updatedQueryParams);
        });
    });
});
