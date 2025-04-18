import React from "react";
import { BoxPacket } from "../ui/box_packet";
import { phudu } from "@/lib/utils";
import { dataDummy } from "@/lib/dummy";
const PacketSection = () => {
  return (
    <div>
      <section>
        <div className="flex flex-col items-center">
          <h3
            className={`text-5xl font-extrabold tracking-tight leading-[28px] ${phudu.className}`}
          >
            Packet Activity
          </h3>
          <p className="md:w-[400px] mt-4 leading-[20px] text-center text-gray-500">
            Advenpark offers a variety of adventure activities starting from
            rafting, paintball, flying fox.
          </p>
        </div>
        <ul className=" flex gap-3 text-sm items-center mt-10 flex-wrap ">
          <li className="bg-white text-gray-900 px-4 py-1 rounded-full text-sm">
            Rafting
          </li>
          <li className="border dark:border-white border-black px-4 py-1 rounded-full">
            Paintball
          </li>
          <li className="border dark:border-white border-black px-4 py-1 rounded-full">
            Flying Fox
          </li>
          <li className="border dark:border-white border-black px-4 py-1 rounded-full">
            Paintball
          </li>
          <li className="border dark:border-white border-black px-4 py-1 rounded-full">
            Flying Fox
          </li>
        </ul>
      </section>
      <div className="mt-10 flex justify-center">
        <BoxPacket data={dataDummy} />
      </div>
    </div>
  );
};

export default PacketSection;
