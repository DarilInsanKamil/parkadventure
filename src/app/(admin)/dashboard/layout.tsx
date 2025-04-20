import { Suspense } from "react";
import Loading from "./loading";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-red-500">
        <AppSidebar />
        <SidebarTrigger />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </SidebarProvider>
  );
}
