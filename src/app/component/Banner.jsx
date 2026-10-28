import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const banner = () => {
    return (
        <div className="mx-auto mt-10 w-full max-w-7xl bg-gray-900 rounded-2xl p-6 sm:p-10 ">
            <div className="grid grid-cols-2 item-center gap-8 md:grid-cols-2 ">
                <div className="mt-10">
                    <h1 className='text-lime-400 font-bold text-[.7rem]'>WORKOUT LIBRARY</h1>
                    <h1 className="text-5xl font-bold mt-2">TRAIN WITH INTENT. <br />LOG EVERY SET.</h1>
                    <h2 className="text-gray-500 mt-4"> FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br/>
                        into today&apos;s plan, and watch the week&apos;s work add up.</h2>
                    <Link href="/WorkOut" className="btn mt-6 min-h-11 border-0 bg-lime-400 px-6 text-xs font-bold uppercase text-black shadow-none hover:bg-lime-300">
                        Browse Workouts
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <Image src="/banner.png" alt="Banner" width={360} height={360} priority />
                </div>
            </div>
        </div>
    );
};

export default banner;