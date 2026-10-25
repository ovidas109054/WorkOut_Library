"use client"

import { CalendarDays } from "lucide-react";
import React, { useContext } from 'react';
import { ExContext } from "../../context/ExProvider";

const AddButton = (data) => {

    const{AddTodays,setAddTodays} = useContext(ExContext);

    const handelAddbut = () =>{
        setAddTodays([...AddTodays, data])
    }
    return (
        <div>
            <button className="btn bg-[#c6ff00] text-gray-800 rounded-2xl hover:scale-[1.02]" onClick={() =>handelAddbut()}><CalendarDays size={18} />Add to today&apos;s plan</button>
        </div>
    );
};

export default AddButton;