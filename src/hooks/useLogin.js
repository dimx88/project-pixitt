import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const {dispatch} = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            if (!response) {
                throw new Error('Failed to log in');
            }
            console.log('log in successful');
            console.log(response.user);
            dispatch({type: 'LOGIN', payload: response.user});


        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    };

    return {login, isPending, error};
};
