import { phudu } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex justify-center flex-col items-center">
      <h2 className={`${phudu.className} text-5xl font-extrabold`}>
        404 | Not Found
      </h2>
      <div className="mt-3 flex justify-center flex-col items-center">
        <p className="text-gray-500 mb-3">Could not find requested resource</p>
        <Link href="/">
          <div className="border rounded-full px-4 py-2 flex gap-2 items-center w-fit hover:bg-gray-100">
            <ArrowLeft />
            Return Home
          </div>
        </Link>
      </div>
    </div>
  );
}
