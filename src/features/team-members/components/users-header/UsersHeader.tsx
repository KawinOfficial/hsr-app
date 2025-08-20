"use client";

import { useContextSelector } from "use-context-selector";
import { UsersContext } from "@/features/team-members/components/users-provider";
import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const UsersHeader = () => {
  const handleSearch = useContextSelector(
    UsersContext,
    (state) => state?.handleSearch
  );

  return (
    <div>
      <PageHeader
        title="Team Members"
        subTitle="Manage user accounts and team member access"
      >
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              className="pl-10 w-64"
              onChange={handleSearch}
            />
          </div>
        </div>
      </PageHeader>
    </div>
  );
};

export default UsersHeader;
