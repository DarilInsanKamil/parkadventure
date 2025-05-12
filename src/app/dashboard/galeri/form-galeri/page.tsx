import { FormGaleri } from "@/components/formui/form-galeri";
import React from "react";
import { getNamaGame } from "../../_action";

const Page = async () => {
  const data = await getNamaGame();

  return (
    <section className="p-5">
      <FormGaleri namaGame={data} />
    </section>
  );
};

export default Page;
