import { phudu } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-orange-500 mt-20 md:p-10 p-5 grid md:grid-cols-12 grid-cols-6 gap-4">
      <div className="col-start-1 col-end-7 ">
        <h1 className={`${phudu.className} text-4xl font-extrabold`}>Park Adventure</h1>
        <h4>
        Jl. Raya Hankam RT. 03 RW 008, RT.002/RW.018, Jatirahayu, West Java 17414
        </h4>
        <ul>
          <li>Whatsapp: 0812121398</li>
          <li>Email: parkadventure@mail.com</li>
        </ul>
      </div>
      <div className="md:col-start-7 md:col-end-9 col-start-1 col-end-7">
        <h4 className="text-lg font-semibold">Social Media</h4>
        <ul className="mt-1 ">
          <li className="mt-1">Instagram</li>
          <li className="mt-1">Twitter</li>
          <li className="mt-1">Tiktok</li>
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
