"use client";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { insertDataGaleri, insertDataPaket } from "@/app/dashboard/_action";

interface NamaGame {
  id_game: number;
  nama_game: string;
}

export const FormGaleri = ({ namaGame }: { namaGame: NamaGame[] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    // Basic validation
    const requiredFields = ["id_game", "nama_photo", "is_active"];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        toast.error(`${field} is required`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const result = await insertDataGaleri(formData);

      if (result.success) {
        toast.success("Insert Data Berhasil");
        router.push(result.redirectTo ?? "/dashboard");
      } else {
        toast.error("Gagal Insert Data", {
          description: result.error || "Masukan data yang valid",
        });
      }
    } catch (error) {
      console.error("Insert failed:", error);
      toast.error("Insert Error", {
        description: "Terjadi kesalahan saat insert data",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label>Nama Game</label>
          <select
            id="id_game"
            name="id_game"
            className="border border-gray-300 p-1 rounded-md w-full"
          >
            {namaGame.map((res, idx) => (
              <option key={idx} value={res.id_game}>
                {res.nama_game}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            <p>Nama Photo</p>
          </label>
          <Input name="nama_photo" />
        </div>

        <div>
          <label>
            <p>Image</p>
          </label>
          <Input name="image_src" type="file" />
        </div>

        <div className="flex gap-2">
          <div>
            <input type="radio" id="is_active" name="is_active" value="true" />
            <label>Aktif</label>
          </div>
          <div>
            <input type="radio" id="is_active" name="is_active" value="false" />
            <label>Tidak aktif</label>
          </div>
        </div>

        <Button className="w-full mt-5" disabled={isLoading} type="submit">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
};
