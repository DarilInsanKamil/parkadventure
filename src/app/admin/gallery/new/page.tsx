"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
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
import { Select } from "@/components/ui/select";

// Define form type directly without Zod
interface GalleryFormValues {
  id_galeri?: number;
  nama_photo: string;
  image_src: string;
  is_active: boolean;
  id_game?: number | null;
}

interface Game {
  id_game: number;
  nama_game: string;
  deskripsi_game: string;
  lokasi: string;
  is_active: boolean;
}

export default function Page() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [dataGame, setDataGame] = useState<Game[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Initialize form without Zod resolver
  const form = useForm<GalleryFormValues>({
    defaultValues: {
      nama_photo: "",
      image_src: "",
      is_active: true,
    },
  });

  useEffect(() => {
    const getGameData = async () => {
      const res = await fetch("http://localhost:3000/api/games");
      const data = await res.json();
      setDataGame(data);
    };
    getGameData();
  }, []);

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
        formData.append("file", file);
        formData.append("folder", "gallery");

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const { path } = await uploadResponse.json();
        // Make sure the path is absolute from the root
        const absolutePath = path.startsWith("/") ? path : `/${path}`;
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

      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create gallery item");
      }

      toast.success("Gallery item created successfully");
      router.push("/admin/gallery");
    } catch (error) {
      console.error("Error creating gallery item:", error);
      toast.error("Failed to create gallery item");
    } finally {
      setSubmitting(false);
    }
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
            Add New Gallery Item
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gallery Item Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="id_game"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        {/* <Input placeholder="Enter photo title" {...field} value={field.value || ""} /> */}
                        <select className="p-2 border rounded-md">
                          {dataGame.map((res, idx) => (
                            <option key={idx} value={res.id_game}>
                              {res.nama_game}
                            </option>
                          ))}
                        </select>
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
                  name="nama_photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter photo title"
                          {...field}
                          value={field.value || ""}
                        />
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
                            placeholder="Image URL (will be set automatically when you upload)"
                            className="hidden"
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
                                  if (
                                    typeof previewImage === "string" &&
                                    previewImage.includes("/")
                                  ) {
                                    const parts = previewImage.split("/");
                                    const filename = parts[parts.length - 1];

                                    if (filename) {
                                      const imagePath = `/api/images/gallery/${filename}`;
                                      console.log(
                                        "Trying fallback path:",
                                        imagePath
                                      );
                                      e.currentTarget.src = imagePath;
                                      return;
                                    }
                                  }

                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                              />
                            </div>
                          )}
                          {!previewImage && field.value && (
                            <div className="flex items-center justify-center border rounded-md w-full h-40 bg-gray-50">
                              <Upload className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload an image for the gallery
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
                          Feature this image on the website
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
                    {submitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Add to Gallery
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
