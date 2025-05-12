import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 w-full ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 " />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <h4 className="font-bold tracking-tight text-xl">Dashboard</h4>
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
