"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Plus, Upload, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define facility interface
interface Facility {
  id_fasilitas?: number;
  nama_fasilitas: string;
  isNew?: boolean;
  isDeleted?: boolean;
}

interface Game {
  id_game: number;
  nama_game: string;
  deskripsi_game: string;
  lokasi: string;
  is_active: boolean;
}

// Define form type directly without Zod
interface PackageFormValues {
  id_paket?: number;
  id_game: number;
  title_paket: string;
  harga_paket: number;
  image_src: string;
  deskripsi_paket: string;
  package: string;
  min_peserta: number;
  max_peserta: number;
  durasi: string;
  is_active: boolean;
}

export function PackageEditor({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [newFacility, setNewFacility] = useState("");
  const isNew = id === "new";
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Initialize form
  const form = useForm<PackageFormValues>({
    defaultValues: {
      id_game: 0,
      title_paket: "",
      harga_paket: 0,
      image_src: "",
      deskripsi_paket: "",
      durasi: "",
      min_peserta: 1,
      max_peserta: 10,
      is_active: true,
    },
  });

  // Fetch package data if editing existing package
  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    async function fetchPackage() {
      try {
        const response = await fetch(`/api/packages/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch package");
        }

        const data = await response.json();

        // Reset form with fetched data
        form.reset({
          id_paket: data.id_package,
          id_game: data.id_game || 1,
          title_paket: data.name,
          harga_paket: data.price,
          image_src: data.image_src || "",
          deskripsi_paket: data.description || "",
          durasi: data.duration || "",
          min_peserta: data.min_participants || 1,
          max_peserta: data.max_participants || 10,
          is_active: data.is_active,
        });

        // Set preview image if available
        if (data.image_src) {
          setPreviewImage(data.image_src);
        }

        // Fetch facilities for this package
        fetchFacilities();
      } catch (error) {
        console.error("Error fetching package:", error);
        toast.error("Failed to load package data");
        router.push("/admin/packages");
      } finally {
        setLoading(false);
      }
    }

    fetchPackage();
  }, [id, isNew, form, router]);

  // Fetch facilities for an existing package
  async function fetchFacilities() {
    try {
      const response = await fetch(`/api/packages/${id}/facilities`);

      if (!response.ok) {
        throw new Error("Failed to fetch facilities");
      }

      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      toast.error("Failed to load package facilities");
    }
  }

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch(`/api/games/`);

        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }

        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
        toast.error("Failed to load games");
      }
    }
    fetchGames();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // Display preview immediately for better UX
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Prepare form data for upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "packages"); // Use packages folder instead of gallery

      // Upload the file
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        console.error("Upload error:", errorData);
        throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
      }

      const { path } = await uploadResponse.json();
      if (!path) {
        throw new Error("No path returned from upload");
      }

      // Make sure the path is properly formatted
      const absolutePath = path.startsWith("/") ? path : `/${path}`;
      form.setValue("image_src", absolutePath);
      toast.success("Image uploaded successfully");
      
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // // Add a new facility
  // function handleAddFacility() {
  //   if (!newFacility.trim()) {
  //     toast.error("Facility name cannot be empty");
  //     return;
  //   }

  //   setFacilities([
  //     ...facilities,
  //     {
  //       nama_fasilitas: newFacility.trim(),
  //       isNew: true,
  //     },
  //   ]);

  //   setNewFacility("");
  // }

  // // Remove a facility
  // function handleRemoveFacility(index: number) {
  //   const updatedFacilities = [...facilities];

  //   // If it's an existing facility, mark it for deletion instead of removing it
  //   if (
  //     !updatedFacilities[index].isNew &&
  //     updatedFacilities[index].id_fasilitas
  //   ) {
  //     updatedFacilities[index].isDeleted = true;
  //   } else {
  //     // If it's a new facility, just remove it from the array
  //     updatedFacilities.splice(index, 1);
  //   }

  //   setFacilities(updatedFacilities);
  // }

  // Form submission handler
  async function onSubmit(values: PackageFormValues) {
    setSubmitting(true);

    try {
      // Basic validation
      if (!values.title_paket) {
        toast.error("Package title is required");
        setSubmitting(false);
        return;
      }

      if (!values.id_game) {
        toast.error("Please select a game");
        setSubmitting(false);
        return;
      }

      // Determine if we're creating or updating
      const url = isNew ? "/api/packages" : `/api/packages/${id}`;
      const method = isNew ? "POST" : "PATCH";

      // Save package data first
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isNew ? "create" : "update"} package`);
      }

      const packageData = await response.json();
      const packageId = isNew ? packageData.id : id;

      // // Then save facilities for the package
      // if (!isNew) {
      //   // Handle existing facilities that need to be deleted
      //   const facilitiesToDelete = facilities.filter(
      //     (f) => f.isDeleted && f.id_fasilitas
      //   );
      //   for (const facility of facilitiesToDelete) {
      //     await fetch(`/api/facilities/${facility.id_fasilitas}`, {
      //       method: "DELETE",
      //     });
      //   }
      // }

      // Add new facilities
      // const newFacilities = facilities.filter((f) => f.isNew && !f.isDeleted);
      // for (const facility of newFacilities) {
      //   await fetch(`/api/facilities`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       id_paket: packageId,
      //       nama_fasilitas: facility.nama_fasilitas,
      //     }),
      //   });
      // }

      toast.success(`Package ${isNew ? "created" : "updated"} successfully`);
      router.push("/admin/packages");
    } catch (error) {
      console.error(`Error ${isNew ? "creating" : "updating"} package:`, error);
      toast.error(`Failed to ${isNew ? "create" : "update"} package`);
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
            onClick={() => router.push("/admin/packages")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isNew ? "Add New Package" : "Edit Package"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isNew ? "Package Information" : "Edit Package Details"}
            </CardTitle>
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
                      <FormLabel>Game</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value ? field.value.toString() : undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a game" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {games.map((game) => (
                              <SelectItem key={game.id_game} value={game.id_game.toString()}>
                                {game.nama_game}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title_paket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter package name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="harga_paket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>Price in IDR</FormDescription>
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
                          <div className="flex flex-col space-y-2">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="cursor-pointer"
                              disabled={uploading}
                            />
                            {uploading && (
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                              </div>
                            )}
                          </div>
                          
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="Image URL (set automatically when you upload)"
                            className="hidden"
                          />
                          
                          {previewImage && (
                            <div className="mt-4 border rounded-md overflow-hidden w-full max-w-md">
                              <img
                                src={previewImage.startsWith('data:') 
                                  ? previewImage 
                                  : `${previewImage}?v=${new Date().getTime()}`}
                                alt="Preview"
                                className="w-full h-auto max-h-[300px] object-contain"
                                onError={(e) => {
                                  console.error("Image failed to load:", previewImage);
                                  
                                  // If it's a data URL, don't try fallback paths
                                  if (previewImage.startsWith('data:')) {
                                    return;
                                  }
                                  
                                  // Try absolute URL
                                  if (previewImage.startsWith('/')) {
                                    const absoluteUrl = `${window.location.origin}${previewImage}`;
                                    console.log("Trying absolute URL:", absoluteUrl);
                                    e.currentTarget.src = absoluteUrl;
                                    return;
                                  }
                                  
                                  // Try API endpoint
                                  const filename = previewImage.split('/').pop();
                                  if (filename) {
                                    const apiPath = `/api/images/packages/${filename}`;
                                    console.log("Trying API path:", apiPath);
                                    e.currentTarget.src = apiPath;
                                    return;
                                  }
                                  
                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                              />
                            </div>
                          )}
                          
                          {!previewImage && field.value && (
                            <div className="mt-4 border rounded-md overflow-hidden w-full max-w-md">
                              <img
                                src={`${field.value}?v=${new Date().getTime()}`}
                                alt="Package image"
                                className="w-full h-auto max-h-[300px] object-contain"
                                onError={(e) => {
                                  // Fallback handling for stored image path
                                  const filename = field.value.split('/').pop();
                                  if (filename) {
                                    e.currentTarget.src = `/api/images/packages/${filename}`;
                                  } else {
                                    e.currentTarget.src = "/placeholder.jpg";
                                  }
                                }}
                              />
                            </div>
                          )}
                          
                          {!previewImage && !field.value && (
                            <div className="flex items-center justify-center border rounded-md w-full h-40 bg-gray-50">
                              <Upload className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload an image for the package
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="durasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 2 hours"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        How long the rafting experience lasts
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="min_peserta"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Participants</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? ""
                                  : parseInt(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="max_peserta"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Participants</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? ""
                                  : parseInt(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="deskripsi_paket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Package description"
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
                          Make this package available for booking
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Package Facilities Section */}
                {/* <div className="space-y-4">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium">Package Facilities</h3>
                    <p className="text-sm text-muted-foreground">
                      Add facilities or amenities included in this package
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new facility..."
                      value={newFacility}
                      onChange={(e) => setNewFacility(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" onClick={handleAddFacility} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>

                  <div className="border rounded-md p-4">
                    {facilities.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No facilities added yet
                      </p>
                    ) : (
                      <ScrollArea className="h-[200px] w-full pr-4">
                        <div className="space-y-2">
                          {facilities
                            .filter((f) => !f.isDeleted)
                            .map((facility, index) => (
                              <div
                                key={facility.id_fasilitas || `new-${index}`}
                                className="flex items-center justify-between bg-muted/50 p-2 rounded-md"
                              >
                                <div className="flex items-center gap-2">
                                  {facility.isNew && (
                                    <Badge
                                      variant="outline"
                                      className="bg-green-50 text-green-700 border-green-200"
                                    >
                                      New
                                    </Badge>
                                  )}
                                  <span>{facility.nama_fasilitas}</span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveFacility(index)}
                                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </div>
                            ))}
                        </div>
                      </ScrollArea>
                    )}
                  </div>
                </div> */}

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/packages")}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting || uploading}>
                    {(submitting || uploading) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isNew ? "Create Package" : "Update Package"}
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
