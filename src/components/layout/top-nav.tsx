"use client";

import { Menu, Mountain } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar, { MobileSidebar } from "./sidebar";

export default function TopNav() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      {/* Mobile Nav Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="h-16 flex items-center justify-center border-b">
            <div className="flex items-center space-x-2">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Rafting CMS</span>
            </div>
          </div>
          <MobileSidebar />
        </SheetContent>
      </Sheet>

      <div className="flex-1" />

      {/* User Avatar */}
      <div className="flex items-center gap-2">
        <div className="hidden md:block">
          <div className="text-sm font-medium">
            {session?.user?.name || "Admin User"}
          </div>
          <div className="text-xs text-muted-foreground">
            {session?.user?.role || "Administrator"}
          </div>
        </div>
        <Avatar>
          <AvatarImage src="" alt="User" />
          <AvatarFallback>
            {(session?.user?.name || "A").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
