import { pool } from "../db";

export async function getAllData() {
    const res = await pool.query('SELECT * FROM "fasilitas_paket"')
    return res.rows;
}

export async function findById(id: number) {
    const fasilitasById = await pool.query('SELECT * FROM "fasilitas_paket" WHERE "id_fasilitas" = $1', [id])
    return fasilitasById.rows[0];
}

export async function createFasilistas(fasilitas: FasilitasPaket) {
    const { id_paket, nama_fasilitas } = fasilitas
    const req = await pool.query('INSERT INTO "fasilitas_paket" ("id_paket", "nama_fasilitas") VALUES ($1, $2) RETURNING *', [id_paket, nama_fasilitas])
    return req.rows
}

export async function updateFasilitas(id_fasilitas: number, fasilitas: FasilitasPaket) {
    const { id_paket, nama_fasilitas } = fasilitas
    const req = await pool.query('UPDATE "fasilitas_paket" SET "id_paket" =$1, "nama_fasilitas" =$2 WHERE "id_fasilitas" = $3 RETURNING *', [id_paket, nama_fasilitas, id_fasilitas])
    return req.rows[0]
}

export async function deleteFasilitas(id: number) {
    const req = pool.query('DELETE FROM "fasilitas_paket" WHERE "id_fasilitas" =$1', [id])
    return req
}