import { useEffect, useState } from 'react';

import { collection, doc, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase/config';

export const useDocument = (collectionName, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    // Get real time data for the document
    useEffect(() => {
        const collectionRef = collection(db, collectionName);
        const docRef = doc(collectionRef, id);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id });
                setError(null);
            } else {
                setError('Document does not exist')
                console.warn(`(dim) Document with ID ${id} not exist`);
            }

        }, (err) => {
            console.log(err.message);
            setError('Failed to get document');
        })

        // Cleanup function
        return () => unsubscribe();

    }, [collectionName, id]);

    return { document, error };
}