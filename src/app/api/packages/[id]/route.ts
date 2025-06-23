import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET a single package by ID

// GET a single package by ID (with facilities)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

    const result = await query(
      `
      SELECT 
        p.*,
        g.nama_game as game_name,
        ARRAY_AGG(
          JSONB_BUILD_OBJECT(
            'id', fp.id_fasilitas,
            'name', fp.nama_fasilitas
          )
        ) as facilities
      FROM item_paket p 
      LEFT JOIN game g ON p.id_game = g.id_game
      LEFT JOIN fasilitas_paket fp ON p.id_paket = fp.id_paket
      WHERE p.id_paket = $1
      GROUP BY p.id_paket, g.nama_game
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    const item = result.rows[0];

    return NextResponse.json({
      id_package: item.id_paket,
      name: item.title_paket,
      image_src: item.image_src,
      description: item.deskripsi_paket,
      price: item.harga_paket,
      duration: item.durasi,
      min_participants: item.min_peserta,
      max_participants: item.max_peserta,
      game_name: item.game_name,
      id_game: item.id_game,
      is_active: item.is_active,
      facilities: item.facilities.filter((f: any) => f.id !== null),
      created_at: item.created_at,
      updated_at: item.updated_at
    });
  } catch (error) {
    console.error(`Error fetching package with ID:`, error);
    return NextResponse.json(
      { error: "Failed to fetch package" },
      { status: 500 }
    );
  }
}

// PATCH - update a package
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
    
    const id = await params;
    const body = await req.json();
    
    // Check if package exists
    const checkResult = await query(
      "SELECT * FROM item_paket WHERE id_paket = $1",
      [id]
    );
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }
    
    // Update package
    const result = await query(
      `UPDATE item_paket 
       SET id_game = $1, title_paket = $2, harga_paket = $3, deskripsi_paket = $4, 
           min_peserta = $5, max_peserta = $6, durasi = $7, 
           is_active = $8, image_src = $9, updated_at = CURRENT_TIMESTAMP 
       WHERE id_paket = $10 
       RETURNING *`,
      [
        body.id_game, 
        body.title_paket, 
        body.harga_paket, 
        body.deskripsi_paket, 
        body.min_peserta, 
        body.max_peserta, 
        body.durasi, 
        body.is_active,
        body.image_src,
        id
      ]
    );
    
    // Fetch the game name for the response
    const gameResult = await query(
      "SELECT nama_game FROM game WHERE id_game = $1",
      [body.id_game]
    );
    
    const gameName = gameResult.rows.length > 0 ? gameResult.rows[0].nama_game : null;
    
    return NextResponse.json({
      id_package: result.rows[0].id_paket,
      name: result.rows[0].title_paket,
      description: result.rows[0].deskripsi_paket,
      price: result.rows[0].harga_paket,
      duration: result.rows[0].durasi,
      min_participants: result.rows[0].min_peserta,
      max_participants: result.rows[0].max_peserta,
      game_name: gameName,
      id_game: result.rows[0].id_game,
      is_active: result.rows[0].is_active,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at
    });
  } catch (error) {
    console.error(`Error updating package with ID:`, error);
    return NextResponse.json(
      { error: "Failed to update package" },
      { status: 500 }
    );
  }
}

// DELETE - delete a package
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Comment out authentication check for testing
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    // Check if package exists
    const checkResult = await query(
      "SELECT * FROM item_paket WHERE id_paket = $1",
      [id]
    );
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }
    
    // Check if package has associated facilities (optional)
    const facilitiesResult = await query(
      "SELECT * FROM fasilitas_paket WHERE id_paket = $1 LIMIT 1",
      [id]
    );
    
    if (facilitiesResult.rows.length > 0) {
      // Delete associated facilities first
      await query(
        "DELETE FROM fasilitas_paket WHERE id_paket = $1",
        [id]
      );
    }
    
    // Delete package
    await query(
      "DELETE FROM item_paket WHERE id_paket = $1",
      [id]
    );
    
    return NextResponse.json(
      { message: "Package deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting package with ID:`, error);
    return NextResponse.json(
      { error: "Failed to delete package" },
      { status: 500 }
    );
  }
} 