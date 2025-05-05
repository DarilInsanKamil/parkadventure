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
        <fieldset aria-label="Choose a paket adventure" className="mt-5">
          <ul className="flex w-full gap-4">
            <li>
              <input
                type="radio"
                id="rafting"
                name="hosting"
                value="rafting"
                className="hidden peer"
              />
              <label
                htmlFor="rafting"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-white border rounded-full cursor-pointer  dark:border-gray-700 dark:peer-checked:text-gray-900 peer-checked:bg-gray-800 dark:peer-checked:bg-white peer-checked:text-white dark:text-gray-400 dark:bg-gray-800 "
              >
                <div className="block">
                  <p>Rafting</p>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="outbond"
                name="hosting"
                value="outbond"
                className="hidden peer"
              />
              <label
                htmlFor="outbond"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-white border rounded-full cursor-pointer  dark:border-gray-700 dark:peer-checked:text-gray-900 peer-checked:bg-gray-800 dark:peer-checked:bg-white peer-checked:text-white dark:text-gray-400 dark:bg-gray-800 "
              >
                <div className="block">
                  <p>Outbond</p>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="flyingfox"
                name="hosting"
                value="flyingfox"
                className="hidden peer"
              />
              <label
                htmlFor="flyingfox"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-white border rounded-full cursor-pointer  dark:border-gray-700 dark:peer-checked:text-gray-900 peer-checked:bg-gray-800 dark:peer-checked:bg-white peer-checked:text-white dark:text-gray-400 dark:bg-gray-800 "
              >
                <div className="block">
                  <p>Flying Fox</p>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="paintball"
                name="hosting"
                value="paintball"
                className="hidden peer"
              />
              <label
                htmlFor="paintball"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-white border rounded-full cursor-pointer  dark:border-gray-700 dark:peer-checked:text-gray-900 peer-checked:bg-gray-800 dark:peer-checked:bg-white peer-checked:text-white dark:text-gray-400 dark:bg-gray-800 "
              >
                <div className="block">
                  <p>Paint Ball</p>
                </div>
              </label>
            </li>
          </ul>
        </fieldset>
      </section>
      <div className="mt-10 flex justify-center">
        <BoxPacket data={dataDummy} />
      </div>
    </div>
  );
};

export default PacketSection;
