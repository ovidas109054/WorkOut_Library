
"use client";

import React, { createContext, useState } from "react";

export const ExContext = createContext(null);

const ExProvider = ({ children }) => {
    const [AddTodays, setAddTodays] = useState([]);
    const [SaveAs, setSaveAs] = useState([]);

    const addToToday = (exercise) => {
        if (AddTodays.some((item) => item.id === exercise.id)) {
            return false;
        }

        if (AddTodays.length >= 5) {
            return false;
        }

        setAddTodays([...AddTodays, { ...exercise, completed: false }]);
        setSaveAs(SaveAs.filter((item) => item.id !== exercise.id));

        return true;
    };

    const saveForLater = (exercise) => {
        if (SaveAs.some((item) => item.id === exercise.id)) {
            return false;
        }

        setSaveAs([...SaveAs, exercise]);
        setAddTodays(AddTodays.filter((item) => item.id !== exercise.id));

        return true;
    };

    const removeFromToday = (id) => {
        setAddTodays(AddTodays.filter((item) => item.id !== id));
    };

    const removeFromSaved = (id) => {
        setSaveAs(SaveAs.filter((item) => item.id !== id));
    };

    const markAsDone = (id) => {
        setAddTodays(
            AddTodays.map((item) =>
                item.id === id
                    ? { ...item, completed: true }
                    : item
            )
        );
    };

    const sharedData = {
        AddTodays,
        setAddTodays,
        SaveAs,
        setSaveAs,
        addToToday,
        saveForLater,
        removeFromToday,
        removeFromSaved,
        markAsDone,
    };

    return (
        <ExContext.Provider value={sharedData}>
            {children}
        </ExContext.Provider>
    );
};

export default ExProvider;
