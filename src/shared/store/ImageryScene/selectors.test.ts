/* Copyright 2024 Esri
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

import reducer, {
    DefaultQueryParams4ImageryScene,
    ImageryScenesState,
    QueryParams4ImageryScene,
    initialImagerySceneState,
    queryParamsListChanged,
} from './reducer';

import { selectQueryParams4SceneInSelectedMode } from './selectors';

describe('selectors of ImageryScene slice of Redux Store', () => {
    describe('test selectQueryParams4SceneInSelectedMode selector', () => {
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

        it('should return queryParams4MainScene by default', () => {
            const initialState: ImageryScenesState = {
                ...initialImagerySceneState,
                queryParams4MainScene,
                queryParams4SecondaryScene,
            };

            const state = reducer(initialState, {} as any);

            expect(
                selectQueryParams4SceneInSelectedMode({
                    ImageryScenes: state,
                } as any)
            ).toMatchObject(queryParams4MainScene);
        });

        it('should return queryParams4MainScene in "Find a Scene" mode', () => {
            const initialState: ImageryScenesState = {
                ...initialImagerySceneState,
                mode: 'find a scene',
                queryParams4MainScene,
                queryParams4SecondaryScene,
            };

            const state = reducer(initialState, {} as any);

            expect(
                selectQueryParams4SceneInSelectedMode({
                    ImageryScenes: state,
                } as any)
            ).toMatchObject(queryParams4MainScene);
        });

        it('should return queryParams4MainScene in "Swipe" mode by default', () => {
            const initialState: ImageryScenesState = {
                ...initialImagerySceneState,
                mode: 'swipe',
                queryParams4MainScene,
                queryParams4SecondaryScene,
            };

            const state = reducer(initialState, {} as any);

            expect(
                selectQueryParams4SceneInSelectedMode({
                    ImageryScenes: state,
                } as any)
            ).toMatchObject(queryParams4MainScene);
        });

        it('should return queryParams4SecondaryScene in "Swipe" mode when secondary scene is active', () => {
            const initialState: ImageryScenesState = {
                ...initialImagerySceneState,
                mode: 'swipe',
                isSecondarySceneActive: true,
                queryParams4MainScene,
                queryParams4SecondaryScene,
            };

            const state = reducer(initialState, {} as any);

            expect(
                selectQueryParams4SceneInSelectedMode({
                    ImageryScenes: state,
                } as any)
            ).toMatchObject(queryParams4SecondaryScene);
        });

        it('should return queryParams4MainScene in "Analysis" mode by default', () => {
            const initialState: ImageryScenesState = {
                ...initialImagerySceneState,
                mode: 'analysis',
                queryParams4MainScene,
                queryParams4SecondaryScene,
            };

            const state = reducer(initialState, {} as any);

            expect(
                selectQueryParams4SceneInSelectedMode({
                    ImageryScenes: state,
                } as any)
            ).toMatchObject(queryParams4MainScene);
        });

        it('should return queryParams4MainScene for "ChangeTool" by default', () => {
            const initialState: ImageryScenesState = {
                ...initialImagerySceneState,
                mode: 'analysis',
                tool: 'change',
                isSecondarySceneActive: false,
                queryParams4MainScene,
                queryParams4SecondaryScene,
            };

            const state = reducer(initialState, {} as any);

            expect(
                selectQueryParams4SceneInSelectedMode({
                    ImageryScenes: state,
                } as any)
            ).toMatchObject(queryParams4MainScene);
        });

        it('should return queryParams4SecondaryScene for "ChangeTool" when secondary scene is active', () => {
            const initialState: ImageryScenesState = {
                ...initialImagerySceneState,
                mode: 'analysis',
                tool: 'change',
                isSecondarySceneActive: true,
                queryParams4MainScene,
                queryParams4SecondaryScene,
            };
            const state = reducer(initialState, {} as any);

            expect(
                selectQueryParams4SceneInSelectedMode({
                    ImageryScenes: state,
                } as any)
            ).toMatchObject(queryParams4SecondaryScene);
        });

        it('should return queryParams4SelectedScene for "Animation" mode', () => {
            const initialState: ImageryScenesState = {
                ...initialImagerySceneState,
                mode: 'animate',
                queryParams4MainScene,
                queryParams4SecondaryScene,
            };

            const state = reducer(
                initialState,
                queryParamsListChanged({
                    queryParams: [
                        queryParams4MainScene,
                        queryParams4SecondaryScene,
                        queryParams4AnotherScene,
                    ],
                    selectedItemID: queryParams4AnotherScene.uniqueId,
                })
            );

            expect(
                selectQueryParams4SceneInSelectedMode({
                    ImageryScenes: state,
                } as any)
            ).toMatchObject(queryParams4AnotherScene);
        });
    });
});
