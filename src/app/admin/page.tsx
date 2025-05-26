"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mountain,
  Package,
  CalendarDays,
  Users,
  Image,
  Heart,
} from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    games: 0,
    packages: 0,
    bookings: 0,
    pendingBookings: 0,
    galleryItems: 0,
    testimonials: 0,
  });

  useEffect(() => {
    // Fetch stats when the component mounts
    async function fetchStats() {
      try {
        // You would fetch these values from your API in a real app
        // For demo purposes, using dummy values
        setStats({
          games: 5,
          packages: 12,
          bookings: 24,
          pendingBookings: 6,
          galleryItems: 18,
          testimonials: 9,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }

    fetchStats();
  }, []);

  if (status === "loading") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {session?.user?.name || "Admin"}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your rafting business
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Games Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Games</CardTitle>
              <Mountain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.games}</div>
              <p className="text-xs text-muted-foreground">
                Total rafting games
              </p>
            </CardContent>
          </Card>

          {/* Packages Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Packages</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.packages}</div>
              <p className="text-xs text-muted-foreground">
                Available packages
              </p>
            </CardContent>
          </Card>

          {/* Bookings Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bookings}</div>
              <p className="text-xs text-muted-foreground">
                Total bookings ({stats.pendingBookings} pending)
              </p>
            </CardContent>
          </Card>

          {/* Gallery Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gallery</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.galleryItems}</div>
              <p className="text-xs text-muted-foreground">
                Photos in gallery
              </p>
            </CardContent>
          </Card>

          {/* Testimonials Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.testimonials}</div>
              <p className="text-xs text-muted-foreground">
                Customer testimonials
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 