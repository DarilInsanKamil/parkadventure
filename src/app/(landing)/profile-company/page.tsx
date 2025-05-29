export const dynamic = "force-dynamic";

import { MapSection } from "@/components/landingpage/mapsectio";
import { contact, inter, phudu } from "@/lib/utils";
import { Activity, Instagram, Mail, Music2, PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/games`);
  const data = await res.json();
  return (
    <section className="">
      <div className="bg-[url('/about.png')] w-full h-[300px] bg-no-repeat bg-cover flex justify-center items-center flex-col">
        <img src="/logo.png" className="object-cover" />
        <p
          className={`${phudu.className} text-5xl font-bold tracking-tight text-white`}
        >
          CV. Batok Rafting
        </p>
      </div>
      <div className="md:px-10 md:mt-20 px-5 mt-10">
        <div>
          <p
            className={`${phudu.className} font-extrabold text-3xl md:text-5xl md:text-left `}
          >
            WHO WE ARE?
          </p>
          <p className="mt-5">
            Didirikan pada tahun 2014, Batok Rafting hadir sebagai penyedia
            layanan wisata petualangan di kawasan Caringin, Bogor.Kami
            menawarkan pengalaman seru dan menantang melalui kegiatan arung
            jeram (rafting) dll serta kegiatan gathering, outing, raker atau
            acara besar lainnya. Beragam paket one day trip, two day trip &
            halfday trip yang dirancang untuk semua kalangan - mulai dari pemula
            hingga pecinta adrenalin sejati. Lokasi Strategis, Alam yang Asri
            Berlokasi di Jl. Muara Jaya, Kecamatan Caringin, Kabupaten Bogor,
            area kami dikelilingi oleh keindahan alam pegunungan yang masih
            asri, menjadikan setiap petualangan semakin berkesan.
          </p>
        </div>
        <div className="md:mt-20 mt-10">
          <p
            className={`${phudu.className} font-extrabold text-3xl md:text-5xl md:text-left `}
          >
            OUR COMITMENT?
          </p>
          <p className="mt-5">
            Kami berkomitmen untuk memberikan pengalaman kegiatan wisata yang aman, menyenangkan dan berkesan. Didukung oleh tim profesional dan fasilitas lengkap, Batok Rafting siap menjadi destinasi pilihan untuk wisata alam Anda.
          </p>
        </div>
        <div className="flex md:flex-row flex-col gap-5 md:mt-20 mt-10">
          <div className="md:w-[500px]">
            <p
              className={`${phudu.className} font-extrabold text-3xl md:text-5xl md:text-left `}
            >
              WHY CHOOSE US?
            </p>
            <p className="mt-5 md:w-[400px]">
              Bergabunglah dengan komunitas petualang yang telah merasakan
              keseruan tak terlupakan bersama kami.
            </p>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full">
            <div className="relative p-10 w-full rounded-md flex justify-center items-center h-[200px]">
              <div>
                <img
                  src="/dot.png"
                  alt="dot"
                  className="absolute top-0 left-0 w-[150px]"
                />
                <p
                  className={`${phudu.className} text-5xl font-bold tracking-tight`}
                >
                  90%
                </p>
                <p
                  className={`${inter.className} dark:text-orange-50 w-[240px] text-gray-700 text-base leading-[110%] font-medium mt-5`}
                >
                  Pengunjung Kembali untuk Petualangan Lain
                </p>
                <img
                  src="/dot.png"
                  alt="dot"
                  className="absolute bottom-0 right-0 w-[150px] rotate-180"
                />
              </div>
            </div>
            <div className="relative p-10 w-full rounded-md flex justify-center items-center h-[200px] ">
              <div>
                <img
                  src="/dot.png"
                  alt="dot"
                  className="absolute top-0 right-0 w-[150px] rotate-y-180"
                />
                <p
                  className={`${phudu.className} text-5xl font-bold tracking-tight`}
                >
                  21K
                </p>
                <p
                  className={`${inter.className} dark:text-orange-50 w-[240px] text-gray-700 text-base leading-[110%] font-medium mt-5`}
                >
                  Total Pengunjung Batok Rafting
                </p>
                <img
                  src="/dot.png"
                  alt="dot"
                  className="absolute bottom-0 left-0 w-[150px] rotate-x-180"
                />
              </div>
            </div>
            <div className="relative p-10 w-full rounded-md flex justify-center items-center  h-[200px] ">
              <div>
                <img
                  src="/dot.png"
                  alt="dot"
                  className="absolute bottom-0 left-0 w-[150px] rotate-x-180"
                />
                <p
                  className={`${phudu.className} text-5xl font-bold tracking-tight`}
                >
                  5+
                </p>
                <p
                  className={`${inter.className} dark:text-orange-50 w-[240px] text-gray-700 text-base leading-[110%] font-medium mt-5`}
                >
                  Pengalaman dalam menjalankan usaha
                </p>
                <img
                  src="/dot.png"
                  alt="dot"
                  className="absolute top-0 right-0 w-[150px] rotate-y-180"
                />
              </div>
            </div>
            <div className="relative p-10 w-full rounded-md flex justify-center items-center  h-[200px]">
              <div>
                <img
                  src="/dot.png"
                  alt="dot"
                  className="absolute top-0 left-0 w-[150px]"
                />
                <p
                  className={`${phudu.className} text-5xl font-bold tracking-tight`}
                >
                  10+
                </p>
                <p
                  className={`${inter.className} dark:text-orange-50 w-[240px] text-gray-700 text-base leading-[110%] font-medium mt-5`}
                >
                  Banyak pilihan wahana dan Paket adventure
                </p>
                <img
                  src="/dot.png"
                  alt="dot"
                  className="absolute bottom-0 right-0 w-[150px] rotate-180"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:px-10 md:mt-20 px-5 mt-10">
        <div className="flex md:flex-row flex-col md:justify-between md:items-end">
          <p
            className={`${phudu.className} font-extrabold text-3xl md:text-5xl md:text-left md:w-[500px]`}
          >
            Petualangan Seru yang Kami Sediakan
          </p>
          <p className="md:w-[500px] mt-5 md:mt-0">
            kami menyediakan rangkaian lengkap aktivitas dan fasilitas untuk
            memastikan pengalaman petualangan Anda berjalan lancar dan berkesan.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 grid-cols-1 gap-5">
          {data.map((res: any, idx: number) => (
            <Link
              href={`/games/${res.id_game}/paket-adventure`}
              key={idx}
              className="dark:bg-[#0a1f0c] bg-orange-200 w-full p-5 rounded-md transition-all"
            >
              <Activity className="mb-2 w-[24px] h-[24px] text-orange-400 dark:text-orange-200" />
              <p className="dark:text-orange-50 font-semibold">
                {res.nama_game}
              </p>
              <p className="dark:text-gray-400 text-gray-600 mt-3 line-clamp-3">
                {res.deskripsi_game}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full md:px-10 md:mt-20 px-5 mt-10">
        <div className="flex md:flex-row flex-col md:justify-between md:items-end">
          <p
            className={`${phudu.className} font-extrabold text-3xl md:text-5xl md:text-left md:w-[500px]`}
          >
            Contact
          </p>
        </div>
        <div className=" gap-5 mt-10">
          <ul className="flex justify-between w-full gap-5 flex-col md:flex-row">
            <Link className="p-3 dark:bg-[#0a1f0c] w-full rounded-md" target="_blank" href="mailto:cvbatokrafting@gmail.com">
              <li className="flex gap-5">
                <Mail />
                Email
              </li>
            </Link>
            <Link className="p-3 dark:bg-[#0a1f0c] w-full rounded-md" target="_blank" href="https://wa.me/6287770219001">
              <li className="flex gap-5">
                <PhoneCall />
                Whatsapp
              </li>
            </Link>
            <Link className="p-3 dark:bg-[#0a1f0c] w-full rounded-md" target="_blank" href="https://instagram.com/batokrafting">
              <li className="flex gap-5">
                <Instagram />
                Instagram
              </li>
            </Link>
            <Link className="p-3 dark:bg-[#0a1f0c] w-full rounded-md" target="_blank" href="https://tiktok.com/@atv.trackbogor">
              <li className="flex gap-5">
                <Music2 />
                Tiktok
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="w-full my-20 md:px-10 px-5">
        <MapSection />
      </div>
    </section>
  );
};

export default Page;
