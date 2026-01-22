"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ListNotch from "../listNotch/listNotch";

const Notch = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/Services" },
    { name: "About", href: "/About" },
  ];

  const pathname = usePathname();

  return (
    <>
      {/* Navbar */}
      <div className="relative 2xl:w-full xl:w-175 lg:w-190 md:w-150 w-76 flex justify-center">
        <div className="flex items-center justify-between 2xl:w-5/12 w-full rounded-full bg-black 2xl:px-10 px-6 md:py-2 py-3 mt-10">
          <h1 className="font-bold text-[#FC530A] text-lg">ALI BADR.</h1>

          <div className="flex items-center gap-4">
            <ListNotch open={open} setOpen={setOpen} />

            <ul className="hidden md:flex gap-10 text-[#C7C7C7]">
              {navItems.map((ele) => (
                <li key={ele.name}>
                  <Link
                    href={ele.href}
                    className={`transition-colors duration-300 ${
                      pathname === ele.href ? "text-[#FC530A]" : ""
                    }`}
                  >
                    {ele.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay + Menu */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* dark overlay */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-500
          ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />

        {/* menu */}
        <div
          className={`relative h-full w-full bg-black/90 flex items-center justify-center
          transition-all duration-500 ease-out
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          <ul className="flex flex-col gap-10 text-2xl text-white">
            {navItems.map((ele) => (
              <li key={ele.name}>
                <Link
                  href={ele.href}
                  onClick={() => setOpen(false)}
                  className={`transition-colors duration-300 ${
                    pathname === ele.href ? "text-[#FC530A]" : ""
                  }`}
                >
                  {ele.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Notch;
