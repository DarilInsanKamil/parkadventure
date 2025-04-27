import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { inter, phudu } from "@/lib/utils";
import { Button } from "./button";
import { formatRupiah } from "@/lib/convertPrice";
import { CircleCheck } from "lucide-react";

interface ListItem {
  id: number;
  nama: string;
}

interface PacketData {
  id: number;
  image: string;
  price: number;
  nama: string;
  deskripsi: string;
  list: ListItem[];
}


export function BoxPacket({ data }: {data: PacketData[]}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full md:max-w-[95%] max-w-sm"
    >
      <CarouselContent>
        {data?.map((res: PacketData, idx: number) => {
          return (
            <CarouselItem key={idx} className="md:basis-1/2">
              <div className="bg-stone-800 flex md:h-[400px] rounded-md text-white md:flex-row flex-col">
                <div
                  className={`relative bg-[url(/whiterafting.png)] bg-bottom md:w-[300px] md:h-full h-[150px] flex items-end rounded-bl-xl rounded-tl-xl bg-gradient-to-b from-transparent to-black/70`}
                >
                  <div className="text-white p-4 w-full z-1">
                    <p
                      className={`${phudu.className} text-4xl font-extrabold tracking-tighter `}
                    >
                      {res.nama}
                    </p>
                  </div>
                </div>
                <div className="md:p-5 p-3">
                  <p className={`${phudu.className} text-3xl font-extrabold`}>
                    {formatRupiah(res.price)}

                    <span className={`${inter.className} text-xl`}>/pax</span>
                  </p>
                  <p className="mt-5 w-[300px] line-clamp-3 text-gray-400">
                    {res.deskripsi}
                  </p>
                  <ul className="mt-5 font-medium">
                    {res?.list.map((item: any, idx: number) => {
                      return (
                        <li key={idx} className="flex gap-2">
                          <CircleCheck className="w-4" />
                          {item.nama}
                        </li>
                      );
                    })}
                  </ul>
                  <Button className="mt-15">Reservation Now</Button>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div></div>
      <CarouselPrevious className="md:flex hidden" />
      <CarouselNext className="md:flex hidden"/>
    </Carousel>
  );
}
