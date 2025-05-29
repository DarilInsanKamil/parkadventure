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

// Game type
interface Game {
  id_game: number;
  nama_game: string;
  deskripsi_game: string | null;
  lokasi: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function GamesPage() {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch games on component mount
  useEffect(() => {
    fetchGames();
  }, []);

  // Fetch games from API
  async function fetchGames() {
    try {
      setLoading(true);
      const response = await fetch("/api/games");
      
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
      toast.error("Failed to load games");
    } finally {
      setLoading(false);
    }
  }

  // Handle game deletion
  async function handleDelete() {
    if (!deleteId) return;
    
    try {
      const response = await fetch(`/api/games/${deleteId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete game");
      }
      
      // Remove deleted game from state
      setGames(games.filter(game => game.id_game !== deleteId));
      toast.success("Game deleted successfully");
    } catch (error) {
      console.error("Error deleting game:", error);
      toast.error("Failed to delete game");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  }

  // Filter games based on search term
  const filteredGames = games.filter(game => 
    game.nama_game.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (game.lokasi && game.lokasi.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-4 text-black">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Games</h1>
          <Button onClick={() => router.push("/admin/games/new")}>
            <Plus className="mr-2 h-4 w-4" /> New Game
          </Button>
        </div>
        
        <div className="flex items-center py-4 bg-white">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              placeholder="Search games..."
              className="pl-8 placeholder:text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg">Loading games...</p>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <p className="text-lg text-muted-foreground">No games found</p>
            {searchTerm ? (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            ) : (
              <Button onClick={() => router.push("/admin/games/new")}>
                Add Your First Game
              </Button>
            )}
          </div>
        ) : (
          <div className="border rounded-md">
            <Table className="bg-white dark:text-black">
              <TableHeader className="bg-white dark:bg-orange-950">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((game) => (
                  <TableRow key={game.id_game} className="hover:bg-orange-50">
                    <TableCell className="font-medium">{game.nama_game}</TableCell>
                    <TableCell>{game.lokasi || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={game.is_active ? "default" : "secondary"}
                      >
                        {game.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/games/${game.id_game}`)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500"
                          onClick={() => {
                            setDeleteId(game.id_game);
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
                Are you sure you want to delete this game? This action cannot be undone.
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