"use client";

import * as React from "react";
import {
  Bot,
  GalleryVerticalEnd,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switch";
import { NavUser } from "./nav-user";
import { RaftingIcon } from "./icon";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/background.png",
  },
  teams: [
    {
      name: "Park Adventure",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Paket Adventure",
      url: "#",
      icon: RaftingIcon,
      isActive: true,
      items: [
        {
          title: "View Data",
          url: "/dashboard/paket-adventure",
        },
        {
          title: "Form Data",
          url: "/dashboard/paket-adventure/form-paket",
        },
      ],
    },
    {
      title: "Galeri",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "View Data",
          url: "/dashboard/galeri",
        },
        {
          title: "Form Data",
          url: "/dashboard/galeri/form-galeri",
        },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        {/* <Separator/> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
