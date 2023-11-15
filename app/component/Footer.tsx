"use client"
import { usePathname } from "next/navigation";


const Footer = () => {

    const pathname = usePathname()

    if (pathname === "/register" || pathname === "/login") {
        return
    }
    return (
        <footer
            className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left mt-[8rem]">
            <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
                © 2023 Copyright:
                <a
                    className="text-neutral-800 dark:text-neutral-400"
                    href=""
                >EED</a>
            </div>
        </footer>
    );
};

export default Footer;
