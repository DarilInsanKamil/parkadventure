import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET all games
export async function GET(req: NextRequest) {
  try {
    // Optional: Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get("active");
    
    let queryText = "SELECT * FROM game";
    const queryParams: any[] = [];
    
    // Filter by active status if specified
    if (isActive !== null) {
      queryText += " WHERE is_active = $1";
      queryParams.push(isActive === "true");
    }
    
    // Add ordering
    queryText += " ORDER BY nama_game ASC";
    
    const result = await query(queryText, queryParams);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}

// POST - create a game
export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    
    // Insert new game
    const result = await query(
      `INSERT INTO game (nama_game, deskripsi_game, lokasi, is_active) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [body.nama_game, body.deskripsi_game, body.lokasi, body.is_active]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
} 