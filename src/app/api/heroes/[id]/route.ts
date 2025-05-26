import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET a single hero by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Hero ID is required" },
        { status: 400 }
      );
    }
    
    const result = await query(
      "SELECT * FROM hero WHERE id = $1",
      [id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Hero not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching hero with ID:`, error);
    return NextResponse.json(
      { error: "Failed to fetch hero" },
      { status: 500 }
    );
  }
}

// PATCH - update a hero
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
    
    // Check if hero exists
    const checkResult = await query(
      "SELECT * FROM hero WHERE id = $1",
      [id]
    );
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Hero not found" },
        { status: 404 }
      );
    }
    
    // Update hero
    const result = await query(
      `UPDATE hero 
       SET title_hero = $1, desc_hero = $2, 
           image_hero = $3, urutan = $4, is_active = $5, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $6 
       RETURNING *`,
      [
        body.title_hero, 
        body.desc_hero, 
        body.image_hero, 
        body.urutan, 
        body.is_active, 
        id
      ]
    );
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating hero with ID:`, error);
    return NextResponse.json(
      { error: "Failed to update hero" },
      { status: 500 }
    );
  }
}

// DELETE - delete a hero
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
    
    // Check if hero exists
    const checkResult = await query(
      "SELECT * FROM hero WHERE id = $1",
      [id]
    );
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Hero not found" },
        { status: 404 }
      );
    }
    
    // Delete hero
    await query(
      "DELETE FROM hero WHERE id = $1",
      [id]
    );
    
    return NextResponse.json(
      { message: "Hero deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting hero with ID:`, error);
    return NextResponse.json(
      { error: "Failed to delete hero" },
      { status: 500 }
    );
  }
} 