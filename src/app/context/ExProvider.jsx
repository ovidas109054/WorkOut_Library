"use client";
import React,{ createContext, useState } from 'react';

export const ExContext = createContext({});

const ExProvider = ({children}) => {
    const [AddTodays,setAddTodays] = useState([])
    const[SaveAs , setSaveAs] = useState([])

    const sharedData = {

        AddTodays,
        setAddTodays,
        SaveAs,
        setSaveAs,
    };
    return (
    <ExContext.Provider value={sharedData}>
        {children}
    </ExContext.Provider>)
};
export default ExProvider;