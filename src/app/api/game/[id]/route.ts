import { NextRequest, NextResponse } from "next/server";
import { deleteGame, findById, updateGame } from "../_action";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id
        const res = await findById(parseInt(id))
        if (!res) {
            return new NextResponse(JSON.stringify({ error: "Data Not Found" }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
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
        return new NextResponse(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id
        const body = await req.json()
        const existingData = await findById(parseInt(id))
        if (!existingData) {
            return new NextResponse(JSON.stringify({ error: "Data Not Found" }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        const updatedData = {
            ...existingData,
            ...body
        }
        const updatedTestimoni = await updateGame(parseInt(id), updatedData)

        return new NextResponse(JSON.stringify({ message: "Success Update Data", updatedTestimoni }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (err) {
        console.error('Error executing query', err);
        let errorMessage = 'An error occurred while update data';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return new NextResponse(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id
        const existingData = await findById(parseInt(id))
        if (!existingData) {
            return new NextResponse(JSON.stringify({ error: "Data Not Found" }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        await deleteGame(parseInt(id))
        return new NextResponse(JSON.stringify({ message: "Success Delete Data" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.error('Error executing query', err);
        let errorMessage = 'An error occurred while deleting data';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return new NextResponse(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}