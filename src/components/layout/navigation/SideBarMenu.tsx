import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { NAVIGATION_ITEMS } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/icon";
import { usePermissions } from "@/hooks/use-permissions";
import { PermissionsMatrix } from "@/features/permissions/schemas/Permission.schema";

interface NavigationItem {
  title: string;
  url?: string;
  description?: string;
  permission?: keyof PermissionsMatrix;
  requiredAction?: "read" | "create" | "update" | "delete";
}

interface Navigations {
  title: string;
  url?: string;
  iconName: string;
  items?: NavigationItem[];
  permission?: keyof PermissionsMatrix;
  requiredAction?: "read" | "create" | "update" | "delete";
}

const SideBarMenu = () => {
  const pathname = usePathname();
  const { checkPermission, isLoading } = usePermissions();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  const hasItemPermission = (item: Navigations | NavigationItem) => {
    if (!item.permission || !item.requiredAction) return true;
    return checkPermission(item.permission, item.requiredAction);
  };

  const filterMenuItems = (items: Navigations[]) => {
    return items.filter((item) => hasItemPermission(item));
  };

  const filterSubItems = (items: NavigationItem[]) => {
    return items.filter((subItem) => hasItemPermission(subItem));
  };

  if (isLoading) {
    return (
      <SidebarContent className="pl-4 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center space-x-3 rounded-lg p-2 text-sm font-medium text-muted-foreground">
              <div className="h-4 w-4 animate-pulse bg-muted rounded" />
              <div className="h-4 w-24 animate-pulse bg-muted rounded" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    );
  }

  return (
    <SidebarContent className="pl-4 py-4">
      <SidebarMenu>
        {filterMenuItems(NAVIGATION_ITEMS).map((item) => (
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
                  <Icon name={item.iconName} className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center space-x-3 rounded-lg p-2 text-sm font-medium text-muted-foreground">
                  <Icon name={item.iconName} className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
                {item.items && filterSubItems(item.items).length > 0 && (
                  <SidebarMenuSub>
                    {filterSubItems(item.items).map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(subItem.url ?? "")}
                        >
                          <Link
                            href={subItem.url ?? ""}
                            className="block rounded-lg p-1  text-sm transition-colors hover:bg-accent"
                          >
                            <div>
                              <div className="font-medium truncate">
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
  );
};

export default SideBarMenu;
