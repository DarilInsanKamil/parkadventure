import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET a single testimonial by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Testimonial ID is required" },
        { status: 400 }
      );
    }
    
    const result = await query(
      "SELECT * FROM testimoni WHERE id_testimoni = $1",
      [id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      id_testimonial: result.rows[0].id_testimoni,
      name: result.rows[0].nama_testimoni,
      content: result.rows[0].komentar_testimoni,
      rating: result.rows[0].rating,
      is_featured: result.rows[0].is_active,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at
    });
  } catch (error) {
    console.error(`Error fetching testimonial with ID:`, error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

// PATCH - update a testimonial
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
    
    // Check if testimonial exists
    const checkResult = await query(
      "SELECT * FROM testimoni WHERE id_testimoni = $1",
      [id]
    );
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }
    
    // Update testimonial
    const result = await query(
      `UPDATE testimoni 
       SET nama_testimoni = $1, komentar_testimoni = $2, rating = $3, is_active = $4, updated_at = CURRENT_TIMESTAMP 
       WHERE id_testimoni = $5 
       RETURNING *`,
      [body.nama_testimoni, body.komentar_testimoni, body.rating, body.is_active, id]
    );
    
    return NextResponse.json({
      id_testimonial: result.rows[0].id_testimoni,
      name: result.rows[0].nama_testimoni,
      content: result.rows[0].komentar_testimoni,
      rating: result.rows[0].rating,
      is_featured: result.rows[0].is_active,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at
    });
  } catch (error) {
    console.error(`Error updating testimonial with ID:`, error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

// DELETE - delete a testimonial
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
    
    // Check if testimonial exists
    const checkResult = await query(
      "SELECT * FROM testimoni WHERE id_testimoni = $1",
      [id]
    );
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }
    
    // Delete testimonial
    await query(
      "DELETE FROM testimoni WHERE id_testimoni = $1",
      [id]
    );
    
    return NextResponse.json(
      { message: "Testimonial deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting testimonial with ID:`, error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
} 