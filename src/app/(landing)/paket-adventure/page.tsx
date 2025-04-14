import React from "react";

const Page = async () => {
  const fetchApi = await fetch("https://dummyjson.com/recipes");
  const data = await fetchApi.json();
  return (
    <section>
      {data?.recipes.map((res: any, idx: number) => {
        return (
          <div key={idx}>
            <p>{res.name}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Page;
