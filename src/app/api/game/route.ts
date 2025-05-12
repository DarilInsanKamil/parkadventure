import { NextRequest, NextResponse } from "next/server";
import { createGame, getAllData } from "./_action";

export async function GET(_req: NextRequest) {
    try {
        const res = await getAllData()
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
        const body = await req.json()
        const { nama_game, deskripsi_game, lokasi, is_active } = body
        
         if (!nama_game || !deskripsi_game || !lokasi) {
            return new NextResponse(JSON.stringify({ 
                error: "Missing required fields: nama_game, deskripsi_game, lokasi" 
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }

        const newFasilitas = await createGame({ nama_game, deskripsi_game, lokasi, is_active })
        return new NextResponse(JSON.stringify({ message: "Success Insert Data", newFasilitas }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            }
        })
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