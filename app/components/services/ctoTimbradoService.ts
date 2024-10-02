import { TimbradoData } from "../interface/Timbrado";

const DB_NAME = "TimbradoDB";
const STORE_NAME = "timbrados";

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject("Error opening database");

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(STORE_NAME, { keyPath: "cto" });
    };
  });
};

export const addTimbrado = async (timbrado: TimbradoData): Promise<string> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(timbrado);

    request.onerror = () => reject("Error adding timbrado");
    request.onsuccess = () => resolve(timbrado.cto);
  });
};

export const getAllTimbrados = async (): Promise<TimbradoData[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject("Error getting timbrados");
    request.onsuccess = () => resolve(request.result);
  });
};

export const updateTimbrado = async (
  cto: string,
  timbrado: TimbradoData
): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(timbrado);

    request.onerror = () => reject("Error updating timbrado");
    request.onsuccess = () => resolve();
  });
};

export const deleteTimbrado = async (cto: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(cto);

    request.onerror = () => reject("Error deleting timbrado");
    request.onsuccess = () => resolve();
  });
};
