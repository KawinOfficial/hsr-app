"use client";

import { PropsWithChildren } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Train } from "lucide-react";
import SideBarMenu from "@/components/layout/navigation/SideBarMenu";
import SideBarFooter from "@/components/layout/navigation/SideBarFooter";
import { NotificationProvider } from "@/features/notification/components/notification-provider";
import { NotificationSystem } from "@/features/notification/components/notification-system";

const Navigation = ({ children }: PropsWithChildren) => {
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
          <header className="border-b bg-background px-4 sm:px-6 sticky top-0 z-10 h-[61px] flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <SidebarTrigger />
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <NotificationProvider>
                  <NotificationSystem />
                </NotificationProvider>
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
