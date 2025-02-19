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

enum SessionStorageKeys {
    OPEN_SAVE_PANEL = 'openSavePanel',
}

/**
 * Sets the state of the "Open Save Panel" in the session storage.
 *
 * @param shouldOpenSavePanel - A boolean indicating whether the save panel should be open.
 * @returns {void}
 */
export const setOpenSavePanelInSessionStorage = (
    shouldOpenSavePanel: boolean
) => {
    if (!shouldOpenSavePanel) {
        sessionStorage.removeItem(SessionStorageKeys.OPEN_SAVE_PANEL);
    } else {
        sessionStorage.setItem(SessionStorageKeys.OPEN_SAVE_PANEL, 'true');
    }
};

/**
 * Gets the state of the "Open Save Panel" from the session storage.
 *
 * @returns {boolean} - A boolean indicating whether the save panel should be open.
 */
export const getOpenSavePanelFromSessionStorage = () => {
    return (
        sessionStorage.getItem(SessionStorageKeys.OPEN_SAVE_PANEL) === 'true'
    );
};
