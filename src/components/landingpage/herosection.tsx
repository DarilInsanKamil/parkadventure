import { phudu } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <div className="bg-[url(/background.png)] md:h-[700px] h-[500px] bg-center bg-no-repeat bg-cover w-full rounded-xl flex items-end text-white relative">
      <div className="flex justify-between md:px-16 md:py-6 p-5 rounded-xl md:flex-row lg:flex-row flex-col bg-gradient-to-b from-transparent to-black/70">
        <h1
          className={`md:text-6xl text-3xl font-extrabold tracking-tight md:leading-[52px] ${phudu.className}`}
        >
          CHALLANGE YOURSELF WITH WATER ADVENTURE
        </h1>
        <div className="md:mt-0 mt-5 md:w-[800px]">
          <Button>Reservation Now</Button>
          <p className="mt-2 line-clamp-2">
            Batok Rafting hadir sebagai penyedia
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
    </div>
  );
};

export default HeroSection;
