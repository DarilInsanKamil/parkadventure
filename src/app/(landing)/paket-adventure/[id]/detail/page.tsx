import { Pemesanan } from "@/components/ui/pemesanan";
import { PesanDialog } from "@/components/ui/pesan-dialog";
import { formatRupiah } from "@/lib/convertPrice";
import { inter, phudu } from "@/lib/utils";
import { Check, Timer } from "lucide-react";
import Image from "next/image";

interface Facility {
  id: number;
  name: string;
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/packages/${id}`);
  const data = await res.json();

  return (
    <section className="md:p-10 p-5 grid md:grid-cols-12 grid-cols-6 gap-5 relative w-full">
      <div className="col-start-1 md:col-end-10 col-end-7">
        <div className="flex gap-5 md:flex-row flex-col">
          <div>
            <Image
              src={data.image_src}
              alt={data.name}
              width={1000}
              height={1000}
              className="object-cover rounded-md"
            />
          </div>
          <div>
            <p className={`${phudu.className} font-extrabold text-5xl`}>
              {data.name}
            </p>
            <p className={`${inter.className} text-4xl mt-3 font-semibold`}>
              {formatRupiah(data.price)}
            </p>
            <div className="flex gap-3 my-3">
              <Timer className="w-[20px] h-[20px]" />
              <p>{data.duration}</p>
            </div>
            <p>{data.description}</p>
          </div>
        </div>
        <div className="my-5">
          {data.facilities.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold text-2xl mb-2">Facilities:</p>
              <ul className="space-y-1">
                {data.facilities.map((facility: Facility) => (
                  <li key={facility.id} className="flex items-center gap-2 ">
                    <Check className="h-4 w-4 text-green-500" />
                    {facility.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-2xl mb-2">Terms and Codition: </h2>
          <ul className="list-disc ml-5">
            <li>
              Reservasi baru dianggap sah apabila kami sudah menerima Down
              Payment sebesar 50% Max H-10 sebagai tanda jadi, untuk mengunci
              tanggal yang telah di sepakati kedua belah pihak
            </li>
            <li>
              Sisa dari Total Biaya paling lambat kami terima pada hari
              penyelenggaraan.
            </li>
            <li>
              Jumlah peserta dihitung berdasarkan konfirmasi akhir yang kami
              terima 3 hari sebelum kedatangan.
            </li>
            <li>
              Pengurangan peserta pada saat kedatangan akan diperhitungkan
              sesuai dengan Konfirmasi akhir.
            </li>
            <li>
              Apabila terjadi penambahan peserta pada saat kedatangan akan
              diperhitungkan pada saat itu juga
            </li>
            <li>
              Apabila terjadi pembatalan pada pada pihak pemesan, maka kami
              anggap DPhangus
            </li>
          </ul>
        </div>
      </div>
      <aside className="col-start-1 md:col-start-10 md:col-end-13 col-end-7 hidden md:block">
        <Pemesanan nama={data.name} />
      </aside>
      <div className="w-full rounded-md md:hidden sticky bottom-2 col-start-1 col-end-7 p-2 dark:bg-[#0a1f0c]">
        <PesanDialog nama={data.name} />
      </div>
    </section>
  );
};

export default Page;
