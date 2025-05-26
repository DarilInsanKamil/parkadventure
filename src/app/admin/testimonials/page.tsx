"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react";
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

// Testimonial type
interface Testimonial {
  id_testimonial: number;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  avatar_url: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export default function TestimonialsPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Fetch testimonials from API
  async function fetchTestimonials() {
    try {
      setLoading(true);
      const response = await fetch("/api/testimonials");
      
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Failed to load testimonials");
      
      // For development: mock data
      setTestimonials([
        {
          id_testimonial: 1,
          name: "John Smith",
          role: "Adventure Enthusiast",
          content: "The rafting experience was amazing! The guides were professional and made sure everyone was safe while having fun.",
          rating: 5,
          avatar_url: "/images/testimonials/avatar1.jpg",
          is_featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id_testimonial: 2,
          name: "Sarah Johnson",
          role: "First-time Rafter",
          content: "As a beginner, I was nervous about rafting, but the team made me feel comfortable. It was an unforgettable experience!",
          rating: 4,
          avatar_url: "/images/testimonials/avatar2.jpg",
          is_featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Handle testimonial deletion
  async function handleDelete() {
    if (!deleteId) return;
    
    try {
      const response = await fetch(`/api/testimonials/${deleteId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete testimonial");
      }
      
      // Remove deleted testimonial from state
      setTestimonials(testimonials.filter(testimonial => testimonial.id_testimonial !== deleteId));
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  }

  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter(testimonial => 
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (testimonial.role && testimonial.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
    testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
          <Button onClick={() => router.push("/admin/testimonials/new")}>
            <Plus className="mr-2 h-4 w-4" /> New Testimonial
          </Button>
        </div>
        
        <div className="flex items-center py-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search testimonials..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-muted-foreground">Loading testimonials...</p>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <p className="text-lg text-muted-foreground">No testimonials found</p>
            {searchTerm ? (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            ) : (
              <Button onClick={() => router.push("/admin/testimonials/new")}>
                Add Your First Testimonial
              </Button>
            )}
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonials.map((testimonial) => (
                  <TableRow key={testimonial.id_testimonial}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {testimonial.avatar_url ? (
                          <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                            <img
                              src={testimonial.avatar_url}
                              alt={testimonial.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                        <span className="font-medium">{testimonial.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{testimonial.role || "-"}</TableCell>
                    <TableCell>{renderRating(testimonial.rating)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={testimonial.is_featured ? "default" : "secondary"}
                      >
                        {testimonial.is_featured ? "Featured" : "Standard"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/testimonials/${testimonial.id_testimonial}`)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500"
                          onClick={() => {
                            setDeleteId(testimonial.id_testimonial);
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
                Are you sure you want to delete this testimonial? This action cannot be undone.
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