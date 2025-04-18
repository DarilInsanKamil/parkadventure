import { phudu } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <div className="bg-[url(/background.png)]  md:h-[700px] h-[500px] bg-center bg-no-repeat bg-cover w-full rounded-xl flex items-end text-white relative">
      <div className="backdrop-blur-md mask-t-from-0.5 absolute w-full h-[200px] z-0 bg-gradient-to-b from-transparent to-black/20 rounded-bl-xl rounded-br-xl"></div>
      <div className="flex justify-between  md:px-16 md:py-6 p-5 rounded-xl md:flex-row lg:flex-row flex-col z-2">
        <h1
          className={`md:text-6xl text-3xl font-extrabold tracking-tight md:leading-[52px] ${phudu.className}`}
        >
          CHALLANGE YOURSELF WITH WATER ADVENTURE
        </h1>
        <div className="md:mt-0 mt-5">
          <Button>Reservation Now</Button>
          <p className="mt-2">
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
