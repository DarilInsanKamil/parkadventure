import React from "react";

const Page = async () => {
  const fetchApi = await fetch("http://localhost:3000/api/paketadventure");
  const data = await fetchApi.json();
  return (
    <section>
      {data?.map((res: any, idx: number) => {
        return (
          <div key={idx}>
            <p>{res.title}</p>
            <img src={res.image} alt={res.alt} />
            <p>{res.description}</p>
            <p>{res.price}</p>
            <div>
              {res.list.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};


export default Page;
