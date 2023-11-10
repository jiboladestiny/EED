"use client"
import { useState } from "react"

const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [state, setState] = useState(() => {
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });
    const setValue = (value: T) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setState(value);
        } catch (error) {
            console.log(error);
        }
    };

    return [state, setValue] as const;
}

export default useLocalStorage