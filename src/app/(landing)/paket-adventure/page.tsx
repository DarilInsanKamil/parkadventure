import React from "react";

const Page = async () => {
  const fetchApi = await fetch("http://localhost:3000/api/paketadventure");
  const data = await fetchApi.json();
  const result = Object.groupBy(data, ({ category }: { category: any }) => category);

  return (
    <section>
      <p>{JSON.stringify(result)}</p>
    </section>
  );
};

export default Page;
