import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ExercieseCard = ({exercise}) => {
    const { id, name, image, equipment, difficulty, duration, caloriesBurned, rating} = exercise;
    return (
          
        <Link href={`/WorkOut/${id}`} className="block rounded-xl transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6ff00]">


        <div key = {id} className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <Image src={image} alt={name} width={300} height={100} className='h-full w-full object-cover' />
            </figure>
            <div className="card-body gap-3 p-6">
                <div className="flex flex-wrap gap-2">
                    <span className="badge border-0 bg-[#c6ff00] font-semibold text-black">
                        {equipment}
                    </span>

                    <span className="badge border-0 bg-[#c6ff00] font-semibold text-black">
                        {difficulty}
                    </span>
                </div>
                <h2 className="text-xl font-extrabold uppercase tracking-wide text-white">
                    {name}
                </h2>
                <p className="text-sm text-gray-400">
                    {equipment}
                </p>
                <div className="my-1 border-t border-gray-800" />

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                        <span>◷</span>
                        {duration} min
                    </span>

                    <span className="flex items-center gap-2">
                        <span>🔥</span>
                        {caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-2">
                        <span>☆</span>
                        {rating}
                    </span>
                </div>
            </div>
        </div>
        </Link>

    );
};

export default ExercieseCard;