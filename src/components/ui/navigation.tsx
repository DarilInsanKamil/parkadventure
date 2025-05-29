"use client";
import Link from "next/link";
import { ModeToggle } from "./toggle-theme";
import { BtnNavigation } from "./btn-navigator";
import { usePathname } from "next/navigation";
import { phudu } from "@/lib/utils";

export function NavigationBar() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center md:px-10 px-5 py-5 sticky top-0 dark:bg-dark bg-[#f8f5f0] dark:bg-[#0a1f0c] light:text-black z-[98] border-b">
      <Link href="/">
        <div className="flex gap-2 items-center font-bold ">
          <img
            src="/logo.png"
            alt="company-profile"
            className="w-[32px] h-[32px]"
          />
          <p className={`${phudu.className} text-2xl`}>Batok Rafting</p>
        </div>
      </Link>

      <ul className="md:flex lg:flex hidden gap-8 items-center">
        <li>
          <Link
            href="/"
            className={
              pathname === "/"
                ? "underline underline-offset-4 decoration-green-400 decoration-[2px]"
                : ""
            }
          >
            Beranda
          </Link>
        </li>
        <li>
          <Link
            href="/profile-company"
            className={
              pathname === "/profile-company"
                ? "underline underline-offset-4 decoration-green-400 decoration-[2px]"
                : ""
            }
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            href="/paket-adventure"
            className={
              pathname === "/paket-adventure"
                ? "underline underline-offset-4 decoration-green-400 decoration-[2px]"
                : ""
            }
          >
            Paket Adventure
          </Link>
        </li>
        <li>
          <Link
            href="/galeri"
            className={
              pathname === "/galeri"
                ? "underline underline-offset-4 decoration-green-400 decoration-[2px]"
                : ""
            }
          >
            Galeri
          </Link>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
      <div className="md:hidden lg:hidden">
        <BtnNavigation />
      </div>
    </div>
  );
}
