import { phudu } from "@/lib/utils";
import Link from "next/link";
import React from "react";


interface GaleryData {
  id: number,
  image: string
}
export function GalerySection({ data }: {data: GaleryData[]}) {
  return (
    <div className="flex flex-wrap justify-center">
      <div className=" bg-orange-500 md:w-[300px] w-full h-[340px] flex justify-center items-center text-center relative">
        <p className={`${phudu.className} text-5xl font-extrabold text-white`}>
          Gallery Activity
        </p>
      </div>
      {data.map((res: GaleryData, idx: number) => {
        return (
          <div key={idx}>
            <img
              className=" bg-blue-400 md:w-[300px] w-full md:h-[340px] h-full"
              src={res.image}
              alt={res.image}
            />
          </div>
        );
      })}
      <div className=" bg-orange-500 md:w-[300px] w-full md:h-[340px] h-[120px] flex items-center justify-center relative">
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
