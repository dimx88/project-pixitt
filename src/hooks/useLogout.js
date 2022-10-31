import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

export const useLogout = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const {dispatch} = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            await signOut(auth);

            dispatch({type: 'LOGOUT'});
            setIsPending(false);
            setError(null);

        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    };

    return {logout, isPending, error};
};
