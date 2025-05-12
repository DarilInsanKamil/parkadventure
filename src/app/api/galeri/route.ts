import { NextRequest, NextResponse } from "next/server";
import { createGaleri, getAllData } from "./_action";
import { join } from "path";
import mime from 'mime'
import { mkdir, stat, writeFile } from "fs/promises";

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
    const formData = await req.formData()
    const id_game = Number(formData.get('id_game')) as number
    const nama_photo = formData.get('nama_photo') as string
    const image_src = formData.get('image_src') as File
    const is_active = formData.get('is_active') === "true" ? true : false

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

        const newFasilitas = await createGaleri({ id_game, nama_photo, image_src: fileUrl, is_active })
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