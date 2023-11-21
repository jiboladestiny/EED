"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Data } from "../context/DataProvider";



const Navbar = () => {
  const avatar = false
  const pathname = usePathname()
  const router = useRouter()
  const { data } = Data()
  const getInitials = (name: string | undefined) => {
    if (!name) return "";

    const words = name.split(" ");
    const initials = words.map((word) => word[0]).join("");

    return initials;
  };

  // Usage:
  const initials = getInitials(data?.name);


  if (pathname === "/register" || pathname === "/login") {
    return
  }

  const logout = async () => {
    try {
      await axios.get("api/logout")

      toast.success("Logged out succesfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.response)
      // toast.error(error.response.data.message);
    }

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
                    <span>{initials}</span>
                </div>
              </div>
            )}
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/profile"> Profile</Link>
            </li>
          
            {data?.isAdmin == "1" && <li> <Link href="/user">User dashboard</Link>      </li>}
            {data?.isAdmin == "3" && <li><Link href="/admin">Admin dashboard</Link>      </li>}
            {data?.isAdmin == "2" && <li> <Link href="/instructor">Instructor dashboard</Link>      </li>}
             
      

            <li onClick={logout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
