import Link from "next/link";

export function NavigationBar() {
  return (
    <div className="flex justify-between items-center p-4 ">
      <div className="flex gap-2 items-center font-bold">
        <img
          src="/vercel.svg"
          alt="company-profile"
          className="w-[32px] h-[32px]"
        />
        <p>Park Adventure</p>
      </div>
      <ul className="flex gap-5 items-center">
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
      </ul>
    </div>
  );
}
