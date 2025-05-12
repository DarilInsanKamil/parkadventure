import { Button } from "../ui/button";

export const TableTestimoni = ({ data }: { data: Testimoni[] }) => {
  return (
    <table>
      <thead>
        <tr className="*:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5">
          <th>Nama</th>
          <th>Komentar</th>
          <th>Rating</th>
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
              <td>{res.nama_testimoni}</td>
              <td>{res.komentar_testimoni}</td>
              <td>{res.rating}</td>
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
