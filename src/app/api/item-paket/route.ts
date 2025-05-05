import { NextRequest, NextResponse } from "next/server";
import { createItemPaket, getAllItem } from "./_action";

export async function GET(_req: NextRequest) {
    try {
        const res = await getAllItem();
        return new NextResponse(JSON.stringify(res), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (err) {
        console.error('Error executing query', err);
        let errorMessage = 'An error occurred while fetching data';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const { id_game, title_paket, harga_paket, image_src, deskripsi_paket, type_paket, min_peserta, max_peserta, durasi, is_active } = data

        const newItem = await createItemPaket({ id_game, title_paket, harga_paket, image_src, deskripsi_paket, type_paket, min_peserta, max_peserta, durasi, is_active });

        return new NextResponse(JSON.stringify({message: "Success Insert Data"}, newItem), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (err) {
        console.error('Error executing query', err);
        let errorMessage = 'An error occurred while create data';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}