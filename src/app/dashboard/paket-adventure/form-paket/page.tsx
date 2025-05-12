import { FormPaket } from "@/components/formui/form-paket";
import React from "react";
import { getNamaGame } from "../../_action";

const Page = async () => {
  const data = await getNamaGame();
  return (
    <section className="p-5">
      <FormPaket namaGame={data} />
    </section>
  );
};

export default Page;
