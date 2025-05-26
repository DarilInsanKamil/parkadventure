import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET all facilities
export async function GET(req: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const packageId = searchParams.get("package");
    
    let queryText = `
      SELECT f.*, p.title_paket 
      FROM fasilitas_paket f 
      LEFT JOIN item_paket p ON f.id_paket = p.id_paket
    `;
    
    const queryParams: any[] = [];
    
    // Filter by package if specified
    if (packageId) {
      queryText += " WHERE f.id_paket = $1";
      queryParams.push(packageId);
    }
    
    // Add ordering
    queryText += " ORDER BY p.title_paket ASC, f.nama_fasilitas ASC";
    
    const result = await query(queryText, queryParams);
    
    return NextResponse.json(result.rows.map(item => ({
      id_fasilitas: item.id_fasilitas,
      id_paket: item.id_paket,
      nama_fasilitas: item.nama_fasilitas,
      package_name: item.title_paket,
      created_at: item.created_at,
      updated_at: item.updated_at
    })));
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return NextResponse.json(
      { error: "Failed to fetch facilities" },
      { status: 500 }
    );
  }
}

// POST - create a facility
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    
    // Validate required fields
    if (!body.id_paket) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }
    
    if (!body.nama_fasilitas) {
      return NextResponse.json(
        { error: "Facility name is required" },
        { status: 400 }
      );
    }
    
    // Insert new facility
    const result = await query(
      `INSERT INTO fasilitas_paket (id_paket, nama_fasilitas) 
       VALUES ($1, $2) 
       RETURNING *`,
      [body.id_paket, body.nama_fasilitas]
    );
    
    // Get package name for response
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
      created_at: result.rows[0].created_at
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating facility:", error);
    return NextResponse.json(
      { error: "Failed to create facility" },
      { status: 500 }
    );
  }
} 