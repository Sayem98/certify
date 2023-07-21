import React, { useState } from "react";
import {ConnectKitButton} from "connectkit";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import Logo from "../../assets/default.png";


function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="border-b border-gray-700 w-screen min-h-[70px]  z-50">
      {/* Desktop Menu */}
      <div className="bg-transparent flex justify-between items-center px-8 md:px-16 py-3">
        <div className="flex items-center gap-20">
          <img
            src={Logo}
            className="object-contain w-[30px] md:w-[25px] scale-[3]"
            alt="Logo"
          />
          <ul className="hidden lg:flex items-center gap-6 font-semibold mt-4">
            <Link to="/">
              <li className="self-baseline border-b-2 border-transparent transition hover:border-b-2 hover:border-green-500 cursor-pointer">
                Home
              </li>
            </Link>

            <Link to="/certify">
              <li className="self-baseline border-b-2 border-transparent transition hover:border-b-2 hover:border-green-500 cursor-pointer">
                Certify
              </li>
            </Link>

            <Link to="/">
              <li className="self-baseline border-b-2 border-transparent transition hover:border-b-2 hover:border-green-500 cursor-pointer">
                Verify
              </li>
            </Link>

            <Link to="/">
              <li className="self-baseline border-b-2 border-transparent transition hover:border-b-2 hover:border-green-500 cursor-pointer">
                Contact
              </li>
            </Link>
          </ul>
        </div>
        <div className="hidden lg:flex gap-6 items-center">
          <ConnectKitButton theme="web95" />
        </div>
        {mobileMenu ? (
          <MdCancel
            size={30}
            className="lg:hidden cursor-pointer"
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <AiOutlineMenu
            size={30}
            className="lg:hidden cursor-pointer"
            onClick={() => setMobileMenu(true)}
          />
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-gray-800 mt-10 px-8 md:px-16 py-3">
          <div className="flex flex-col gap-10">
            <ul className="flex flex-col gap-4 font-semibold">
              <Link to="/">
                <li className="self-baseline border-b-2 border-transparent transition hover:border-b-2 hover:border-green-500 cursor-pointer">
                  Home
                </li>
              </Link>

              <Link to="/certify">
                <li className="self-baseline border-b-2 border-transparent transition hover:border-b-2 hover:border-green-500 cursor-pointer">
                  Certify
                </li>
              </Link>

              <Link to="/">
                <li className="self-baseline border-b-2 border-transparent transition hover:border-b-2 hover:border-green-500 cursor-pointer">
                  Verify
                </li>
              </Link>

              <Link to="/">
                <li className="self-baseline border-b-2 border-transparent transition hover:border-b-2 hover:border-green-500 cursor-pointer">
                  Contact
                </li>
              </Link>
            </ul>
          </div>
          <div className="flex gap-4 items-center mt-4 mb-2">
            <ConnectKitButton theme="web95"/>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;