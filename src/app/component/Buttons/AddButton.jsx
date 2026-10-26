
"use client";

import { useContext } from "react";
import { Dumbbell } from "lucide-react";
import { toast } from "react-toastify";
import { ExContext } from "../../context/ExProvider";
import { toast } from "react-toastify";

toast.success("Added to today's plan!");

const AddButton = ({ exercise }) => {
    const { addToToday } = useContext(ExContext);

    const handleAdd = () => {
        const result = addToToday(exercise);

        if (result) {
            toast.success("Added to today's plan!");
        } else {
            toast.error("Already added or maximum limit reached!");
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
