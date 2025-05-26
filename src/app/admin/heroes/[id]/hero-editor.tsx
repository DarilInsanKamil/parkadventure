"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, Loader2, ImagePlus } from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define form type directly without Zod
interface HeroFormValues {
  id?: number;
  title_hero: string;
  desc_hero: string;
  image_hero: string;
  urutan: number;
  is_active: boolean;
}

export function HeroEditor({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const isNew = id === "new";

  // Initialize form without Zod resolver
  const form = useForm<HeroFormValues>({
    defaultValues: {
      title_hero: "",
      desc_hero: "",
      image_hero: "",
      urutan: 0,
      is_active: true,
    },
  });

  // Fetch hero data if editing existing hero
  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    async function fetchHero() {
      try {
        const response = await fetch(`/api/heroes/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch hero");
        }
        
        const data = await response.json();
        
        // Set image preview if exists
        if (data.image_hero) {
          setImagePreview(data.image_hero);
        }
        
        // Reset form with fetched data
        form.reset({
          id: data.id,
          title_hero: data.title_hero || "",
          desc_hero: data.desc_hero || "",
          image_hero: data.image_hero || "",
          urutan: data.urutan || 0,
          is_active: data.is_active,
        });
      } catch (error) {
        console.error("Error fetching hero:", error);
        toast.error("Failed to load hero data");
        router.push("/admin/heroes");
      } finally {
        setLoading(false);
      }
    }

    fetchHero();
  }, [id, isNew, form, router]);

  // Form submission handler
  async function onSubmit(values: HeroFormValues) {
    setSubmitting(true);
    
    try {
      // Basic validation
      if (!values.title_hero) {
        toast.error("Hero title is required");
        setSubmitting(false);
        return;
      }

      // Determine if we're creating or updating
      const url = isNew ? "/api/heroes" : `/api/heroes/${id}`;
      const method = isNew ? "POST" : "PATCH";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isNew ? "create" : "update"} hero`);
      }
      
      toast.success(`Hero ${isNew ? "created" : "updated"} successfully`);
      router.push("/admin/heroes");
    } catch (error) {
      console.error(`Error ${isNew ? "creating" : "updating"} hero:`, error);
      toast.error(`Failed to ${isNew ? "create" : "update"} hero`);
    } finally {
      setSubmitting(false);
    }
  }

  // Handle image upload
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create a temporary preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    
    try {
      // Create form data for upload
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      
      // Set the uploaded image URL in the form
      form.setValue('image_hero', data.url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      // Reset preview on error
      setImagePreview(null);
    }
  }

  // Get initials for avatar
  function getInitials(title: string): string {
    if (!title) return 'H';
    return title
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
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
            onClick={() => router.push("/admin/heroes")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isNew ? "Add New Hero" : "Edit Hero"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isNew ? "Hero Information" : "Edit Hero Details"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                  {/* Image Upload Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage 
                        src={imagePreview || undefined} 
                        alt={form.watch('title_hero')} 
                      />
                      <AvatarFallback className="text-2xl">
                        {getInitials(form.watch('title_hero'))}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="w-full">
                      <Label htmlFor="image-upload">Hero Image</Label>
                      <div className="mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          <ImagePlus className="mr-2 h-4 w-4" />
                          {imagePreview ? "Change Image" : "Upload Image"}
                        </Button>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Upload a profile image for this hero.
                      </p>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="is_active"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 w-full">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Active</FormLabel>
                            <FormDescription>
                              Make this hero visible on the website
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Hero Details Section */}
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title_hero"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter hero title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="urutan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Order</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Display order (lower numbers appear first)" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              value={field.value}
                            />
                          </FormControl>
                          <FormDescription>
                            Order in which this hero appears (lower numbers appear first)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="desc_hero"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Hero description"
                              className="min-h-[150px]" 
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide details about this hero
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/heroes")}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isNew ? "Create Hero" : "Update Hero"}
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