import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET all gallery items
export async function GET(req: NextRequest) {
  try {
    // Optional: Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get("active");
    
    let queryText = "SELECT * FROM galeri";
    const queryParams: any[] = [];
    
    // Filter by active status if specified
    if (isActive !== null) {
      queryText += " WHERE is_active = $1";
      queryParams.push(isActive === "true");
    }
    
    // Add ordering
    queryText += " ORDER BY id_galeri DESC";
    
    const result = await query(queryText, queryParams);
    
    return NextResponse.json(result.rows.map(item => ({
      id_game: item.id_game,
      id_gallery: item.id_galeri,
      title: item.nama_photo,
      image_url: item.image_src,
      is_featured: item.is_active,
      created_at: item.created_at,
      updated_at: item.updated_at
    })));
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

// POST - create a gallery item
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
    
    // Insert new gallery item
    const result = await query(
      `INSERT INTO galeri (id_game, nama_photo, image_src, is_active) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [body.id_game, body.nama_photo, body.image_src, body.is_active]
    );
    
    return NextResponse.json({
      id_gallery: result.rows[0].id_galeri,
      title: result.rows[0].nama_photo,
      image_url: result.rows[0].image_src,
      is_featured: result.rows[0].is_active,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
} 