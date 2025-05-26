"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteFacility } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Facility {
  id_fasilitas: number;
  id_paket: number;
  nama_fasilitas: string;
  package_name: string;
  created_at: string;
  updated_at: string;
}

interface FacilitiesClientProps {
  facilities: Facility[];
}

export function FacilitiesClient({ facilities }: FacilitiesClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Filter facilities based on search query
  const filteredFacilities = facilities.filter((facility) => {
    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    return (
      facility.nama_fasilitas.toLowerCase().includes(searchLower) ||
      facility.package_name.toLowerCase().includes(searchLower)
    );
  });

  // Handle facility deletion
  async function handleDelete() {
    if (!deleteId) return;

    try {
      const response = await fetch(`/api/facilities/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete game");
      }

      // Remove deleted game from state
      toast.success("Facilites deleted successfully");
    } catch (error) {
      console.error("Error deleting game:", error);
      toast.error("Failed to delete game");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
      router.refresh();
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Facilities</h1>
        <Link href="/admin/facilities/new">
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Facility
          </Button>
        </Link>
      </div>

      {/* Search input */}
      <div className="flex mt-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search facilities..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Facility Name</TableHead>
              <TableHead>Paket</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFacilities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No facilities found.
                </TableCell>
              </TableRow>
            ) : (
              filteredFacilities.map((facility) => (
                <TableRow key={facility.id_fasilitas}>
                  <TableCell className="font-medium">
                    {facility.nama_fasilitas}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {facility.package_name || "Unknown Package"}
                    </Badge>
                  </TableCell>
                
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          router.push(
                            `/admin/facilities/${facility.id_fasilitas}`
                          )
                        }
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500"
                        onClick={() => {
                          setDeleteId(facility.id_fasilitas);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this game? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
