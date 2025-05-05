import { NextRequest, NextResponse } from "next/server";
import { deleteItemPaket, findById, updateItemPaket } from "../_action";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    try {
        const itemPaket = await findById(parseInt(id));
        if (!itemPaket) {
            return new NextResponse(JSON.stringify({ error: "Data Not Found" }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        return new NextResponse(JSON.stringify({ message: "Success Get Data by ID", itemPaket }), {
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
            return new NextResponse(JSON.stringify({ error: "Data Not Found", }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        const updatedItemPaket = {
            ...existingData,
            ...body
        }

        const newItemPaket = await updateItemPaket(parseInt(id), updatedItemPaket)

        return new NextResponse(JSON.stringify({ message: "Success Update Data", newItemPaket }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        })

    } catch (err) {
        console.error('Error executing query', err);
        let errorMessage = 'An error occurred while updating data';
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


export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id
        const existingData = await findById(parseInt(id))
        if (!existingData) {
            return new NextResponse(JSON.stringify({ error: "Data Not Found", }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        await deleteItemPaket(parseInt(id))
        return new NextResponse(JSON.stringify({ message: "Success Delete Data" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
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