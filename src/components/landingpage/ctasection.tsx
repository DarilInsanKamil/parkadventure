import { phudu } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <div className="bg-[url('/CTA.png')] bg-cover h-[350px] w-full backdrop-blur-xl text-white">
      <div className="flex items-center justify-center flex-col h-full p-2">
        <h1 className={`${phudu.className} text-5xl font-extrabold md:w-[600px] w-fit text-center mb-10`}>Discover your next adventure in Batok Rafting</h1>
        <Link href="/paket-adventure">
        <Button>Reservation Now</Button>
        </Link>
      </div>
    </div>
  );
}
