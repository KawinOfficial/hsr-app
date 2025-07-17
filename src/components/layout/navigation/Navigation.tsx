"use client";

import NotificationSystem from "@/features/notification/NotificationSystem";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Train, Search } from "lucide-react";
import SideBarMenu from "@/components/layout/navigation/SideBarMenu";
import SideBarFooter from "@/components/layout/navigation/SideBarFooter";

interface NavigationProps extends React.PropsWithChildren {}

const Navigation = ({ children }: NavigationProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-2">
            <div className="flex items-center space-x-2">
              <Train className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Thai-Chinese HSR
                </h1>
                <p className="text-xs text-muted-foreground">
                  Cost Control System
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SideBarMenu />
          <SideBarFooter />
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <SidebarTrigger />
                {/* //! Hide Search */}
                {/* <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search projects, contracts, reports..."
                    className="pl-10 pr-4 py-2 w-full max-w-96 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div> */}
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <NotificationSystem />
                <Badge
                  variant="outline"
                  className="text-primary border-primary"
                >
                  Phase 2A Active
                </Badge>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Navigation;
