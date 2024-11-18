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
