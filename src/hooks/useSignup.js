import { useState } from 'react';

import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const {dispatch} = useAuthContext();
 
    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            // Sign up user
            const response = await createUserWithEmailAndPassword(auth, email, password);

            if (!response) {
                throw new Error('Could not complete sign up');
            }

            // Add display name 
            updateProfile(response.user, {displayName});

            // Dispatch login action
            dispatch({type:'LOGIN', payload: response.user});

            setIsPending(false);
            setError(null);

        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    };

    return { error, isPending, signup };
};