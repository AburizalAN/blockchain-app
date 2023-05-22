"use client";

import logo from "@/public/images/logo.png"
import Image from 'next/image';
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image src={logo} alt="logo" width={70} />
            </div>
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {["Market", "Exchange", "Tutorial", "Wallets"].map((item, i) => (
                  <NavbarItem key={i} title={item} />
                ))}
              </div>
            </div>
          </div>
          <button className="px-6 py-1.5 bg-indigo-500 hover:bg-indigo-600 rounded-md transition-all">
            login
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavbarItem = ({ title, ...props }) => (
  <Link
    href="#"
    // className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
    aria-current="page"
    {...props}
  >
    {title}
  </Link>
);

export default Navbar;
