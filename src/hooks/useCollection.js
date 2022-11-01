import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";

// If you want an inner collection pass _collectionPath as an array
export const useCollection = (_collectionPath, _queryParams, _orderByParams) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    /* 
        If we don't use a useRef, an infinite loop will be triggered in useEffect
        since _queryParams is an array (a reference type) which is seen as different on every function call
     */
    const queryParams = useRef(_queryParams).current;
    const orderByParams = useRef(_orderByParams).current;
    const collectionPath = useRef(_collectionPath).current;

    useEffect(() => {
        let ref = collection(db, ...collectionPath);

        // If queryParams were passed to useCollection, change ref to represent the query 
        if (queryParams) {
            if (orderByParams) {
                ref = query(ref, where(...queryParams), orderBy(...orderByParams));
            }
            else {
                ref = query(ref, where(...queryParams));
            }
        }



        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id });
            })

            // Update state
            setDocuments(results);
            setError(null);
        }, (error) => {
            console.log(error);
            setError('Could not fetch the data');
        });

        // Unsubscribe when the containing component unmounts
        return () => unsubscribe();

    }, [collectionPath, queryParams, orderByParams]);

    return { documents, error, orderBy };
};