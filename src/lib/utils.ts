import { clsx, type ClassValue } from "clsx";
import { Instagram, Music2, Phone } from "lucide-react";
import { Inter, Phudu } from "next/font/google";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const phudu = Phudu({
  subsets: ["latin"],
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});


export const contact = [
  {
    id: 3,
    nama: "Whatsapp",
    link: 'https://api.whatsapp.com/send?phone=6287770219001&text=Terimakasih%20telah%20menghubungi%20Batok%20Rafting.%20Ada%20yang%20bisa%20kami%20bantu%3F',
  },
  {
    id: 1,
    nama: "Instagram",
    link: 'https://www.instagram.com/batokrafting/',
  },
  {
    id: 2,
    nama: "Tiktok",
    link: 'https://www.tiktok.com/@outbound_bogor',
  }
]