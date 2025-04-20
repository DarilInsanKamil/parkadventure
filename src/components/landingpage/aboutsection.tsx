"use client";
import { inter, phudu } from "@/lib/utils";
import {
  CalendarCheck2,
  Hourglass,
  HourglassIcon,
  PartyPopper,
  PhoneCall,
} from "lucide-react";
import React from "react";
import { CampIcon, CannonBallIcon, OffroadIcon, RaftingIcon } from "../ui/icon";
import { Button } from "../ui/button";

const AboutSection = () => {
  return (
    <div className="">
      <div className="grid md:grid-cols-12 grid-cols-6 gap-10">
        <div
          className={`md:col-end-6 col-start-1 col-end-7 ${phudu.className} font-extrabold text-3xl md:text-5xl md:text-left `}
        >
          <h1>ABOUT</h1>
          <span>PARK ADVENTURE</span>
        </div>
        <div className="md:col-end-13 md:col-start-6 col-start-1 col-end-7 ">
          <p className="text-gray-400">
            PT. Adventure Park Indonesia adalah destinasi rekreasi terpercaya
            yang menghadirkan petualangan berkualitas sejak 2010. Kami
            berkomitmen menjadi tujuan rekreasi keluarga dan perusahaan yang
            menyajikan pengalaman seru dengan fasilitas terbaik dan keamanan
            terjamin. Berlokasi strategis di kawasan Bogor dengan pemandangan
            alam yang memukau, Adventure Park hadir sebagai surga petualangan
            yang menawarkan berbagai aktivitas menantang dan menyenangkan untuk
            semua usia.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 grid-cols-6 gap-10 mt-10">
        <div className=" col-start-1 md:col-end-6 col-end-7">
          <p className="mb-2 font-semibold">Kami Menyediakan:</p>
          <div className="flex gap-4 items-center w-full">
            <div className="border-l-2 border-orange-500 px-3 mt-3 flex gap-2 items-center w-full">
              <CannonBallIcon />
              <p>Paintball</p>
            </div>

            <div className="border-l-2 border-orange-500 px-3 mt-3 flex gap-2 items-center w-full ">
              <RaftingIcon />
              <p>Rafting</p>
            </div>
          </div>

          <div className="flex gap-4 items-center w-full mt-5">
            <div className="border-l-2 border-orange-500 px-3 mt-3 flex gap-2 items-center w-full ">
              <CampIcon />
              <p>Outbond</p>
            </div>

            <div className="border-l-2 border-orange-500 px-3 mt-3 flex gap-2 items-center w-full ">
              <OffroadIcon />
              <p>Offroad</p>
            </div>
          </div>

          <div className="flex gap-5 md:items-center flex-col mt-10">
            <div className="dark:bg-gray-800 bg-gray-100 p-3 rounded-md flex gap-2 items-center w-full">
              <div className="dark:bg-amber-700 bg-orange-200 w-fit p-2 rounded-md">
                <CalendarCheck2 />
              </div>
              <div>
                <p className="text-xl font-bold">15+</p>
                <p className="text-md text-gray-500 -mt-1">Paket Acara</p>
              </div>
            </div>
            <div className="dark:bg-gray-800 bg-gray-100 p-3 rounded-md flex gap-2 items-center w-full">
              <div className="dark:bg-amber-700 bg-orange-200 w-fit p-2 rounded-md">
                <HourglassIcon />
              </div>
              <div>
                <p className="text-xl font-bold">5+</p>
                <p className="text-md text-gray-500 -mt-1">Tahun Pengalaman</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-end-13 col-start-6 col-end-6 bg-green-200 rounded-tl-md rounded-bl-md hidden md:block">
          <img
            src="/background.png"
            alt="about"
            className="rounded-tl-md rounded-bl-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
