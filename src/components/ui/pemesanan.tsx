"use client";

import { useState } from "react";
import { Button } from "./button";
import { Calendar, MinusCircle, PlusCircle, User2 } from "lucide-react";
import { Input } from "./input";
import Link from "next/link";

export function Pemesanan({ nama }: { nama: string }) {
  const [counter, setCounter] = useState(1);
  const [date, setDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const increment = () => {
    setCounter((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCounter((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
  };

  const linkWa = (nama: string, tanggal: string, jumlah: number) => {
    const nomer = "6287770219001";
    const pesan = `Halo, saya ingin reservasi paket ${nama} ditanggal ${tanggal} untuk ${jumlah} orang`;
    const endcodedPesan = encodeURI(pesan);
    return `https://api.whatsapp.com/send?phone=${nomer}&text=${endcodedPesan}`;
  };

  return (
    <div className="dark:bg-[#0a1f0c] w-full rounded-md p-5">
      <div className="mb-5">
        <div className="flex gap-2 items-center">
          <Calendar className="w-[20px] h-[20px]" />
          <p>Tanggal</p>
        </div>
        <Input
          type="date"
          className="mt-5 w-full"
          value={date} // Bind nilai input ke state 'date'
          onChange={handleDateChange}
        />
      </div>
      <div className="flex gap-2 items-center">
        <User2 className="w-[20px] h-[20px]" />
        <p>Jumlah:</p>
      </div>
      <div className="flex gap-5 items-center mt-5 w-full justify-between">
        <Button size="icon" onClick={decrement}>
          <MinusCircle />
        </Button>
        <p>{counter}</p>
        <Button size="icon" onClick={increment}>
          <PlusCircle />
        </Button>
      </div>
      <Link href={linkWa(nama, date, counter)} target="_blank">
        <Button className="w-full mt-5">Pesan</Button>
      </Link>
    </div>
  );
}
