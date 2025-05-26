"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Star } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define form type directly without Zod
interface TestimonialFormValues {
  id_testimoni?: number;
  nama_testimoni: string;
  komentar_testimoni: string;
  rating: number;
  is_active: boolean;
}

export function TestimonialEditor({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const isNew = id === "new";

  // Initialize form
  const form = useForm<TestimonialFormValues>({
    defaultValues: {
      nama_testimoni: "",
      komentar_testimoni: "",
      rating: 5,
      is_active: true,
    },
  });

  // Fetch testimonial data if editing existing testimonial
  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    async function fetchTestimonial() {
      try {
        const response = await fetch(`/api/testimonials/${parseInt(id)}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch testimonial");
        }
        
        const data = await response.json();
        
     
        
        // Reset form with fetched data
        form.reset({
          id_testimoni: data.id_testimonial,
          nama_testimoni: data.name,
          komentar_testimoni: data.content,
          rating: data.rating,
          is_active: data.is_featured,
        });
      } catch (error) {
        console.error("Error fetching testimonial:", error);
        toast.error("Failed to load testimonial data");
        router.push("/admin/testimonials");
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonial();
  }, [id, isNew, form, router]);

  

  // Form submission handler
  async function onSubmit(values: TestimonialFormValues) {
    setSubmitting(true);
    
    try {
      // In a real app, you would handle image upload here
      // and add the avatar_url to values
      
      // Determine if we're creating or updating
      const url = isNew ? "/api/testimonials" : `/api/testimonials/${parseInt(id)}`;
      const method = isNew ? "POST" : "PATCH";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isNew ? "create" : "update"} testimonial`);
      }
      
      toast.success(`Testimonial ${isNew ? "created" : "updated"} successfully`);
      router.push("/admin/testimonials");
    } catch (error) {
      console.error(`Error ${isNew ? "creating" : "updating"} testimonial:`, error);
      toast.error(`Failed to ${isNew ? "create" : "update"} testimonial`);
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
            onClick={() => router.push("/admin/testimonials")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isNew ? "Add New Testimonial" : "Edit Testimonial"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isNew ? "Testimonial Information" : "Edit Testimonial Details"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nama_testimoni"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                
                
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <RadioGroup
                          className="flex space-x-4"
                          value={field.value?.toString()}
                          onValueChange={(value) => field.onChange(parseInt(value))}
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <FormItem key={rating} className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value={rating.toString()} />
                              </FormControl>
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
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="komentar_testimoni"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Testimonial</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter customer testimonial"
                          className="min-h-[120px]" 
                          {...field} 
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
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                          Feature this testimonial on the website
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/testimonials")}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isNew ? "Add Testimonial" : "Update Testimonial"}
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