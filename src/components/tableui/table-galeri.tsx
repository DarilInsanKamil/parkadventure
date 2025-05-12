import { Button } from "../ui/button";

export const TableGaleri = ({ data }: { data: Galeri[] }) => {
  return (
    <table>
      <thead>
        <tr className="*:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5">
          <th>Nama</th>
          <th>Image</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((res, idx) => {
          return (
            <tr
              key={idx}
              className="*:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5"
            >
              <td>{res.nama_photo}</td>
              <td>{res.image_src}</td>
              <td className="flex gap-2">
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
