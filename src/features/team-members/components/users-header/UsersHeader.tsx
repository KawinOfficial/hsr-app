import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_OPTIONS } from "@/features/project-overview/constants/options";

const UsersHeader = () => {
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
            />
          </div>
          <Select defaultValue={STATUS_OPTIONS[0].value}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PageHeader>
    </div>
  );
};

export default UsersHeader;
