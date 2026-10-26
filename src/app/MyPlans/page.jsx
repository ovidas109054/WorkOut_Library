"use client";

import React, { useContext } from 'react';
import { ExContext } from '../context/ExProvider';

const page = () => {
    const{AddTodays: AddButton} = useContext(ExContext);
    return (

        <div className=' mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='p-5'>
                <h1 className='text-4xl'>MY PLAN</h1>
                <h2 className='text-gray-500'>Cap of five lifts for today. Finish them, then load more</h2>
            </div>

            <div className='bg-gray-600'>
                
            </div>
            
        </div>
    );
};

export default page;