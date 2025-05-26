import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET a single gallery item by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Gallery item ID is required" },
        { status: 400 }
      );
    }

    const result = await query(
      "SELECT * FROM galeri WHERE id_galeri = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id_gallery: result.rows[0].id_galeri,
      title: result.rows[0].nama_photo,
      image_url: result.rows[0].image_src,
      is_featured: result.rows[0].is_active,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at
    });
  } catch (error) {
    console.error(`Error fetching gallery item with ID:`, error);
    return NextResponse.json(
      { error: "Failed to fetch gallery item" },
      { status: 500 }
    );
  }
}

// PATCH - update a gallery item
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Comment out authentication check for testing
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { error: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    const { id } = await params;
    const body = await req.json();

    // Check if gallery item exists
    const checkResult = await query(
      "SELECT * FROM galeri WHERE id_galeri = $1",
      [id]
    );

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    // Update gallery item
    const result = await query(
      `UPDATE galeri 
       SET id_game = $1, nama_photo = $2, image_src = $3, is_active = $4, updated_at = CURRENT_TIMESTAMP 
       WHERE id_galeri = $5 
       RETURNING *`,
      [body.id_game, body.nama_photo, body.image_src, body.is_active, id]
    );

    return NextResponse.json({
      id_gallery: result.rows[0].id_galeri,
      title: result.rows[0].nama_photo,
      image_url: result.rows[0].image_src,
      is_featured: result.rows[0].is_active,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at
    });
  } catch (error) {
    console.error(`Error updating gallery item with ID :`, error);
    return NextResponse.json(
      { error: "Failed to update gallery item" },
      { status: 500 }
    );
  }
}

// DELETE - delete a gallery item
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Comment out authentication check for testing
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { error: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    const { id } = await params;

    // Check if gallery item exists
    const checkResult = await query(
      "SELECT * FROM galeri WHERE id_galeri = $1",
      [id]
    );

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    // Delete gallery item
    await query(
      "DELETE FROM galeri WHERE id_galeri = $1",
      [id]
    );

    return NextResponse.json(
      { message: "Gallery item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting gallery item with ID:`, error);
    return NextResponse.json(
      { error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
} 