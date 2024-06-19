// UserContext.js
import React, { createContext, useReducer } from 'react';

const initialState = {
    user_id: localStorage.getItem('user_id') || null,
    email: localStorage.getItem('email') || null,
};

function userReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('user_id', action.payload.user_id);
            localStorage.setItem('email', action.payload.email);
            return { ...state, user_id: action.payload.user_id, email: action.payload.email };
        
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialState);

    console.log('current state: ', state);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}