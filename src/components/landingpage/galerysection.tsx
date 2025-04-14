import { phudu } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export function GalerySection({ data }: any) {
  return (
    <div className="flex flex-wrap justify-center">
      <div className=" bg-orange-500 w-[300px] h-[340px] flex items-center text-center relative">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r dark:from-white from-black to-transparent rounded-md"></div>
        <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b dark:from-white from-black to-transparent rounded-md"></div>
        <p className={`${phudu.className} text-5xl font-extrabold text-white`}>
          Gallery Activity
        </p>
      </div>
      {data.map((res: any, idx: number) => {
        return (
          <div key={idx}>
            <img
              className=" bg-blue-400 w-[300px] h-[340px]"
              src={res.image}
              alt={res.id}
            />
          </div>
        );
      })}
      <div className=" bg-orange-500 w-[300px] md:h-[340px] h-[120px] flex items-center justify-center relative">
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l dark:from-white from-black to-transparent rounded-md"></div>
        <div className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-t dark:from-white from-black to-transparent rounded-md"></div>
        <Link
          href="/galeri"
          className={`${phudu.className} text-5xl font-extrabold underline text-white`}
        >
          See More
        </Link>
      </div>
    </div>
  );
}
