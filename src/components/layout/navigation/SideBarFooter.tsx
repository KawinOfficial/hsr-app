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
import { useProfile } from "@/features/auths/hook/use-profile";
import { useEffect } from "react";

const SideBarFooter = () => {
  const router = useRouter();
  const { data: profile, isError, isFetching } = useProfile();
  const { firstName, lastName, email } = profile || {};

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.push(PAGE_ROUTES.LOGIN);
  }

  useEffect(() => {
    if (!isError || isFetching) return;
    handleSignOut();
  }, [isError, isFetching]);

  return (
    <SidebarFooterBase className="border-t p-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start space-x-2 py-4 px-3 !h-auto"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="text-lg">
                {firstName?.charAt(0)}
                {lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium truncate max-w-[150px]">
                {firstName} {lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                {email}
              </p>
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
          {/* <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </DropdownMenuItem> */}
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
