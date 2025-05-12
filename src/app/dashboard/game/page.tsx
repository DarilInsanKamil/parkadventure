import { TableGame } from "@/components/tableui/table-game";

const Page = async () => {
  const fetchData = await fetch("http://localhost:3000/api/game");
  const data = await fetchData.json();

  return (
    <section className="overflow-auto p-5">
      <TableGame data={data} />
    </section>
  );
};

export default Page;
