
"use client";

import { createContext, useState } from "react";

export const ExContext = createContext(null);

const ExProvider = ({ children }) => {
    const [AddTodays, setAddTodays] = useState([]);
    const [SaveAs, setSaveAs] = useState([]);

    const addToToday = (exercise) => {
        if (AddTodays.some((item) => item.id === exercise.id)) {
            return "duplicate";
        }

        if (AddTodays.length >= 5) {
            return "limit";
        }

        setAddTodays((prev) => [
            ...prev,
            { ...exercise, completed: false },
        ]);

        setSaveAs((prev) =>
            prev.filter((item) => item.id !== exercise.id)
        );

        return "success";
    };

    const saveForLater = (exercise) => {
        if (SaveAs.some((item) => item.id === exercise.id)) {
            return "duplicate";
        }

        setSaveAs((prev) => [...prev, exercise]);

        setAddTodays((prev) =>
            prev.filter((item) => item.id !== exercise.id)
        );

        return "success";
    };

    const removeFromToday = (id) => {
        setAddTodays((prev) => prev.filter((item) => item.id !== id));
    };

    const removeFromSaved = (id) => {
        setSaveAs((prev) => prev.filter((item) => item.id !== id));
    };

    const markAsDone = (id) => {
        setAddTodays((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, completed: !item.completed }
                    : item
            )
        );
    };

    return (
        <ExContext.Provider
            value={{
                AddTodays,
                setAddTodays,
                SaveAs,
                setSaveAs,
                addToToday,
                saveForLater,
                removeFromToday,
                removeFromSaved,
                markAsDone,
            }}
        >
            {children}
        </ExContext.Provider>
    );
};

export default ExProvider;
