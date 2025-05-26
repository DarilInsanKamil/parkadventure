import { z } from "zod";

// Game validation schema
export const gameSchema = z.object({
  id_game: z.number().optional(),
  nama_game: z.string().min(1, "Name is required"),
  deskripsi_game: z.string().optional().default(""),
  lokasi: z.string().optional().default(""),
  is_active: z.boolean().default(true),
});

export type GameFormValues = z.infer<typeof gameSchema>;

// Package validation schema
export const packageSchema = z.object({
  id_paket: z.number().optional(),
  id_game: z.number().min(1, "Game selection is required"),
  title_paket: z.string().min(1, "Title is required"),
  harga_paket: z.coerce.number().min(0, "Price must be a positive number"),
  image_src: z.string().optional().default(""),
  deskripsi_paket: z.string().optional().default(""),
  package: z.string().optional().default(""),
  min_peserta: z.coerce.number().optional().default(0),
  max_peserta: z.coerce.number().optional().default(0),
  durasi: z.string().optional().default(""),
  is_active: z.boolean().default(true),
});

export type PackageFormValues = z.infer<typeof packageSchema>;

// Package facility validation schema
export const facilitySchema = z.object({
  id_fasilitas: z.number().optional(),
  id_paket: z.number().min(1, "Package is required"),
  nama_fasilitas: z.string().min(1, "Facility name is required"),
});

export type FacilityFormValues = z.infer<typeof facilitySchema>;

// Gallery validation schema
export const gallerySchema = z.object({
  id_galeri: z.number().optional(),
  id_game: z.union([z.number(), z.null()]).default(null),
  nama_photo: z.string().default(""),
  image_src: z.string().min(1, "Image is required"),
  is_active: z.boolean().default(true),
});

export type GalleryFormValues = z.infer<typeof gallerySchema>;

// Hero validation schema
export const heroSchema = z.object({
  id_hero: z.number().optional(),
  title_hero: z.string().min(1, "Title is required"),
  desc_hero: z.string().optional().default(""),
  image_hero: z.string().min(1, "Image is required"),
  urutan: z.coerce.number().default(1),
  is_active: z.boolean().default(true),
});

export type HeroFormValues = z.infer<typeof heroSchema>;

// Testimonial validation schema
export const testimonialSchema = z.object({
  id_testimoni: z.number().optional(),
  nama_testimoni: z.string().min(1, "Name is required"),
  komentar_testimoni: z.string().min(1, "Comment is required"),
  avatar: z.string().optional().default(""),
  rating: z.coerce.number().min(1).max(5).default(5),
  is_active: z.boolean().default(true),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

// Booking validation schema
export const bookingSchema = z.object({
  id_booking: z.number().optional(),
  id_paket: z.number().min(1, "Package is required"),
  nama_pemesan: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional().default(""),
  no_telp: z.string().min(1, "Phone number is required"),
  jumlah_peserta: z.coerce.number().min(1, "Number of participants is required"),
  tanggal_booking: z.date(),
  jam_booking: z.string().optional().default(""),
  catatan: z.string().optional().default(""),
  status: z.string().default("pending"),
  whatsapp_sent: z.boolean().default(false),
  total_harga: z.coerce.number().optional().default(0),
});

export type BookingFormValues = z.infer<typeof bookingSchema>; 