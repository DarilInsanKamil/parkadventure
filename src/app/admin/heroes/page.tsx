"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Hero type
interface Hero {
  id: number;
  title_hero: string;
  desc_hero: string | null;
  image_hero: string | null;
  urutan: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function Page() {
  const router = useRouter();
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch heroes on component mount and when status filter changes
  useEffect(() => {
    fetchHeroes();
  }, [statusFilter]);

  // Fetch heroes from API
  async function fetchHeroes() {
    try {
      setLoading(true);
      const url = statusFilter && statusFilter !== "all"
        ? `/api/heroes?active=${statusFilter}`
        : "/api/heroes";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch heroes");
      }

      const data = await response.json();
      setHeroes(data);
    } catch (error) {
      console.error("Error fetching heroes:", error);
      toast.error("Failed to load heroes");
    } finally {
      setLoading(false);
    }
  }

  // Handle hero deletion
  async function handleDelete() {
    if (!deleteId) return;

    try {
      const response = await fetch(`/api/heroes/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete hero");
      }

      // Remove deleted hero from state
      setHeroes(heroes.filter(hero => hero.id !== deleteId));
      toast.success("Hero deleted successfully");
    } catch (error) {
      console.error("Error deleting hero:", error);
      toast.error("Failed to delete hero");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  }

  // Filter heroes based on search term
  const filteredHeroes = heroes.filter(hero =>
    hero.title_hero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (hero.desc_hero && hero.desc_hero.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get initials for avatar
  function getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Heroes</h1>
          <Button onClick={() => router.push("/admin/heroes/new")}>
            <Plus className="mr-2 h-4 w-4" /> New Hero
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center py-4">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search heroes..."
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
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-muted-foreground">Loading heroes...</p>
          </div>
        ) : filteredHeroes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <p className="text-lg text-muted-foreground">No heroes found</p>
            {searchTerm || statusFilter ? (
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}>
                Clear Filters
              </Button>
            ) : (
              <Button onClick={() => router.push("/admin/heroes/new")}>
                Add Your First Hero
              </Button>
            )}
          </div>
        ) : (
          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hero</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHeroes.map((hero, idx: number) => (
                  <TableRow key={idx}>  
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={hero.image_hero || undefined} alt={hero.title_hero} />
                          <AvatarFallback>{getInitials(hero.title_hero)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{hero.title_hero}</span>
                      </div>
                    </TableCell>
                    <TableCell>{hero.title_hero}</TableCell>
                    <TableCell>
                      <Badge
                        variant={hero.is_active ? "default" : "secondary"}
                      >
                        {hero.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/heroes/${hero.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500"
                          onClick={() => {
                            setDeleteId(hero.id);
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
                Are you sure you want to delete this hero? This action cannot be undone.
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