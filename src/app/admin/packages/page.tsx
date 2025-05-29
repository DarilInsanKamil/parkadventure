"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Package type
interface Package {
  id_package: number;
  name: string;
  description: string | null;
  price: number;
  duration: string;
  max_participants: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function PackagesPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  // Fetch packages from API
  async function fetchPackages() {
    try {
      setLoading(true);
      const response = await fetch("/api/packages");
      
      if (!response.ok) {
        throw new Error("Failed to fetch packages");
      }
      
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to load packages");
      
      // For development: mock data
      setPackages([
        {
          id_package: 1,
          name: "Basic Rafting Adventure",
          description: "A 2-hour rafting experience suitable for beginners",
          price: 49.99,
          duration: "2 hours",
          max_participants: 8,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id_package: 2,
          name: "Advanced Rapids Challenge",
          description: "A full day of challenging white water rapids for experienced rafters",
          price: 129.99,
          duration: "6 hours",
          max_participants: 6,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Handle package deletion
  async function handleDelete() {
    if (!deleteId) return;
    
    try {
      const response = await fetch(`/api/packages/${deleteId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete package");
      }
      
      // Remove deleted package from state
      setPackages(packages.filter(pack => pack.id_package !== deleteId));
      toast.success("Package deleted successfully");
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Failed to delete package");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  }

  // Format price to local currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(price);
  };

  // Filter packages based on search term
  const filteredPackages = packages.filter(pack => 
    pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pack.description && pack.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    pack.duration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-4 text-black">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Packages</h1>
          <Button onClick={() => router.push("/admin/packages/new")}>
            <Plus className="mr-2 h-4 w-4" /> New Package
          </Button>
        </div>
        
        <div className="flex items-center py-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              placeholder="Search packages..."
              className="pl-8 placeholder:text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg">Loading packages...</p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <p className="text-lg">No packages found</p>
            {searchTerm ? (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            ) : (
              <Button onClick={() => router.push("/admin/packages/new")}>
                Add Your First Package
              </Button>
            )}
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="dark:bg-black">
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Max People</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackages.map((pack) => (
                  <TableRow key={pack.id_package}>
                    <TableCell className="font-medium">{pack.name}</TableCell>
                    <TableCell>{formatPrice(pack.price)}</TableCell>
                    <TableCell>{pack.duration}</TableCell>
                    <TableCell>{pack.max_participants}</TableCell>
                    <TableCell>
                      <Badge
                        variant={pack.is_active ? "default" : "secondary"}
                      >
                        {pack.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/packages/${pack.id_package}`)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500"
                          onClick={() => {
                            setDeleteId(pack.id_package);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this package? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 