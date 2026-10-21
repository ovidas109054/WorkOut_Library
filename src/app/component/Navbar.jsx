import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {

    const link = <>
            
          <li><Link href="/home" >Workouts</Link></li>
          <li><Link href="/Post">My Plans</Link></li>
    </>
    return (
        <div className=" bg-transparent ">
        <div className=" container mx-auto px-40  navbar border-b border-gray-50 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <Image src="/logo.png" alt="Logo" width={30} height={30} className="object-contain"/>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {link}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">FITLOG</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {link}
                </ul>
            </div>
            <div className="navbar-end gap-4">
                <a className="btn bg-transparent">Plan</a>
                <a className="btn bg-transparent">Saved</a>
            </div>
        </div>
        </div>
    );
};

export default Navbar;