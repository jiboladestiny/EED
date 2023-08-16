"use client"
import Image from "next/image";
import Link from "next/link";
// import menu from "../asset/icon//hamburger.svg";
// import menucancel from "../asset/icon/icons8-cancel.svg";
import { usePathname } from "next/navigation";


const Navbar = () => {
    const avatar = false
    const pathname = usePathname()

    if (pathname === "/register" || pathname === "/login") {
      return 
    }
  return (
    <div className="navbar bg-gray-700 border-slate-400 px-[1rem] lg:px-[10rem] sm:px-[7rem]">
      <div className="flex-1">
        <Link href="/" className="btn font-bold normal-case text-[30px]">EED</Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            {avatar ? (
              <div className="w-10 rounded-full">
                <Image
                  alt="avatar image"
                  width={20}
                  height={20}
                  src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="bg-base-100 text-neutral rounded-full w-12">
                  <span>AJ</span>
                </div>
              </div>
            )}
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            
            <li>
              <Link href="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
