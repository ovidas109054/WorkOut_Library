
"use client";

import { useContext } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "react-toastify";
import { ExContext } from "../../context/ExProvider";

const SaveButton = ({ exercise }) => {
    const { saveForLater } = useContext(ExContext);

    const handleSave = () => {
        const result = saveForLater(exercise);

        if (result) {
            toast.success("Saved for later!");
        } else {
            toast.error("Already saved!");
        }
    };

    return (
        <button
            onClick={handleSave}
            className="btn bg-transparent rounded-2xl hover:scale-[1.02]"
        >
            <Bookmark size={18} />
            Save for later
        </button>
    );
};

export default SaveButton;
