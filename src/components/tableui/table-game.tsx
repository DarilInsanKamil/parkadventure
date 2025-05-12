import { Button } from "../ui/button";

export const TableGame = ({ data }: { data: Game[] }) => {
  return (
    <table>
      <thead>
        <tr className="*:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5">
          <th>Nama</th>
          <th>Deskripsi</th>
          <th>Lokasi</th>
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
              <td>{res.nama_game}</td>
              <td>{res.deskripsi_game}</td>
              <td>{res.lokasi}</td>
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
}