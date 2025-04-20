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
    <section className="">
      <div className="md:p-10 p-5 mt-5">
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
              yang menawarkan berbagai aktivitas menantang dan menyenangkan
              untuk semua usia.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 grid-cols-6 gap-10 mt-10">
          <div className=" col-start-1 md:col-end-5 col-end-7">
            <div className="flex gap-5 md:items-center flex-col">
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
                  <p className="text-md text-gray-500 -mt-1">
                    Tahun Pengalaman
                  </p>
                </div>
              </div>
             
            </div>
          </div>

          <div className="md:col-end-13 col-start-5 col-end-6 bg-green-200 rounded-tl-md rounded-bl-md hidden md:block">
            <img
              src="/background.png"
              alt="about"
              className="rounded-tl-md rounded-bl-md"
            />
          </div>
        </div>
      </div>

      <div className="bg-orange-500 h-screen w-full mt-20"></div>
    </section>
  );
};

export default Page;
