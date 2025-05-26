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

// Gallery item type
interface GalleryItem {
  id_gallery: number;
  title: string;
  description: string | null;
  image_url: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export default function GalleryPage() {
  const router = useRouter();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch gallery items on component mount
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // Fetch gallery items from API
  async function fetchGalleryItems() {
    try {
      setLoading(true);
      const response = await fetch("/api/gallery");
      
      if (!response.ok) {
        throw new Error("Failed to fetch gallery items");
      }
      
      const data = await response.json();
      setGalleryItems(data);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      toast.error("Failed to load gallery items");
      
      // For development: mock data
      setGalleryItems([
        {
          id_gallery: 1,
          title: "Rafting Adventure",
          description: "Exciting rafting experience through rapids",
          image_url: "/images/gallery/rafting1.jpg",
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id_gallery: 2,
          title: "Group Rafting",
          description: "Team building through white water rafting",
          image_url: "/images/gallery/rafting2.jpg",
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Handle gallery item deletion
  async function handleDelete() {
    if (!deleteId) return;
    
    try {
      const response = await fetch(`/api/gallery/${deleteId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete gallery item");
      }
      
      // Remove deleted gallery item from state
      setGalleryItems(galleryItems.filter(item => item.id_gallery !== deleteId));
      toast.success("Gallery item deleted successfully");
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      toast.error("Failed to delete gallery item");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  }

  // Filter gallery items based on search term
  const filteredItems = galleryItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Gallery</h1>
          <Button onClick={() => router.push("/admin/gallery/new")}>
            <Plus className="mr-2 h-4 w-4" /> Add Photo
          </Button>
        </div>
        
        <div className="flex items-center py-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search gallery..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-muted-foreground">Loading gallery items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <p className="text-lg text-muted-foreground">No gallery items found</p>
            {searchTerm ? (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            ) : (
              <Button onClick={() => router.push("/admin/gallery/new")}>
                Add Your First Photo
              </Button>
            )}
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id_gallery}>
                    <TableCell>
                      <div className="h-12 w-16 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={item.image_url.startsWith('/') ? item.image_url : `/${item.image_url}`} 
                          alt={item.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            console.error("Image failed to load:", item.image_url);
                            
                            // Try to get just the filename and use our API route
                            const parts = item.image_url.split('/');
                            const filename = parts[parts.length - 1];
                            
                            if (filename) {
                              const imagePath = `/api/images/gallery/${filename}`;
                              console.log("Trying fallback path:", imagePath);
                              e.currentTarget.src = imagePath;
                            } else {
                              e.currentTarget.src = "/placeholder.jpg";
                            }
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.is_featured ? "default" : "secondary"}
                      >
                        {item.is_featured ? "Featured" : "Standard"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/gallery/${item.id_gallery}`)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500"
                          onClick={() => {
                            setDeleteId(item.id_gallery);
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
                Are you sure you want to delete this gallery item? This action cannot be undone.
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