import { Button } from "@/components/ui/button";
import { phudu } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <section className="grid grid-cols-6 md:grid-cols-12 h-screen">
      <div className="col-start-1 md:col-end-6 md:flex hidden bg-amber-200 bg-[url('/background.png')]  bg-cover bg-no-repeat bg-center items-end p-5">
        <h1
          className={`${phudu.className} font-extrabold text-5xl tracking-tighter text-center`}
        >
          CHALLANGE YOURSELF WITH WATER ADVENTURE
        </h1>
      </div>
      <div className="md:col-start-6 md:col-end-13 col-start-1 col-end-7 bg-gary-900 flex items-center justify-center flex-col p-5 relative">
        <div className="absolute top-0 left-0 px-5 py-3">
          <h4
            className={`${phudu.className} text-xl font-extrabold tracking-tighter`}
          >
            PARK ADVENTURE
          </h4>
        </div>
        <div className="text-center">
          <h4 className={`${phudu.className} text-2xl font-extrabold`}>
            WELCOME
          </h4>
          <p className="text-gray-400">
            Daftar akun baru untuk memulai petualangan
          </p>
        </div>
        <form className="mt-10 flex flex-col gap-4 md:w-[50%] w-full">
          <div>
            <label htmlFor="nama" className="font-semibold">
              Nama
            </label>
            <input
              type="nama"
              id="nama"
              placeholder="masukan nama"
              className="border-2 p-2 rounded-sm w-full mt-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="masukan email"
              className="border-2 p-2 rounded-sm w-full mt-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              className="border-2 p-2 rounded-sm w-full mt-2"
            />
          </div>
          <Button className="mt-5">Login</Button>
          <div className="flex items-center gap-1 text-sm justify-center">
            <p>Sudah punya akun? </p>
            <Link href="/login" className="text-blue-300">Masuk</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Page;
