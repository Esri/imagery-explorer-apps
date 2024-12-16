// Open or create the database
const openDatabase = (
    dbName: string,
    storeName: string
): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, {
                    keyPath: 'id',
                    autoIncrement: true,
                });
            }
        };

        request.onsuccess = (event: Event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event: Event) => {
            reject((event.target as IDBOpenDBRequest).error);
        };
    });
};

// Save data to the store
export const saveData = async <T>(
    dbName: string,
    storeName: string,
    data: T
): Promise<IDBValidKey> => {
    const db = await openDatabase(dbName, storeName);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const request = store.add(data);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error);
        };
    });
};

// Update data in the store by unique id
export const updateData = async <T>(
    dbName: string,
    storeName: string,
    data: T
): Promise<void> => {
    const db = await openDatabase(dbName, storeName);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const request = store.put(data);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error);
        };
    });
};

// Retrieve data by key
export const getDataByKey = async <T>(
    dbName: string,
    storeName: string,
    key: IDBValidKey
): Promise<T | undefined> => {
    const db = await openDatabase(dbName, storeName);

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        const request = store.get(key);

        request.onsuccess = () => {
            resolve(request.result as T | undefined);
        };

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error);
        };
    });
};
// Retrieve all data from the store
export const getAllData = async <T>(
    dbName: string,
    storeName: string
): Promise<T[]> => {
    const db = await openDatabase(dbName, storeName);
    // console.log('db', db);

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result as T[]);
        };

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error);
        };
    });
};

// Function to delete all records in a store
export const clearStore = async (
    dbName: string,
    storeName: string
): Promise<void> => {
    const db = await openDatabase(dbName, storeName);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const request = store.clear();

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error);
        };
    });
};

// Delete data by key
export const deleteDataByKey = async (
    dbName: string,
    storeName: string,
    key: IDBValidKey
): Promise<void> => {
    const db = await openDatabase(dbName, storeName);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const request = store.delete(key);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error);
        };
    });
};

// // Example usage
// (async () => {
//     const dbName = 'MyDatabase';
//     const storeName = 'MyStore';

//     // Save data
//     const id = await saveData(dbName, storeName, { name: 'John Doe', age: 30, id: nanoid(5) });
//     const id2 = await saveData(dbName, storeName, { name: 'John Smith', age: 35, id: nanoid(5) });
//     console.log('Saved with ID:', id);

//     // Retrieve data by key
//     const data = await getDataByKey<{ name: string; age: number }>(dbName, storeName, id);
//     console.log('Retrieved data:', data);

//     // Retrieve all data
//     const allData = await getAllData<{ name: string; age: number }>(dbName, storeName);
//     console.log('All data:', allData);

//     // Delete data by key
//     await deleteDataByKey(dbName, storeName, id);
//     console.log('Deleted data with ID:', id);

//     // Retrieve all data
//     const allData2 = await getAllData<{ name: string; age: number }>(dbName, storeName);
//     console.log('All data:', allData2);
// })();
