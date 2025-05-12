import Loading from "@/app/loading";
import { TableTestimoni } from "@/components/tableui/table-testimoni";
import { Suspense } from "react";

const Page = async () => {
  const fetchData = await fetch("http://localhost:3000/api/testimoni");
  const data = await fetchData.json();

  return (
    <section className="overflow-auto p-5">
      <Suspense fallback={<Loading />}>
        <TableTestimoni data={data} />
      </Suspense>
    </section>
  );
};

export default Page;
