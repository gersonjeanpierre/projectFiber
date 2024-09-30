// indexedDBService.ts

const DB_NAME = "TimbradoDB";
const STORE_NAME = "Routes";

export const openDB = async () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event);
  });
};

export const saveDataByKey = async (key: string, data: any) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.put(data, key); // Guardar solo la data con el filename como clave
  await tx.oncomplete;
};

export const getDataByKey = async (key: string) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.get(key);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al obtener los datos");
  });
};

export const getAllKeys = async () => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.getAllKeys();
  return new Promise<string[]>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as string[]);
    request.onerror = () => reject("Error al obtener las claves");
  });
};
