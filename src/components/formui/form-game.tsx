"use client";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  insertDataGame,
} from "@/app/dashboard/_action";

export const FormGame = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    // Basic validation
    const requiredFields = ["nama_game", "deskripsi_game", "lokasi"];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        toast.error(`${field} is required`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const result = await insertDataGame(formData);

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
          <label>
            <p>Nama</p>
          </label>
          <Input name="nama_game" />
        </div>
        <div>
          <label>
            <p>Lokasi</p>
          </label>
          <Input name="lokasi" />
        </div>
        <div className="w-full">
          <label>
            <p>Deskripsi</p>
          </label>
          <textarea
            name="deskripsi_game"
            className="w-[100%] border border-gray-300 p-1 rounded-md"
          ></textarea>
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
