import { pool } from "../db";

export async function getAllData() {
    const req = await pool.query('SELECT * FROM "testimoni" WHERE "is_active" = true ORDER BY "id_testimoni"')
    return req.rows;
}

export async function findById(id: number) {
    const req = await pool.query('SELECT * FROM "testimoni" WHERE "id_testimoni" = $1', [id])
    return req.rows[0];
}
export async function createTestimoni(testimoni: Testimoni) {
    const { nama_testimoni, komentar_testimoni, rating, is_active, } = testimoni
    const req = await pool.query('INSERT INTO "testimoni" ("nama_testimoni", "komentar_testimoni", "rating", "is_active") VALUES ($1, $2, $3, $4) RETURNING *', [nama_testimoni, komentar_testimoni, rating, is_active])
    return req.rows
}
export async function updateTestimoni(id_testimoni: number, testimoni: Testimoni) {
    const { nama_testimoni, komentar_testimoni, rating, is_active, } = testimoni
    const req = await pool.query('UPDATE "testimoni" SET "nama_testimoni" =$1, "komentar_testimoni" =$2, "rating" =$3,  "is_active" =$4 WHERE "id_testimoni" = $5 RETURNING *', [nama_testimoni, komentar_testimoni, rating, is_active, id_testimoni])
    return req.rows[0]
}
export async function deleteTestimoni(id_testimoni: number) {
    const req = await pool.query(
        'UPDATE "testimoni" SET "is_active" = false WHERE "id_testimoni" = $1 RETURNING *',
        [id_testimoni]
    );
    return req.rows[0];
}