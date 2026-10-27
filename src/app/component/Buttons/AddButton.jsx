
"use client";

import { useContext } from "react";
import { Dumbbell } from "lucide-react";
import { ExContext } from "../../context/ExProvider";
import { toast } from "react-toastify";


const AddButton = ({ exercise }) => {
    const { addToToday } = useContext(ExContext);

    const handleAdd = () => {
        const result = addToToday(exercise);

        if (result === "success") {
            toast.success("Exercise added to today's plan!");
        } else if (result === "duplicate") {
            toast.warning("Already in your plan! Remove it before adding again.");
        } else if (result === "limit") {
            toast.error("Your plan is full! Remove an exercise first.");
        }
    };

    return (
        <button
            onClick={handleAdd}
            className="btn bg-[#c6ff00] text-black rounded-2xl hover:scale-[1.02]"
        >
            <Dumbbell size={18} />
            Add to Today&apos;s Plan
        </button>
    );
};

export default AddButton;
