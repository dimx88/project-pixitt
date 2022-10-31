import { createContext, useReducer, useEffect } from 'react';

import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, authIsReady: false });

    // Initially check if a user is already logged in
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            dispatch({type: 'AUTH_IS_READY', payload: user});
            unsub();
        });
    }, []);
    
    console.log('Authcontext: ', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};


export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true};
        default:
            return state;
    }
};