import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET a single booking by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }
    
    const result = await query(
      "SELECT * FROM booking WHERE id = $1",
      [id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching booking with ID:`, error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

// PATCH - update a booking
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
    
    // Check if booking exists
    const checkResult = await query(
      "SELECT * FROM booking WHERE id = $1",
      [id]
    );
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }
    
    // Update booking
    const result = await query(
      `UPDATE booking 
       SET name = $1, email = $2, phone = $3, date = $4, 
           time = $5, people_count = $6, special_requests = $7, 
           status = $8, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $9 
       RETURNING *`,
      [
        body.name, 
        body.email, 
        body.phone, 
        body.date, 
        body.time, 
        body.people_count, 
        body.special_requests, 
        body.status, 
        id
      ]
    );
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating booking with ID:`, error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE - delete a booking
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
    
    // Check if booking exists
    const checkResult = await query(
      "SELECT * FROM booking WHERE id = $1",
      [id]
    );
    
    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }
    
    // Delete booking
    await query(
      "DELETE FROM booking WHERE id = $1",
      [id]
    );
    
    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting booking with ID:`, error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
} 