"use client";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { insertDataFasilitas } from "@/app/dashboard/_action";

interface NamaPaket {
  id_paket: number;
  title_paket: string;
}

export const FormFasilitas = ({ namapaket }: { namapaket: NamaPaket[] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    // Basic validation
    const requiredFields = ["id_paket", "nama_fasilitas"];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        toast.error(`${field} is required`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const result = await insertDataFasilitas(formData);

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
            id="id_paket"
            name="id_paket"
            className="border border-gray-300 p-1 rounded-md w-full"
          >
            {namapaket.map((res, idx) => (
              <option key={idx} value={res.id_paket}>
                {res.title_paket}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            <p>Nama Fasilitas</p>
          </label>
          <Input name="nama_fasilitas" />
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
