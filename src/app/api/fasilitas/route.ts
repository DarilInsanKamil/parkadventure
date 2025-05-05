import { NextRequest, NextResponse } from "next/server";
import { createFasilistas, getAllData } from "./_action";
import { createTestimoni } from "../testimoni/_action";

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
        const { id_paket, nama_fasilitas } = body

        const newFasilitas = await createFasilistas({ id_paket, nama_fasilitas })
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