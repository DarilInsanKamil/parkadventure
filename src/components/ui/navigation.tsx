"use clietn";
import Link from "next/link";
import { ModeToggle } from "./toggle-theme";
import { Button } from "./button";
import { Menu } from "lucide-react";
import { BtnNavigation } from "./btn-navigator";

export function NavigationBar() {
  return (
    <div className="flex justify-between items-center md:px-10 px-5 py-5 sticky top-0 dark:bg-black bg-white light:text-black z-[98]">
      <div className="flex gap-2 items-center font-bold ">
        <img
          src="/vercel.svg"
          alt="company-profile"
          className="w-[32px] h-[32px]"
        />
        <p>Park Adventure</p>
      </div>
      <ul className="md:flex lg:flex hidden gap-8 items-center">
        <li>
          <Link href="/">Beranda</Link>
        </li>
        <li>
          <Link href="/profile-company">Profile</Link>
        </li>
        <li>
          <Link href="/paket-adventure">Paket Adventure</Link>
        </li>
        <li>
          <Link href="/galeri">Galeri</Link>
        </li>
        <li>
          <Link href="/artikel">Artikel</Link>
        </li>
        <li>
          <Link href="/kontak">Kontak</Link>
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
