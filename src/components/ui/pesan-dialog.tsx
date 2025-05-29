"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { Button } from "./button";
import { Calendar, MinusCircle, PlusCircle, User2 } from "lucide-react";
import { Input } from "./input";
import Link from "next/link";

export function PesanDialog({ nama }: { nama: string }) {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Reservasi Sekarang
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reservasi</DialogTitle>
        </DialogHeader>
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
          <Button size="icon" variant="outline" onClick={decrement}>
            <MinusCircle />
          </Button>
          <p>{counter}</p>
          <Button size="icon" variant="outline" onClick={increment}>
            <PlusCircle />
          </Button>
        </div>

        <DialogFooter>
          <Link href={linkWa(nama, date, counter)} target="_blank">
            <Button className="w-full mt-5">Pesan</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
