"use client";
import { inter, phudu } from "@/lib/utils";
import { CalendarCheck2, HourglassIcon } from "lucide-react";
import React from "react";
import { CampIcon, CannonBallIcon, OffroadIcon, RaftingIcon } from "../ui/icon";

const AboutSection = () => {
  return (
    <div className="">
      <div className="grid md:grid-cols-12 grid-cols-6 gap-10">
        <div
          className={`md:col-end-6 col-start-1 col-end-7 ${phudu.className} font-extrabold text-3xl md:text-5xl md:text-left `}
        >
          <h1>ABOUT</h1>
          <span>Batok Rafting</span>
        </div>
        <div className="md:col-end-13 md:col-start-6 col-start-1 col-end-7 ">
          <p className="text-gray-400 line-clamp-5">
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
      </div>
      {/* <img
        src="/about.png"
        alt="dot"
        className="w-full md:h-[400px] h-[200px]  object-cover mt-5 rounded-md"
      /> */}
      <iframe
        className="w-full md:h-[400px] h-[200px] rounded-md mt-5"
        src="https://www.youtube.com/embed/3S8tnjOFH18?si=qDNISSpsx2IXZ5X6&amp;controls=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="flex md:flex-row flex-col gap-5 mt-10">
        <div className="relative p-5 w-full rounded-md">
          <img
            src="/dot.png"
            alt="dot"
            className="absolute top-0 left-0 w-[100px]"
          />
          <p className="text-4xl font-bold tracking-tight">90%</p>
          <p
            className={`${inter.className} dark:text-orange-50 w-[240px] text-gray-700 text-base leading-[110%] font-medium mt-5`}
          >
            Pengunjung Kembali untuk Petualangan Lain
          </p>
          <img
            src="/dot.png"
            alt="dot"
            className="absolute bottom-0 right-0 w-[100px] rotate-180"
          />
        </div>
        <div className="relative p-5 w-full rounded-md ">
          <img
            src="/dot.png"
            alt="dot"
            className="absolute top-0 right-0 w-[100px] rotate-y-180"
          />
          <p className="text-4xl font-bold tracking-tight">21K</p>
          <p
            className={`${inter.className} dark:text-orange-50 w-[240px] text-gray-700 text-base leading-[110%] font-medium mt-5`}
          >
            Total Pengunjung Batok Rafting
          </p>
          <img
            src="/dot.png"
            alt="dot"
            className="absolute bottom-0 left-0 w-[100px] rotate-x-180"
          />
        </div>
        <div className="relative p-5 w-full rounded-md ">
          <img
            src="/dot.png"
            alt="dot"
            className="absolute top-0 left-0 w-[100px]"
          />
          <p className="text-4xl font-bold tracking-tight">5+</p>
          <p
            className={`${inter.className} dark:text-orange-50 w-[240px] text-gray-700 text-base leading-[110%] font-medium mt-5`}
          >
            Pengalaman dalam menjalankan usaha
          </p>
          <img
            src="/dot.png"
            alt="dot"
            className="absolute bottom-0 right-0 w-[100px] rotate-180"
          />
        </div>
        <div className="relative p-5 w-full rounded-md">
          <img
            src="/dot.png"
            alt="dot"
            className="absolute top-0 right-0 w-[100px] rotate-y-180"
          />
          <p className="text-4xl font-bold tracking-tight">10+</p>
          <p
            className={`${inter.className} dark:text-orange-50 w-[240px] text-gray-700 text-base leading-[110%] font-medium mt-5`}
          >
            Banyak pilihan wahana dan Paket adventure
          </p>
          <img
            src="/dot.png"
            alt="dot"
            className="absolute bottom-0 left-0 w-[100px] rotate-x-180"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
