import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { any } from "zod";

// GET all packages
export async function GET(req: NextRequest) {
  try {
    // Optional: Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get("active");
    const gameId = searchParams.get("game");
    
     let queryText = `
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
    `;

    const queryParams: any[] = [];
    let paramCount = 1;
    
    // Build the WHERE clause based on filters
    if (isActive !== null || gameId !== null) {
      queryText += " WHERE";
      
      if (isActive !== null) {
        queryText += ` p.is_active = $${paramCount}`;
        queryParams.push(isActive === "true");
        paramCount++;
        if (gameId !== null) queryText += " AND";
      }
      
      if (gameId !== null) {
        queryText += ` p.id_game = $${paramCount}`;
        queryParams.push(parseInt(gameId));
        paramCount++;
      }
    }
    
    // Add ordering
    queryText += " GROUP BY p.id_paket, g.nama_game ORDER BY p.title_paket ASC";
    
    const result = await query(queryText, queryParams);
    
    return NextResponse.json(result.rows.map(item => ({
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
      facilities: item.facilities.filter((f: any) => f.id !== null), // Filter out null facilities
      created_at: item.created_at,
      updated_at: item.updated_at
    })));
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

// POST - create a package
export async function POST(req: NextRequest) {
  try {
    // Comment out authentication check for testing
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    
    // Insert new package
    const result = await query(
      `INSERT INTO item_paket (id_game, title_paket, harga_paket, image_src, deskripsi_paket, min_peserta, max_peserta, durasi, is_active) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [
        body.id_game, 
        body.title_paket, 
        body.harga_paket, 
        body.image_src, 
        body.deskripsi_paket, 
        body.min_peserta, 
        body.max_peserta, 
        body.durasi, 
        body.is_active
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
      image_src: result.rows[0].image_src,
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
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 }
    );
  }
} 