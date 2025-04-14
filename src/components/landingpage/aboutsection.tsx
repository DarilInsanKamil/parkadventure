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
    <div className="grid md:grid-cols-12 grid-cols-6 md:gap-5">
      <div className="col-start-1 md:col-end-7 col-end-7 bg-[url(/whiterafting.png)] bg-cover md:h-[500px] h-[200px] flex items-end rounded-md"></div>
      <div className="md:col-start-7 md:col-end-12 col-start-1 col-end-7">
        {/* <div className="border-l-2 border-orange-500 mb-2 text-orange-500">
          <p className="font-bold text-sm ml-3 tracking-wide">About</p>
        </div> */}
        <h3 className={`${phudu.className} text-5xl font-extrabold`}>
          Park Adventure
        </h3>
        <p className="text-wrap mt-7 text-gray-500">
          PT. Adventure Park Indonesia adalah destinasi rekreasi terpercaya yang
          menghadirkan petualangan berkualitas sejak 2010. Kami berkomitmen
          menjadi tujuan rekreasi keluarga dan perusahaan yang menyajikan
          pengalaman seru dengan fasilitas terbaik dan keamanan terjamin.
          Berlokasi strategis di kawasan Bogor dengan pemandangan alam yang
          memukau, Adventure Park hadir sebagai surga petualangan yang
          menawarkan berbagai aktivitas menantang dan menyenangkan untuk semua
          usia.
        </p>

        <div className="flex mt-5">
          <div className="w-full">
            <div className="border-l-2 border-orange-500 px-3 mt-3 flex gap-2 items-center ">
              <CannonBallIcon />
              <p>Paintball</p>
            </div>
            <div className="border-l-2 border-orange-500 px-3 mt-3 flex gap-2 items-center ">
              <RaftingIcon />
              <p>Rafting</p>
            </div>
          </div>
          <div className="w-full">
            <div className="border-l-2 border-orange-500 px-3 mt-3 flex gap-2 items-center ">
              <CampIcon />
              <p>Outbond</p>
            </div>
            <div className="border-l-2 border-orange-500 px-3 mt-3 flex gap-2 items-center ">
              <OffroadIcon />
              <p>Offroad</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex gap-5 md:items-center md:flex-row flex-col">
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
        {/* <Button className="mt-15">
          <PhoneCall />
          Contact
        </Button> */}
      </div>
    </div>
  );
};

export default AboutSection;
