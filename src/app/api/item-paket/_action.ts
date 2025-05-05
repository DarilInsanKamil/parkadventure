import { pool } from "../db";

export async function getAllItem() {
    const res = await pool.query(`SELECT * FROM "item_paket" WHERE "is_active" = true`);
    return res.rows;
}

export async function findById(id: number) {
    const itemPaketById = await pool.query('SELECT * FROM "item_paket" WHERE "id_paket" = $1', [id])
    return itemPaketById.rows[0];
}
export async function createItemPaket(itemPaket: ItemPaket) {
    const { id_game, title_paket, harga_paket, image_src, deskripsi_paket, type_paket, min_peserta, max_peserta, durasi, is_active, } = itemPaket

    const req = await pool.query('INSERT INTO "item_paket" ("id_game", "title_paket", "harga_paket", "image_src", "deskripsi_paket", "type_paket", "min_peserta", "max_peserta", "durasi", "is_active") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [id_game, title_paket, harga_paket, image_src, deskripsi_paket, type_paket, min_peserta, max_peserta, durasi, is_active])
    return req.rows
}

export async function updateItemPaket(id_paket: number, itemPaket: ItemPaket) {
    const { id_game, title_paket, harga_paket, image_src, deskripsi_paket, type_paket, min_peserta, max_peserta, durasi, is_active, } = itemPaket

    const req = await pool.query('UPDATE "item_paket" SET "id_game" =$1, "title_paket" =$2, "harga_paket" =$3, "image_src" =$4, "deskripsi_paket" =$5, "type_paket" =$6, "min_peserta" =$7, "max_peserta" =$8, "durasi" =$9, "is_active" =$10 WHERE "id_paket" = $11 RETURNING *', [id_game, title_paket, harga_paket, image_src, deskripsi_paket, type_paket, min_peserta, max_peserta, durasi, is_active, id_paket])
    return req.rows[0]
}

export async function deleteItemPaket(id_paket: number) {
    const req = await pool.query(
        'UPDATE "item_paket" SET "is_active" = false WHERE "id_paket" = $1 RETURNING *',
        [id_paket]
    );
    return req.rows[0];
}