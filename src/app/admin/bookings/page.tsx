"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Search, Calendar } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Booking type
interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  people_count: number;
  special_requests?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function Page() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch bookings on component mount and when status filter changes
  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  // Fetch bookings from API
  async function fetchBookings() {
    try {
      setLoading(true);
      const url = statusFilter && statusFilter !== "all"
        ? `/api/bookings?status=${statusFilter}`
        : "/api/bookings";
        
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  // Handle booking deletion
  async function handleDelete() {
    if (!deleteId) return;
    
    try {
      const response = await fetch(`/api/bookings/${deleteId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }
      
      // Remove deleted booking from state
      setBookings(bookings.filter(booking => booking.id !== deleteId));
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  }

  // Get status badge variant
  function getStatusBadge(status: string) {
    switch (status.toLowerCase()) {
      case "confirmed":
        return { variant: "default" as const, label: "Confirmed" };
      case "completed":
        return { variant: "secondary" as const, label: "Completed" };
      case "cancelled":
        return { variant: "destructive" as const, label: "Cancelled" };
      case "pending":
      default:
        return { variant: "secondary" as const, label: "Pending" };
    }
  }

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(booking => 
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.phone.includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <div className="space-y-4 text-black">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <Button onClick={() => router.push("/admin/bookings/new")}>
            <Plus className="mr-2 h-4 w-4" /> New Booking
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center py-4">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              placeholder="Search bookings..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <p className="text-lg">No bookings found</p>
            {searchTerm || statusFilter ? (
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}>
                Clear Filters
              </Button>
            ) : (
              <Button onClick={() => router.push("/admin/bookings/new")}>
                Add Your First Booking
              </Button>
            )}
          </div>
        ) : (
          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>People</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{booking.email}</span>
                        <span className="text-sm text-muted-foreground">{booking.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{format(new Date(booking.date), "MMM d, yyyy")}</span>
                        <span className="text-sm text-muted-foreground">{booking.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>{booking.people_count}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadge(booking.status).variant}
                      >
                        {getStatusBadge(booking.status).label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/bookings/${booking.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500"
                          onClick={() => {
                            setDeleteId(booking.id);
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
                Are you sure you want to delete this booking? This action cannot be undone.
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