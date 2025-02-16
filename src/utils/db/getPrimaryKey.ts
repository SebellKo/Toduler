const getPrimaryKey = async (
  id: string,
  nameIndex: IDBIndex
): Promise<IDBValidKey> => {
  return new Promise((resolve, reject) => {
    const getKeyRequest = nameIndex.getKey(id);

    getKeyRequest.onsuccess = (event) => {
      if (!event.target) return;
      const result = (event.target as IDBRequest).result;
      resolve(result);
    };
    getKeyRequest.onerror = (error) => reject(error);
  });
};

export default getPrimaryKey;
