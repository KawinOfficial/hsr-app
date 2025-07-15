"use client";

import NotificationSystem from "@/features/notification/NotificationSystem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  DollarSign,
  Users,
  Building2,
  BarChart3,
  Settings,
  Train,
  Search,
  ChevronDown,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps extends React.PropsWithChildren {}

const Navigation = ({ children }: NavigationProps) => {
  const pathname = usePathname();
  const userRole = "Project Manager";

  const navigationItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Project Management",
      icon: Building2,
      items: [
        {
          title: "Bidding & Budget",
          url: "/project-management",
          description: "Manage bidding processes and budget planning",
        },
        {
          title: "Project Overview",
          url: "/projects",
          description: "View all active projects",
        },
        {
          title: "Milestones",
          url: "/milestones",
          description: "Track project milestones and deliverables",
        },
      ],
    },
    {
      title: "Financial Management",
      icon: DollarSign,
      items: [
        {
          title: "Payments & Advances",
          url: "/payments",
          description: "Process payments and advance requests",
        },
        {
          title: "Asset Management",
          url: "/assets",
          description: "Register and manage project assets",
        },
        {
          title: "Liabilities",
          url: "/liabilities",
          description: "Track project liabilities and obligations",
        },
      ],
    },
    {
      title: "Reports & Analytics",
      icon: BarChart3,
      items: [
        {
          title: "Financial Reports",
          url: "/reports/financial",
          description: "Income and expense reports",
        },
        {
          title: "Project Summary",
          url: "/reports/summary",
          description: "Comprehensive project reports",
        },
        {
          title: "Cost Analysis",
          url: "/reports/cost-analysis",
          description: "Detailed cost analysis and forecasting",
        },
      ],
    },
    {
      title: "User Management",
      icon: Users,
      items: [
        {
          title: "Team Members",
          url: "/users",
          description: "Manage team access and roles",
        },
        {
          title: "Departments",
          url: "/departments",
          description: "QS, Engineering, Finance, Procurement",
        },
        {
          title: "Permissions",
          url: "/permissions",
          description: "Role-based access control",
        },
      ],
    },
  ];

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
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

          <SidebarContent className="px-4 py-4">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.url ? (
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      className="w-full"
                    >
                      <Link
                        href={item.url}
                        className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.items && (
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(subItem.url)}
                              >
                                <Link
                                  href={subItem.url}
                                  className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                                >
                                  <div>
                                    <div className="font-medium">
                                      {subItem.title}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {subItem.description}
                                    </div>
                                  </div>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">Somchai Tanakorn</p>
                    <p className="text-xs text-muted-foreground">{userRole}</p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <SidebarTrigger />
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search projects, contracts, reports..."
                    className="pl-10 pr-4 py-2 w-full max-w-96 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
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
