import {
    SpectralSamplingData,
    SpectralSamplingToolSupportedService,
} from '@shared/store/SpectralSamplingTool/reducer';
import { clearStore, getAllData, saveData } from './helpers';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';

const dbName = 'SpectralSamplingToolDB';
const storeName = 'SessionDataStore';

export type SpectralSamplingToolSessionData = {
    /**
     * The target service for the spectral sampling tool session.
     */
    targetService: SpectralSamplingToolSupportedService;
    /**
     * The name of the session for the spectral sampling tool.
     */
    sessionName: string;
    /**
     * query params for sampling points.
     */
    queryParamsForSamplingPoints: QueryParams4ImageryScene[];
    /**
     * sampling points that the user has created for the current session
     */
    samplingPoints: SpectralSamplingData[];
};

export const saveSessionData2IndexedDB = async (
    sessionData: SpectralSamplingToolSessionData
) => {
    // clear the store before saving new data
    await deleteSessionDataFromIndexedDB();

    await saveData(dbName, storeName, sessionData);

    console.log('Session data saved to IndexedDB:', sessionData);
};

export const getSessionDataFromIndexedDB =
    async (): Promise<SpectralSamplingToolSessionData> => {
        // Retrieve all data from the store
        const data = await getAllData<SpectralSamplingToolSessionData>(
            dbName,
            storeName
        );

        const sessionData = data[0] || null;

        return sessionData;
    };

/**
 * Deletes all session data from IndexedDB.
 * This is useful for clearing the store when starting a new session.
 */
export const deleteSessionDataFromIndexedDB = async () => {
    await clearStore(dbName, storeName);
    console.log('Session data deleted from IndexedDB');
};
