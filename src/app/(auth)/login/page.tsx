import { Button } from "@/components/ui/button";
import { phudu } from "@/lib/utils";
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
      <div className="md:col-start-6 md:col-end-13 col-start-1 col-end-7 bg-stone-700 flex items-center justify-center flex-col p-5">
        <h4
          className={`${phudu.className} text-3xl font-extrabold tracking-tighter`}
        >
          PARK ADVENTURE
        </h4>
        <form className="mt-5 flex flex-col gap-4 md:w-[50%] w-full">
          <input
            type="email"
            placeholder="masukan email"
            className="border-2 p-2 rounded-md w-full"
          />
          <input
            type="password"
            placeholder="password"
            className="border-2 p-2 rounded-md w-full"
          />
          <Button>Login</Button>
        </form>
      </div>
    </section>
  );
};

export default Page;
