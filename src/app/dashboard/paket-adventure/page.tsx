import Loading from "@/app/loading";
import { TableItemPaket } from "@/components/tableui/table-itempaket";
import { Suspense } from "react";



const Page = async () => {
  const fetchData = await fetch("http://localhost:3000/api/item-paket");
  const data = await fetchData.json();

  return (
    <section className="overflow-auto p-5">
      <Suspense fallback={<Loading />}>
        <TableItemPaket data={data} />
      </Suspense>
    </section>
  );
};

export default Page;
