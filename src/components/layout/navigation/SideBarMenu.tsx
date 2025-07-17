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

const SideBarMenu = () => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  return (
    <SidebarContent className="pl-4 py-4">
      <SidebarMenu>
        {NAVIGATION_ITEMS.map((item) => (
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
