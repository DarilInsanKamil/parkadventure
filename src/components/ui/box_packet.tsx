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
import { CircleCheck } from "lucide-react";
import { formatRupiah } from "@/lib/convertPrice";
import Link from "next/link";

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

export function BoxPacket({ data }: { data: PacketData[] }) {
  // Function to handle image loading errors
  const handleImageError = (
    event: React.SyntheticEvent<HTMLDivElement, Event>,
    imagePath: string
  ) => {
    const element = event.currentTarget;

    // Try different paths to find the image
    try {
      // Extract filename from path
      const parts = imagePath.split("/");
      const filename = parts[parts.length - 1];

      if (filename) {
        // Try using the packages API endpoint first
        const packagesPath = `/api/images/packages/${filename}`;
        console.log("Trying packages path:", packagesPath);
        element.style.backgroundImage = `url(${packagesPath})`;

        // Add a fallback if the first attempt fails
        const img = new Image();
        img.onerror = () => {
          // If packages path fails, try gallery as a last resort
          const galleryPath = `/api/images/gallery/${filename}`;
          console.log("Packages path failed, trying gallery:", galleryPath);
          element.style.backgroundImage = `url(${galleryPath})`;

          // Final fallback
          const finalImg = new Image();
          finalImg.onerror = () => {
            console.log("All paths failed, using placeholder");
            element.style.backgroundImage = "url(/placeholder.jpg)";
          };
          finalImg.src = galleryPath;
        };
        img.src = packagesPath;
        return;
      }

      // If all else fails, use placeholder
      element.style.backgroundImage = "url(/placeholder.jpg)";
    } catch (error) {
      console.error("Error handling image:", error);
      element.style.backgroundImage = "url(/placeholder.jpg)";
    }
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full md:max-w-[95%] max-w-sm"
    >
      <CarouselContent>
        {data?.map((res: PacketData, idx: number) => {
          // Get image path and ensure it starts with a slash
          const imagePath = res.image.startsWith("/")
            ? res.image
            : `/${res.image}`;
          // Format background image path
          const bgImageStyle = {
            backgroundImage: `url(${imagePath})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          };

          return (
            <CarouselItem key={idx} className="md:basis-1/2">
              <div className="dark:bg-orange-950 bg-orange-100 flex md:h-[400px] rounded-md dark:text-white text-orange-950 md:flex-row flex-col">
                <div
                  style={bgImageStyle}
                  className="relative bg-bottom md:w-[300px] md:h-full h-[150px] flex items-end rounded-bl-xl rounded-tl-xl bg-gradient-to-b from-transparent to-black/70"
                  onError={(e) => handleImageError(e, imagePath)}
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
                  <p className="mt-5 w-[300px] line-clamp-3 dark:text-gray-400 text-gray-600">
                    {res.deskripsi}
                  </p>

                  <ul className="mt-5 font-medium">
                    {res?.list.slice(0, 3).map((item: any, idx: number) => {
                      return (
                        <li key={idx} className="flex gap-2">
                          <CircleCheck className="w-4" />
                          {item.nama}
                        </li>
                      );
                    })}
                    <Link href={`/paket-adventure/${res.id}/detail`}>
                      <p className="mt-2 text-sm text-gray-500 font-normal">
                        Lihat Selengkapnya...
                      </p>
                    </Link>
                  </ul>
                  <Link href={`/paket-adventure/${res.id}/detail`}>
                    <Button className="mt-15">Reservation Now</Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div></div>
      <CarouselPrevious className="md:flex hidden" />
      <CarouselNext className="md:flex hidden" />
    </Carousel>
  );
}
