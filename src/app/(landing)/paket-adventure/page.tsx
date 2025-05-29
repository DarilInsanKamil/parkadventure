export const dynamic = "force-dynamic";

import React from "react";
import Image from "next/image";
import { Clock, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatRupiah } from "@/lib/convertPrice";

// Type definitions
interface Facility {
  id: number;
  name: string;
}

interface Package {
  id_package: number;
  name: string;
  image_src: string;
  description: string;
  price: string;
  duration: string;
  min_participants: number;
  max_participants: number;
  game_name: string;
  facilities: Facility[];
}

const linkWa = (nama: string, price: number) => {
  const nomer = "6287770219001";
  const pesan = `Halo, saya ingin reservasi paket ${nama} dengan harga ${formatRupiah(
    price
  )}`;
  const endcodedPesan = encodeURI(pesan);
  return `https://api.whatsapp.com/send?phone=${nomer}&text=${endcodedPesan}`;
};

const Page = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/packages`);
  const data: Package[] = await res.json();

  // Group packages by game_name
  const groupedPackages = data.reduce((acc, pkg) => {
    if (!acc[pkg.game_name]) {
      acc[pkg.game_name] = [];
    }
    acc[pkg.game_name].push(pkg);
    return acc;
  }, {} as Record<string, Package[]>);
  return (
    <div className="container mx-auto px-4 py-8">
      {Object.entries(groupedPackages).map(([gameName, packages]) => (
        <div key={gameName} className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{gameName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id_package}
                className="dark:bg-[#0a1f0c] rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={pkg.image_src}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <p className=" mb-4 line-clamp-2 text-gray-500">
                    {pkg.description}
                  </p>

                  <div className="flex items-center gap-2  mb-2">
                    <Clock className="h-4 w-4" />
                    <span>{pkg.duration}</span>
                  </div>

                  <div className="flex items-center gap-2  mb-4">
                    <Users className="h-4 w-4" />
                    <span>
                      {pkg.min_participants}Persons
                    </span>
                  </div>

                  {pkg.facilities.length > 0 && (
                    <div className="mb-4">
                      <p className="font-semibold mb-2">Facilities:</p>
                      <ul className="space-y-1">
                        {pkg.facilities.map((facility) => (
                          <li
                            key={facility.id}
                            className="flex items-center gap-2 "
                          >
                            <Check className="h-4 w-4 text-green-500" />
                            {facility.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-primary">
                      Rp {parseInt(pkg.price).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <Link href={`/paket-adventure/${pkg.id_package}/detail`}>
                    <Button className="mt-5 w-full">Detail</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
