"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
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

// Define form type
interface FacilityFormValues {
  id_fasilitas?: number;
  id_paket: number;
  nama_fasilitas: string;
}

interface Package {
  id_package: number;
  name: string;
}

export function FacilityEditor({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const isNew = id === "new";

  // Initialize form
  const form = useForm<FacilityFormValues>({
    defaultValues: {
      id_paket: 0,
      nama_fasilitas: "",
    },
  });

  // Fetch packages for dropdown
  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch("/api/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
        toast.error("Failed to load packages");
      }
    }

    fetchPackages();
  }, []);

  // Fetch facility data if editing existing facility
  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    async function fetchFacility() {
      try {
        const response = await fetch(`/api/facilities/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch facility");
        }
        
        const data = await response.json();
        
        // Reset form with fetched data
        form.reset({
          id_fasilitas: data.id_fasilitas,
          id_paket: data.id_paket,
          nama_fasilitas: data.nama_fasilitas || "",
        });
      } catch (error) {
        console.error("Error fetching facility:", error);
        toast.error("Failed to load facility data");
        router.push("/admin/facilities");
      } finally {
        setLoading(false);
      }
    }

    fetchFacility();
  }, [id, isNew, form, router]);

  // Form submission handler
  async function onSubmit(values: FacilityFormValues) {
    setSubmitting(true);
    
    try {
      // Basic validation
      if (!values.nama_fasilitas.trim()) {
        toast.error("Facility name is required");
        setSubmitting(false);
        return;
      }

      if (!values.id_paket) {
        toast.error("Please select a package");
        setSubmitting(false);
        return;
      }

      // Determine if we're creating or updating
      const url = isNew ? "/api/facilities" : `/api/facilities/${id}`;
      const method = isNew ? "POST" : "PATCH";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isNew ? "create" : "update"} facility`);
      }
      
      toast.success(`Facility ${isNew ? "created" : "updated"} successfully`);
      // router.push("/admin/facilities");
    } catch (error) {
      console.error(`Error ${isNew ? "creating" : "updating"} facility:`, error);
      toast.error(`Failed to ${isNew ? "create" : "update"} facility`);
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
            onClick={() => router.push("/admin/facilities")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isNew ? "Add New Facility" : "Edit Facility"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isNew ? "Facility Information" : "Edit Facility Details"}
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
                  name="id_paket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value ? field.value.toString() : undefined}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a package" />
                          </SelectTrigger>
                          <SelectContent>
                            {packages.map((pkg) => (
                              <SelectItem key={pkg.id_package} value={pkg.id_package.toString()}>
                                {pkg.name}
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
                  name="nama_fasilitas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facility Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter facility name" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/facilities")}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isNew ? "Create Facility" : "Update Facility"}
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