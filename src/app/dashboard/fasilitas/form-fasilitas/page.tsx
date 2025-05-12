import { FormFasilitas } from "@/components/formui/form-fasilitas";
import { getNamaPaket } from "../../_action";

const Page = async () => {
  const data = await getNamaPaket();
  return (
    <section className="p-5">
      <FormFasilitas namapaket={data} />
    </section>
  );
};

export default Page;
