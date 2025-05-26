"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define form type directly without Zod
interface GameFormValues {
  id_game?: number;
  nama_game: string;
  deskripsi_game: string;
  lokasi: string;
  is_active: boolean;
}

export function GameEditor({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const isNew = id === "new";

  // Initialize form without Zod resolver
  const form = useForm<GameFormValues>({
    defaultValues: {
      nama_game: "",
      deskripsi_game: "",
      lokasi: "",
      is_active: true,
    },
  });

  // Fetch game data if editing existing game
  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    async function fetchGame() {
      try {
        const response = await fetch(`/api/games/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch game");
        }
        
        const data = await response.json();
        
        // Reset form with fetched data
        form.reset({
          id_game: data.id_game,
          nama_game: data.nama_game || "",
          deskripsi_game: data.deskripsi_game || "",
          lokasi: data.lokasi || "",
          is_active: data.is_active,
        });
      } catch (error) {
        console.error("Error fetching game:", error);
        toast.error("Failed to load game data");
        router.push("/admin/games");
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [id, isNew, form, router]);

  // Form submission handler
  async function onSubmit(values: GameFormValues) {
    setSubmitting(true);
    
    try {
      // Basic validation
      if (!values.nama_game) {
        toast.error("Game name is required");
        setSubmitting(false);
        return;
      }

      // Determine if we're creating or updating
      const url = isNew ? "/api/games" : `/api/games/${id}`;
      const method = isNew ? "POST" : "PATCH";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isNew ? "create" : "update"} game`);
      }
      
      toast.success(`Game ${isNew ? "created" : "updated"} successfully`);
      router.push("/admin/games");
    } catch (error) {
      console.error(`Error ${isNew ? "creating" : "updating"} game:`, error);
      toast.error(`Failed to ${isNew ? "create" : "update"} game`);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/games")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isNew ? "Add New Game" : "Edit Game"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isNew ? "Game Information" : "Edit Game Details"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nama_game"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter game name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lokasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Game location" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>
                        Where this game takes place
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deskripsi_game"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Game description"
                          className="min-h-[120px]" 
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active</FormLabel>
                        <FormDescription>
                          Make this game visible on the website
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/games")}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isNew ? "Create Game" : "Update Game"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 