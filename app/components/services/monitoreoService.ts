// utils/indexedDB.ts
export const openDB = async (dbName: string, storeName: string) => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addItem = async (dbName: string, storeName: string, item: any) => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  store.add(item);
  return transaction.oncomplete;
};

export const getAllItems = async (dbName: string, storeName: string) => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  return store.getAll();
};

export const updateItem = async (
  dbName: string,
  storeName: string,
  id: number,
  item: any
) => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  store.put({ ...item, id });
  return transaction.oncomplete;
};

export const deleteItem = async (
  dbName: string,
  storeName: string,
  id: number
) => {
  const db = await openDB(dbName, storeName);
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  store.delete(id);
  return transaction.oncomplete;
};
