"use client"
import React, { ReactNode, createContext, useContext } from 'react';
import useLocalStorage from '@/helpers/useLocalStorage';

interface UserData {
    name: string;
    email: string;
    isAdmin: string;
    _id: string;
}

interface DataInterfaceType {
    data: UserData | undefined;
    setUserData: (data: UserData) => void;
}

const DataContext = createContext<DataInterfaceType | undefined>(undefined);

const DataProvider = ({ children }: { children: ReactNode }) => {
    // Specify the types explicitly for useLocalStorage
    const [data, setData] = useLocalStorage<UserData | undefined>('userData', undefined);

    const setUserData = (datas: UserData) => {
        setData(datas);
    };

    return (
        <DataContext.Provider value={{ data, setUserData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;

// Usage:
// Wrap your Next.js pages or components with DataProvider in _app.tsx
export function Data() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}


