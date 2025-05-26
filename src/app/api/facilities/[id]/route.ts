import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET a single facility by ID
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = (await params);

    if (!id) {
      return NextResponse.json(
        { error: "Facility ID is required" },
        { status: 400 }
      );
    }

    const result = await query(
      `SELECT f.*, p.title_paket 
       FROM fasilitas_paket f 
       LEFT JOIN item_paket p ON f.id_paket = p.id_paket 
       WHERE f.id_fasilitas = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Facility not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id_fasilitas: result.rows[0].id_fasilitas,
      id_paket: result.rows[0].id_paket,
      nama_fasilitas: result.rows[0].nama_fasilitas,
      package_name: result.rows[0].title_paket,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at
    });
  } catch (error) {
    console.error(`Error fetching facility with ID:`, error);
    return NextResponse.json(
      { error: "Failed to fetch facility" },
      { status: 500 }
    );
  }
}

// PATCH - update a facility
export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = (await params);
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Check if facility exists
    const checkResult = await query(
      "SELECT * FROM fasilitas_paket WHERE id_fasilitas = $1",
      [id]
    );

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Facility not found" },
        { status: 404 }
      );
    }

    // Update facility
    const result = await query(
      `UPDATE fasilitas_paket 
       SET id_paket = $1, 
           nama_fasilitas = $2, 
           updated_at = CURRENT_TIMESTAMP 
       WHERE id_fasilitas = $3 
       RETURNING *`,
      [body.id_paket, body.nama_fasilitas, id]
    );

    // Fetch package name for the response
    const packageResult = await query(
      "SELECT title_paket FROM item_paket WHERE id_paket = $1",
      [body.id_paket]
    );

    const packageName = packageResult.rows.length > 0
      ? packageResult.rows[0].title_paket
      : null;

    return NextResponse.json({
      id_fasilitas: result.rows[0].id_fasilitas,
      id_paket: result.rows[0].id_paket,
      nama_fasilitas: result.rows[0].nama_fasilitas,
      package_name: packageName,
      updated_at: result.rows[0].updated_at
    });
  } catch (error) {
    console.error(`Error updating facility with ID:`, error);
    return NextResponse.json(
      { error: "Failed to update facility" },
      { status: 500 }
    );
  }
}

// DELETE - delete a facility
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = (await params);
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if facility exists
    const checkResult = await query(
      "SELECT * FROM fasilitas_paket WHERE id_fasilitas = $1",
      [id]
    );

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Facility not found" },
        { status: 404 }
      );
    }

    // Delete facility
    await query(
      "DELETE FROM fasilitas_paket WHERE id_fasilitas = $1",
      [id]
    );

    return NextResponse.json(
      { message: "Facility deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting facility with ID:`, error);
    return NextResponse.json(
      { error: "Failed to delete facility" },
      { status: 500 }
    );
  }
} 