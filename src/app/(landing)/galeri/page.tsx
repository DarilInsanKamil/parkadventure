export const dynamic = "force-dynamic";
import React from "react";

interface Gallery {
  id_gallery: number;
  title: string;
  image_url: string;
  is_featured: boolean;
}

const Page = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/gallery`);
  const data = await res.json();

  return (
    <section className="grid md:grid-cols-3 grid-cols-1 gap-5 p-10">
      {data.length > 0 ? (
        data.map((res: Gallery, idx: number) => (
          <div key={idx} className="relative w-full h-[400px] overflow-hidden">
            <img
              src={res.image_url}
              alt={res.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <h3 className="text-lg font-semibold">{res.title}</h3>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center py-10">Tidak ada gambar</p>
      )}
    </section>
  );
};

export default Page;
