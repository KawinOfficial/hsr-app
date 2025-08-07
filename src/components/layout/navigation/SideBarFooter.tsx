import { SidebarFooter as SidebarFooterBase } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, User, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { PAGE_ROUTES } from "@/routers/page";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const SideBarFooter = () => {
  const router = useRouter();

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.push(PAGE_ROUTES.LOGIN);
  }

  return (
    <SidebarFooterBase className="border-t p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">Somchai Tanakorn</p>
              <p className="text-xs text-muted-foreground">Project Manager</p>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>
            <Link
              href={PAGE_ROUTES.PROFILE}
              className="flex items-center w-full"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooterBase>
  );
};

export default SideBarFooter;
