import { pool } from "../db";

export async function getAllData() {
    const res = await pool.query('SELECT * FROM "game" WHERE "is_active" = false')
    return res.rows;
}

export async function findById(id: number) {
    const res = await pool.query('SELECT * FROM "game" WHERE "id_game" = $1', [id])
    return res.rows[0]
}

export async function createGame(game: Game) {
    const { nama_game, deskripsi_game, lokasi, is_active } = game
    const res = await pool.query('INSERT INTO "game" ("nama_game", "deskripsi_game", "lokasi", "is_active") VALUES ($1, $2, $3, $4) RETURNING *', [nama_game, deskripsi_game, lokasi, is_active])
    return res.rows
}
export async function updateGame(id_game: number, game: Game) {
    const { nama_game, deskripsi_game, lokasi, is_active } = game
    const req = await pool.query('UPDATE "game" SET "nama_game" =$1, "deskripsi_game" =$2, "lokasi" =$3,  "is_active" =$4 WHERE "id_game" = $5 RETURNING *', [nama_game, deskripsi_game, lokasi, is_active, id_game])
    return req.rows[0]
}

export async function deleteGame(id_game: number) {
    const res = await pool.query('UPDATE "game" SET "is_active" = false WHERE "id_game" = $1 RETURNING *',
        [id_game])
    return res.rows[0]
}