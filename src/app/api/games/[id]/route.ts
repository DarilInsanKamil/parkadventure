import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET a single game by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Game ID is required" },
        { status: 400 }
      );
    }
    
    const result = await query(
      "SELECT * FROM game WHERE id_game = $1",
      [id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Game not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching game with ID:`, error);
    return NextResponse.json(
      { error: "Failed to fetch game" },
      { status: 500 }
    );
  }
}

// PATCH - update a game
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    const body = await req.json();
    
    // Check if game exists
    const checkResult = await query(
      "SELECT * FROM game WHERE id_game = $1",
      [id]
    );
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Game not found" },
        { status: 404 }
      );
    }
    
    // Update game
    const result = await query(
      `UPDATE game 
       SET nama_game = $1, deskripsi_game = $2, lokasi = $3, is_active = $4, updated_at = CURRENT_TIMESTAMP 
       WHERE id_game = $5 
       RETURNING *`,
      [body.nama_game, body.deskripsi_game, body.lokasi, body.is_active, id]
    );
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating game with ID:`, error);
    return NextResponse.json(
      { error: "Failed to update game" },
      { status: 500 }
    );
  }
}

// DELETE - delete a game
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    // Check if game exists
    const checkResult = await query(
      "SELECT * FROM game WHERE id_game = $1",
      [id]
    );
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Game not found" },
        { status: 404 }
      );
    }
    
    // Delete game
    await query(
      "DELETE FROM game WHERE id_game = $1",
      [id]
    );
    
    return NextResponse.json(
      { message: "Game deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting game with ID:`, error);
    return NextResponse.json(
      { error: "Failed to delete game" },
      { status: 500 }
    );
  }
} 