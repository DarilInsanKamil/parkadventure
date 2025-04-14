import { phudu } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <div className="bg-[url(/background.png)] md:w-[1360px] md:h-[700px] h-[500px] bg-center bg-no-repeat bg-cover w-full rounded-xl flex items-end text-white ">
      <div className="flex justify-between bg-linear-to-b from-white-0 to-gray-900 md:px-16 md:py-6 p-5 rounded-xl md:flex-row lg:flex-row flex-col">
        <h1
          className={`md:text-6xl text-3xl font-extrabold tracking-tight md:leading-[52px] ${phudu.className}`}
        >
          CHALLANGE YOURSELF WITH WATER ADVENTURE
        </h1>
        <div className="md:mt-0 mt-5">
          <Button>Reservation Now</Button>
          <p className="mt-2 text-gray-400">
            AdvenPark berpengalaman lebih dari 10 tahun melayani berbagai jenis
            event. Team berpengalaman selalu siap sedia untuk memberikan
            pelayanan terbaik.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
