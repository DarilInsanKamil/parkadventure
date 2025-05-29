import { phudu } from "@/lib/utils";
import { Instagram, Music2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0a1f0c] md:p-10 p-5 grid md:grid-cols-12 grid-cols-6 gap-4 text-white">
      <div className="col-start-1 col-end-7 ">
        <h1 className={`${phudu.className} text-4xl font-extrabold`}>
          CV. Batok Rafting
        </h1>
        <h4>Jl. Muara Jaya, Kecamatan Caringin, Kabupaten Bogor,</h4>
        <ul>
          <li>Whatsapp: 0287770219001</li>
          <li>Email: cvbatokrafting@gmail.com</li>
        </ul>
      </div>
      <div className="md:col-start-7 md:col-end-9 col-start-1 col-end-7">
        <h4 className="text-lg font-semibold">Social Media</h4>
        <ul className="mt-1 ">
          <li className="mt-1">
            <Link
              className="flex gap-5"
              target="_blank"
              href="https://instagram.com/batokrafting"
            >
              Instagram
            </Link>
          </li>
          <li className="mt-1">
            <Link
              className="flex gap-5"
              target="_blank"
              href="https://tiktok.com/@atv.trackbogor"
            >
              Tiktok
            </Link>
          </li>
        </ul>
      </div>
      <div className="md:col-start-9 md:col-end-11 col-start-1 col-end-7">
        <h4 className="text-lg font-semibold">Navigation</h4>
        <ul className="mt-1 ">
          <li className="mt-1">Home</li>
          <li className="mt-1">Packet Activity</li>
          <li className="mt-1">Gallery</li>
          <li className="mt-1">About</li>
        </ul>
      </div>
    </footer>
  );
}
