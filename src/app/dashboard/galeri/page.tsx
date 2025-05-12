import { TableGaleri } from "@/components/tableui/table-galeri";
import React, { Suspense } from "react";



const Page = async () => {
  const fetchData = await fetch("http://localhost:3000/api/galeri");
  const data = await fetchData.json();

  return (
    <section className="p-5">
      <Suspense fallback={<p>Loading...</p>}>
        <TableGaleri data={data} />
      </Suspense>
    </section>
  );
};

export default Page;
