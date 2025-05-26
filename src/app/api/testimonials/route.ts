import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET all testimonials
export async function GET(req: NextRequest) {
  try {
    // Optional: Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get("active");
    
    let queryText = "SELECT * FROM testimoni";
    const queryParams: any[] = [];
    
    // Filter by active status if specified
    if (isActive !== null) {
      queryText += " WHERE is_active = $1";
      queryParams.push(isActive === "true");
    }
    
    // Add ordering
    queryText += " ORDER BY id_testimoni DESC";
    
    const result = await query(queryText, queryParams);
    
    return NextResponse.json(result.rows.map(item => ({
      id_testimonial: item.id_testimoni,
      name: item.nama_testimoni,
      content: item.komentar_testimoni,
      rating: item.rating,
      is_featured: item.is_active,
      created_at: item.created_at,
      updated_at: item.updated_at
    })));
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST - create a testimonial
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
    
    // Insert new testimonial
    const result = await query(
      `INSERT INTO testimoni (nama_testimoni, komentar_testimoni, rating, is_active) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [body.nama_testimoni, body.komentar_testimoni, body.rating, body.is_active]
    );
    
    return NextResponse.json({
      id_testimonial: result.rows[0].id_testimoni,
      name: result.rows[0].nama_testimoni,
      content: result.rows[0].komentar_testimoni,
      rating: result.rows[0].rating,
      is_featured: result.rows[0].is_active,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
} 