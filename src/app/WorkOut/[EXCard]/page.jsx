import React from 'react';
import Image from 'next/image';
import { Bookmark } from "lucide-react";
import AddButton from '../../component/Buttons/AddButton';
import SaveButton from '../../component/Buttons/SaveButton';


const page = async ({ params }) => {
    const { EXCard } = await params
    const res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${EXCard}`, { cache: "force-cache" });
    if (!res.ok) {
        throw new Error("Fail to load data")
    } const data = await res.json();

    const { id, name, image, equipment, difficulty, duration, caloriesBurned, rating, sets, reps, description, instructions, muscleGroups } = data;
    return (
        <div className="grid grid-cols-2 container mx-auto m-10 p-10">

            <div>
                <Image src={image} alt={name} width={300} height={100} className='h-full w-[90%]  rounded-2xl justify-end' />
            </div>

            <div className="">
                <h2 className="card-title text-4xl font-bold">{name}</h2>
                <p className='text-gray-500 mt-3'>{description}</p>
                <div className="flex gap-2 mt-4">
                    {muscleGroups.map((muscle, index) => (
                        <span key={index} className="badge badge-outline bg-[#c6ff00] text-gray-900 font-bold ">{muscle}</span>
                    ))}
                </div>

                <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden mt-10">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
                        <span className="text-xs font-bold text-gray-400">EQUIPMENT</span>
                        <span className="text-sm text-gray-200">{equipment}</span>
                    </div>

                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
                        <span className="text-xs font-bold text-gray-400">DIFFICULTY</span>
                        <span className="text-sm text-gray-200">{difficulty}</span>
                    </div>

                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
                        <span className="text-xs font-bold text-gray-400">SETS</span>
                        <span className="text-sm text-gray-200">{sets}</span>
                    </div>

                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
                        <span className="text-xs font-bold text-gray-400">REPS</span>
                        <span className="text-sm text-gray-200">{reps}</span>
                    </div>

                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
                        <span className="text-xs font-bold text-gray-400">DURATION</span>
                        <span className="text-sm text-gray-200">{duration} min</span>
                    </div>

                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
                        <span className="text-xs font-bold text-gray-400">CALORIES</span>
                        <span className="text-sm text-gray-200">{caloriesBurned} kcal</span>
                    </div>

                    <div className="flex justify-between items-center px-6 py-4">
                        <span className="text-xs font-bold text-gray-400">RATING</span>
                        <span className="text-sm text-gray-200">{rating}</span>
                    </div>
                </div>



                <div className="mt-6">
                    <h1 className='font-bold text-xl mt-10 mb-5'>INSTRUCTJIONS</h1>

                    <ol className="list-decimal list-inside space-y-3 text-gray-300">
                        {instructions?.map((instruction, index) => (
                            <li key={index} className="leading-7">
                                {instruction}
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="card-actions mt-10 flex gap-4">
                    <AddButton exercise={data} />
                    <SaveButton exercise={data} />
                </div>
            </div>
        </div >
    );
};

export default page;