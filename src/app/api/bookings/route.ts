import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET all booking
export async function GET(req: NextRequest) {
  try {
    // Optional: Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    
    let queryText = "SELECT * FROM booking";
    const queryParams: any[] = [];
    
    // Filter by status if specified
    if (status !== null) {
      queryText += " WHERE status = $1";
      queryParams.push(status);
    }
    
    // Add ordering
    queryText += " ORDER BY created_at DESC";
    
    const result = await query(queryText, queryParams);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

// POST - create a booking
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Insert new booking
    const result = await query(
      `INSERT INTO booking (
        name, 
        email, 
        phone, 
        date, 
        time, 
        people_count, 
        special_requests, 
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *`,
      [
        body.name, 
        body.email, 
        body.phone, 
        body.date, 
        body.time, 
        body.people_count, 
        body.special_requests, 
        body.status || 'pending'
      ]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
} 