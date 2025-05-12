import { Button } from "../ui/button";

export const TableItemPaket = ({ data }: { data: ItemPaket[] }) => {
  return (
    <table>
      <thead>
        <tr className="*:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5">
          <th>Nama</th>
          <th>Harga</th>
          <th>Image</th>
          <th>Deskripsi</th>
          <th>Tipe</th>
          <th>Min</th>
          <th>Max</th>
          <th>Durasi</th>
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
              <td>{res.title_paket}</td>
              <td>{res.harga_paket}</td>
              <td>
                <img
                  src={res.image_src}
                  alt={res.title_paket}
                  width={80}
                  height={80}
                />
              </td>
              <td>{res.deskripsi_paket}</td>
              <td>{res.type_paket}</td>
              <td>{res.min_peserta}</td>
              <td>{res.max_peserta}</td>
              <td>{res.durasi}</td>
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
