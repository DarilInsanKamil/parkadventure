import { pool } from "../db";

export async function getAllData() {
    const res = await pool.query('SELECT * FROM "galeri" WHERE "is_active" = true ORDER BY "id_galeri"')
    return res.rows;
}

export async function findById(id: number) {
    const res = await pool.query('SELECT * FROM "galeri" WHERE "id_galeri" = $1', [id])
    return res.rows[0]
}

export async function createGaleri(galeri: Galeri) {
    const { id_game, nama_photo, image_src, is_active } = galeri
    const res = await pool.query('INSERT INTO "galeri" ("id_game", "nama_photo", "image_src", "is_active") VALUES ($1, $2, $3, $4) RETURNING *', [id_game, nama_photo, image_src, is_active])
    return res.rows[0]
}
export async function updateGaleri(id_galeri:number, galeri: Galeri) {
    const { id_game, nama_photo, image_src, is_active } = galeri
    const res = await pool.query('UPDATE "galeri" SET "id_game" =$1, "nama_photo" =$2, "image_src" =$3,  "is_active" =$4 WHERE "id_galeri" = $5 RETURNING *', [id_game, nama_photo, image_src, is_active, id_galeri])
    return res.rows[0]
}

export async function deleteGaleri(id:number) {
    const res = await pool.query('UPDATE "galeri" SET "is_active" = false WHERE "id_galeri" = $1 RETURNING *', [id])
    return res.rows[0]
}