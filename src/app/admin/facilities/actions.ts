"use server";

import { revalidatePath } from "next/cache";

// Action to delete a facility
export async function deleteFacility(id: number) {
  try {
    const response = await fetch(`http://localhost:3000/api/fasilitas_paket/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete facility");
    }

    // Revalidate the facilities page to update the UI
    revalidatePath("/admin/facilities");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting facility:", error);
    return { success: false, error };
  }
} 