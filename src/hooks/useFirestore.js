import { collection, addDoc, updateDoc, deleteDoc, serverTimestamp, doc } from 'firebase/firestore';
import { useReducer, useEffect, useState } from 'react';

import { db } from '../firebase/config';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
};

export const useFirestore = (collectionName) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCanceled, setIsCanceled] = useState(false);

    function firestoreReducer(state, action) {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: null, error: null };
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null };
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null };
        case 'UPDATED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null };
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload };
        default:
            return state;
    }
};

// Collection ref
const colRef = collection(db, collectionName);

// Only dispatch if not canceled
const dispatchIfNotCanceled = (action) => {
    if (!isCanceled) {
        dispatch(action);
    }
};

// Add a document
const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
        const createdAt = serverTimestamp();
        const addedDocument = await addDoc(colRef, { ...doc, createdAt });
        dispatchIfNotCanceled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
    } catch (err) {
        dispatchIfNotCanceled({ type: 'ERROR', payload: err.message });
    }
};

// Delete a document
const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });

    try {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
        dispatchIfNotCanceled({ type: 'DELETED_DOCUMENT' });
    } catch (err) {
        dispatchIfNotCanceled({ type: 'ERROR', payload: 'could not delete document' });
    }
};

// Update a document
const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });

    try {
        const docRef = doc(db, collectionName, id);
        const updatedDocument = await updateDoc(docRef, updates);
        dispatchIfNotCanceled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
    } catch (err) {
        dispatchIfNotCanceled({ type: 'ERROR', payload: 'could not update document' });
    }
};

// Cleanup function
useEffect(() => { return () => setIsCanceled(true) }, [])

return { addDocument, updateDocument, deleteDocument, response };
};