import {
  CampIcon,
  CannonBallIcon,
  OffroadIcon,
  RaftingIcon,
} from "@/components/ui/icon";
import { phudu } from "@/lib/utils";
import { CalendarCheck2, HourglassIcon } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <section>
      <div className="bg-[url(/background.png)] bg-no-repeat bg-cover bg-center w-full h-[300px] content-none"></div>
      <div className="md:px-40 px-5 mt-10">
        <h1 className={`${phudu.className} text-5xl font-extrabold`}>
          Park Adventure
        </h1>
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
      </div>
    </section>
  );
};

export default Page;
