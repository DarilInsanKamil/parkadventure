import { NextRequest, NextResponse } from "next/server";
import { createItemPaket, getAllItem } from "./_action";
import { join } from "path";
import mime from 'mime'
import { mkdir, stat, writeFile } from "fs/promises";

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

    const formData = await req.formData();

    const id_game = Number(formData.get("id_game")) as number
    const title_paket = formData.get("title_paket") as string
    const deskripsi_paket = formData.get("deskripsi_paket") as string
    const harga_paket = Number(formData.get("harga_paket")) as number
    const type_paket = formData.get("type_paket") as string
    const durasi = formData.get("durasi") as string
    const min_peserta = Number(formData.get("min_peserta")) as number
    const max_peserta = Number(formData.get("max_peserta")) as number
    const is_active = formData.get("is_active") as string === "true" ? true : false
    const image_src = formData.get("image_src") as File

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
            // This is for checking the directory is exist (ENOENT : Error No Entry)
            await mkdir(uploadDir, { recursive: true });
        } else {
            console.error(
                "Error while trying to create directory when uploading a file\n",
                e
            );
            return NextResponse.json(
                { error: "Something went wrong." },
                { status: 500 }
            );
        }
    }

    try {

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${image_src.name.replace(
            /\.[^/.]+$/,
            ""
        )}-${uniqueSuffix}.${mime.getExtension(image_src.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;

        const newItem = await createItemPaket({ id_game, title_paket, harga_paket, image_src: fileUrl, deskripsi_paket, type_paket, min_peserta, max_peserta, durasi, is_active });

        return NextResponse.json(newItem, { status: 201 })
    } catch (err) {
        console.error('Error executing query', err);
        let errorMessage = 'An error occurred while create data';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500
        })
    }
}