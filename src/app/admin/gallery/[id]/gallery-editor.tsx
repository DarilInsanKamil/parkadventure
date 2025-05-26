"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
interface GalleryFormValues {
  id_galeri?: number;
  nama_photo: string;
  image_src: string;
  is_active: boolean;
  id_game?: number | null;
}

export function GalleryEditor({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const isNew = id === "new";

  // Initialize form without Zod resolver
  const form = useForm<GalleryFormValues>({
    defaultValues: {
      nama_photo: "",
      image_src: "",
      is_active: true,
      id_game: null
    },
  });

  // Fetch gallery item data if editing existing item
  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    async function fetchGalleryItem() {
      try {
        const response = await fetch(`/api/gallery/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch gallery item");
        }
        
        const data = await response.json();
        
        // Reset form with fetched data
        form.reset({
          id_galeri: data.id_gallery,
          nama_photo: data.title || "",
          image_src: data.image_url,
          is_active: data.is_featured,
        });

        // Set the preview image
        setPreviewImage(data.image_url);
      } catch (error) {
        console.error("Error fetching gallery item:", error);
        toast.error("Failed to load gallery item data");
        router.push("/admin/gallery");
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryItem();
  }, [id, isNew, form, router]);

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Display preview
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPreviewImage(result);
        };
        reader.readAsDataURL(file);
        
        // Upload the file
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'gallery');
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
        
        const { path } = await uploadResponse.json();
        // Make sure the path is absolute from the root
        const absolutePath = path.startsWith('/') ? path : `/${path}`;
        form.setValue("image_src", absolutePath);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
      }
    }
  };

  // Form submission handler
  async function onSubmit(values: GalleryFormValues) {
    setSubmitting(true);
    
    try {
      // Basic validation
      if (!values.nama_photo || !values.image_src) {
        toast.error("Please fill all required fields");
        setSubmitting(false);
        return;
      }
      
      // Determine if we're creating or updating
      const url = isNew ? "/api/gallery" : `/api/gallery/${id}`;
      const method = isNew ? "POST" : "PATCH";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isNew ? "create" : "update"} gallery item`);
      }
      
      toast.success(`Gallery item ${isNew ? "created" : "updated"} successfully`);
      router.push("/admin/gallery");
    } catch (error) {
      console.error(`Error ${isNew ? "creating" : "updating"} gallery item:`, error);
      toast.error(`Failed to ${isNew ? "create" : "update"} gallery item`);
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
            onClick={() => router.push("/admin/gallery")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isNew ? "Add New Gallery Item" : "Edit Gallery Item"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isNew ? "Gallery Item Information" : "Edit Gallery Item Details"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nama_photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter photo title" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormDescription>
                        A descriptive title for the gallery item
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image_src"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="cursor-pointer"
                          />
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="Image URL"
                          />
                          {previewImage && (
                            <div className="mt-4 border rounded-md overflow-hidden w-full max-w-md">
                              <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full h-auto object-cover"
                                onError={(e) => {
                                  console.error("Image failed to load:", e);
                                  
                                  // Try using our API endpoint if it's a file path
                                  if (typeof previewImage === 'string' && previewImage.includes('/')) {
                                    const parts = previewImage.split('/');
                                    const filename = parts[parts.length - 1];
                                    
                                    if (filename) {
                                      const imagePath = `/api/images/gallery/${filename}`;
                                      console.log("Trying fallback path:", imagePath);
                                      e.currentTarget.src = imagePath;
                                      return;
                                    }
                                  }
                                  
                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        {isNew ? "Upload a new image" : "Upload a new image or keep the existing one"}
                      </FormDescription>
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
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                          Feature this image prominently on the website
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/gallery")}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isNew ? "Add to Gallery" : "Update Gallery Item"}
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