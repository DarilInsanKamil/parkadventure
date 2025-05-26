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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Define form type directly without Zod
interface BookingFormValues {
  id_booking?: number;
  id_paket: number;
  nama_pemesan: string;
  email: string;
  no_telp: string;
  jumlah_peserta: number;
  tanggal_booking: Date;
  jam_booking: string;
  catatan: string;
  status: string;
  whatsapp_sent: boolean;
  total_harga: number;
  package_name?: string; // For display only, not in DB
}

// Status options
const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
];

export function BookingEditor({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [packages, setPackages] = useState<{ id_paket: number; title_paket: string; harga_paket: number }[]>([]);
  const isNew = id === "new";

  // Initialize form without Zod resolver
  const form = useForm<BookingFormValues>({
    defaultValues: {
      id_paket: 0,
      nama_pemesan: "",
      email: "",
      no_telp: "",
      jumlah_peserta: 1,
      tanggal_booking: new Date(),
      jam_booking: "09:00",
      catatan: "",
      status: "pending",
      whatsapp_sent: false,
      total_harga: 0,
    },
  });

  // Fetch packages for the dropdown
  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch("/api/packages?is_active=true");
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

  // Fetch booking data if editing existing booking
  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    async function fetchBooking() {
      try {
        const response = await fetch(`/api/bookings/${id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch booking");
        }
        
        const data = await response.json();
        
        // Reset form with fetched data
        form.reset({
          id_booking: data.id_booking,
          id_paket: data.id_paket,
          nama_pemesan: data.nama_pemesan || "",
          email: data.email || "",
          no_telp: data.no_telp || "",
          jumlah_peserta: data.jumlah_peserta || 1,
          tanggal_booking: data.tanggal_booking ? new Date(data.tanggal_booking) : new Date(),
          jam_booking: data.jam_booking || "09:00",
          catatan: data.catatan || "",
          status: data.status || "pending",
          whatsapp_sent: data.whatsapp_sent || false,
          total_harga: data.total_harga || 0,
          package_name: data.package_name, // If API returns related package name
        });
      } catch (error) {
        console.error("Error fetching booking:", error);
        toast.error("Failed to load booking data");
        router.push("/admin/bookings");
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [id, isNew, form, router]);

  // Update total price when package or number of participants changes
  useEffect(() => {
    const packageId = form.watch('id_paket');
    const participants = form.watch('jumlah_peserta');
    
    if (packageId && participants) {
      const selectedPackage = packages.find(pkg => pkg.id_paket === packageId);
      if (selectedPackage) {
        const totalPrice = selectedPackage.harga_paket * participants;
        form.setValue('total_harga', totalPrice);
      }
    }
  }, [form.watch('id_paket'), form.watch('jumlah_peserta'), packages, form]);

  // Form submission handler
  async function onSubmit(values: BookingFormValues) {
    setSubmitting(true);
    
    try {
      // Basic validation
      if (!values.nama_pemesan) {
        toast.error("Customer name is required");
        setSubmitting(false);
        return;
      }

      if (!values.id_paket) {
        toast.error("Please select a package");
        setSubmitting(false);
        return;
      }

      // Format date and time for API
      const formattedValues = {
        ...values,
        tanggal_booking: values.tanggal_booking.toISOString().split('T')[0], // YYYY-MM-DD
      };

      // Determine if we're creating or updating
      const url = isNew ? "/api/bookings" : `/api/bookings/${id}`;
      const method = isNew ? "POST" : "PATCH";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isNew ? "create" : "update"} booking`);
      }
      
      toast.success(`Booking ${isNew ? "created" : "updated"} successfully`);
      router.push("/admin/bookings");
    } catch (error) {
      console.error(`Error ${isNew ? "creating" : "updating"} booking:`, error);
      toast.error(`Failed to ${isNew ? "create" : "update"} booking`);
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
            onClick={() => router.push("/admin/bookings")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {isNew ? "Create New Booking" : "Edit Booking"}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isNew ? "Booking Information" : "Edit Booking Details"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Package Selection */}
                  <FormField
                    control={form.control}
                    name="id_paket"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value ? field.value.toString() : undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a package" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {packages.map((pkg) => (
                              <SelectItem key={pkg.id_paket} value={pkg.id_paket.toString()}>
                                {pkg.title_paket} - Rp{pkg.harga_paket.toLocaleString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Customer Name */}
                  <FormField
                    control={form.control}
                    name="nama_pemesan"
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

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="customer@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone Number */}
                  <FormField
                    control={form.control}
                    name="no_telp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 08123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Number of Participants */}
                  <FormField
                    control={form.control}
                    name="jumlah_peserta"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Participants</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={1}
                            placeholder="Number of people" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Booking Date */}
                  <FormField
                    control={form.control}
                    name="tanggal_booking"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Booking Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Booking Time */}
                  <FormField
                    control={form.control}
                    name="jam_booking"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Total Price */}
                  <FormField
                    control={form.control}
                    name="total_harga"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Price (Rp)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="Total price"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            value={field.value}
                          />
                        </FormControl>
                        <FormDescription>
                          Auto-calculated based on package price and number of participants
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* WhatsApp Sent */}
                  <FormField
                    control={form.control}
                    name="whatsapp_sent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>WhatsApp Notification Sent</FormLabel>
                          <FormDescription>
                            Whether a WhatsApp notification has been sent to the customer
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="catatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Additional notes or requests"
                          className="min-h-[100px]" 
                          {...field}
                          value={field.value || ""}
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
                    onClick={() => router.push("/admin/bookings")}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isNew ? "Create Booking" : "Update Booking"}
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