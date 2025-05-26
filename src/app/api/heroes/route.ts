import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET all hero
export async function GET(req: NextRequest) {
  try {
    // Optional: Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get("active");
    
    let queryText = "SELECT * FROM hero";
    const queryParams: any[] = [];
    
    // Filter by active status if specified
    if (isActive !== null) {
      queryText += " WHERE is_active = $1";
      queryParams.push(isActive === "true");
    }
    
    // Add ordering
    
    const result = await query(queryText, queryParams);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching hero:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero" },
      { status: 500 }
    );
  }
}

// POST - create a hero
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
    
    // Insert new hero
    const result = await query(
      `INSERT INTO hero ( 
        title_hero, 
        desc_hero, 
        urutan, 
        image_hero, 
        is_active
      ) VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [
        body.title_hero, 
        body.desc_hero, 
        body.urutan, 
        body.image_hero, 
        body.is_active
      ]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating hero:", error);
    return NextResponse.json(
      { error: "Failed to create hero" },
      { status: 500 }
    );
  }
} 