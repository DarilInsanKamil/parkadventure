import { NextRequest, NextResponse } from "next/server";
import { deleteItemPaket, findById, updateItemPaket } from "../_action";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from 'mime'
import { join } from "path";

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
        const formData = await req.formData();

        const image_src = formData.get("image_src") as File | null

        const existingData = await findById(parseInt(id))
        console.log(existingData)
        if (!existingData) {
            return new NextResponse(JSON.stringify({ error: "Data Not Found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        let fileUrl = existingData.image_src; // Default to existing image

        // Only process new image if provided
        if (image_src && image_src instanceof File) {
            const buffer = Buffer.from(await image_src.arrayBuffer());
            const relativeUploadDir = `/uploads/${new Date(Date.now())
                .toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })
                .replace(/\//g, "-")}`;

            const uploadDir = join(process.cwd(), "public", relativeUploadDir);

            try {
                await stat(uploadDir);
            } catch (e: any) {
                if (e.code === "ENOENT") {
                    await mkdir(uploadDir, { recursive: true });
                } else {
                    console.error("Error creating directory:", e);
                    return new NextResponse(JSON.stringify({ error: "Error uploading file" }), {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
            }

            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const filename = `${image_src.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(image_src.type)}`;
            await writeFile(`${uploadDir}/${filename}`, buffer);
            fileUrl = `${relativeUploadDir}/${filename}`;
        }

        const updatedItemPaket = {
            ...existingData,
            ...(formData.has("id_game") && { id_game: Number(formData.get("id_game")) }),
            ...(formData.has("title_paket") && { title_paket: formData.get("title_paket") }),
            ...(formData.has("deskripsi_paket") && { deskripsi_paket: formData.get("deskripsi_paket") }),
            ...(formData.has("type_paket") && { type_paket: formData.get("type_paket") }),
            ...(formData.has("harga_paket") && { harga_paket: Number(formData.get("harga_paket")) }),
            ...(formData.has("max_peserta") && { max_peserta: Number(formData.get("max_peserta")) }),
            ...(formData.has("min_peserta") && { min_peserta: Number(formData.get("min_peserta")) }),
            ...(formData.has("durasi") && { durasi: formData.get("durasi") }),
            ...(formData.has("is_active") && { is_active: formData.get("is_active") === "true" }),
            image_src: fileUrl,
        }

        const newItemPaket = await updateItemPaket(parseInt(id), updatedItemPaket)

        return new NextResponse(JSON.stringify({
            message: "Success Update Data",
            newItemPaket
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })

    } catch (err) {
        console.error('Error executing query', err);
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while updating data';
        return new NextResponse(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
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