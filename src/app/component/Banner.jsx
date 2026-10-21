import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className= "gap-4 mt-10  background bg-gray-900 rounded-2xl ">
            <div className="container mx-auto grid grid-cols-2 ">
                <div>
                    <h1 className='text'>WORKOUT LIBRARY</h1>
                </div>
                    <div className="p">
                    <Image src="/banner.png" alt="Banner" width={300} height={300}></Image>
                </div>
            </div>
        </div>
    );
};

export default Banner;