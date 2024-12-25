export async function saveMessagesToIndexedDB(contactId, messages) {
    const db = await openDatabase();
    const tx = db.transaction('messages', 'readwrite');
    const store = tx.objectStore('messages');
    store.put({ contactId, messages });
    await tx.done;
}

export async function getMessagesFromIndexedDB(contactId) {
    const db = await openDatabase();
    const tx = db.transaction('messages', 'readonly');
    const store = tx.objectStore('messages');
    const record = await store.get(contactId);
    return record ? record.messages : null;
}

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ChatApp', 1);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('messages')) {
                db.createObjectStore('messages', { keyPath: 'contactId' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
