import { Button } from "@/components/ui/button";
import { query } from "@/lib/db";
import { phudu } from "@/lib/utils";
import { PersonStanding, User2 } from "lucide-react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await query(
    `SELECT 
      p.*,
      g.nama_game as game_name,
      ARRAY_AGG(
        JSONB_BUILD_OBJECT(
          'id', fp.id_fasilitas,
          'name', fp.nama_fasilitas
            )
      ) FILTER (WHERE fp.id_fasilitas IS NOT NULL) as facilities
    FROM item_paket p 
    LEFT JOIN game g ON p.id_game = g.id_game
    LEFT JOIN fasilitas_paket fp ON p.id_paket = fp.id_paket
    WHERE p.id_game = $1 AND p.is_active = true
    GROUP BY p.id_paket, g.nama_game
    ORDER BY p.title_paket ASC`,
    [id]
  );

  // Transform the data for better structure
  const packages = res.rows.map((pkg) => ({
    id: pkg.id_paket,
    title: pkg.title_paket,
    price: pkg.harga_paket,
    description: pkg.deskripsi_paket,
    duration: pkg.durasi,
    minParticipants: pkg.min_peserta,
    maxParticipants: pkg.max_peserta,
    type: pkg.type_paket,
    gameName: pkg.game_name,
    facilities: pkg.facilities || [],
    imageSrc: pkg.image_src,
  }));
  return (
    <section className="p-20">
      <h1 className={`${phudu.className} text-3xl font-extrabold`}>{packages[0]?.gameName}</h1>
      <div>
        <div className="flex gap-5">
          {packages.map((res, idx: number) => (
            <div key={idx} className="md:w-[500px]">
              <div>
                <img
                  src={res.imageSrc}
                  alt={res.title}
                  className="w-[200px] h-[200px] object-cover"
                />
                <p className={`${phudu.className} text-3xl font-extrabold`}>{res.title}</p>
                <p className="text-2xl ">{res.price}</p>
                <p className="text-gray-400">{res.description}</p>
                <p>{res.duration}</p>
                <div className="flex gap-2 items-center">
                  <User2/>
                  <p>{res.minParticipants} - {res.maxParticipants}</p>
                </div>
                <Button>Reservation</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;

[
  {
    id: 6,
    title: "Offroad Jeep",
    price: "450000.00",
    description:
      "Nikmati perjalanan offroad yang lebih santai sambil menikmati panorama alam Caringin yang indah. Cocok untuk Anda yang ingin menikmati keindahan alam dengan cara yang berbeda dan menantang.",
    duration: "2 jam",
    minParticipants: 1,
    maxParticipants: 3,
    gameName: "Offroad",
    facilities: [],
    imageSrc: "/images/packages/1748248073032-img_1872.jpeg.jpg",
  },
];
