import { useState } from 'react';

import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            // Sign up user
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response.user.uid);

            if (!response) {
                throw new Error('Could not complete sign up');
            }

            // Add display name 
            updateProfile(response.user, {displayName});

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