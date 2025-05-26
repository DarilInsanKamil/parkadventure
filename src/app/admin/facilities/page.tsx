"use server"

import { query } from "@/lib/db";
import { FacilitiesClient } from "./facilities-client";

interface Facility {
  id_fasilitas: number;
  id_paket: number;
  nama_fasilitas: string;
  package_name: string;
  created_at: string;
  updated_at: string;
}

export default async function FacilitiesPage() {
  // Server-side data fetching
  const facilitiesResult = await query(`
    SELECT f.*, p.title_paket as package_name
    FROM fasilitas_paket f
    LEFT JOIN item_paket p ON f.id_paket = p.id_paket
    ORDER BY p.title_paket ASC, f.nama_fasilitas ASC
  `);

  const facilities: Facility[] = facilitiesResult.rows.map((row) => ({
    id_fasilitas: row.id_fasilitas,
    id_paket: row.id_paket,
    nama_fasilitas: row.nama_fasilitas,
    package_name: row.title_paket || "Unknown Package",
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));


  return <FacilitiesClient facilities={facilities} />;
} 