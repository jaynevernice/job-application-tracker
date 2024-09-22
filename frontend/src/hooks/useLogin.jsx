import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5555/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });

        const json = await response.json();

        if(!response.ok) {
            console.log('Login failed:', json); 
            setIsLoading(false);
            setError(json.error);
        }

        if(response.ok) {
            console.log("Saving user to localStorage:", json); 
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);
        }
    }

    return {login, isLoading, error};
}