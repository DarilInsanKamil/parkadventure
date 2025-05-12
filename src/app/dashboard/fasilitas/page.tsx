import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

const TableFasilitas = ({ data }: { data: FasilitasPaket[] }) => {
  return (
    <table>
      <thead>
        <tr className="*:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5">
          <th>Nama</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((res, idx: number) => {
          return (
            <tr
              key={idx}
              className="*:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5"
            >
              <td>{res.nama_fasilitas}</td>
              <td className="flex gap-2 items-center">
                <Button variant="destructive">D</Button>
                <Button>E</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Page = async () => {
  const fetchData = await fetch("http://localhost:3000/api/fasilitas");
  const data = await fetchData.json();

  return (
    <section className="overflow-auto p-5">
      <Suspense fallback={<Loading />}>
        {/* {JSON.stringify(data)} */}
        <TableFasilitas data={data} />
      </Suspense>
    </section>
  );
};

export default Page;
