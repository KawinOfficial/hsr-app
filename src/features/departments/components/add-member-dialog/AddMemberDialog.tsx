"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Users, Search } from "lucide-react";
import { getStatusColor } from "@/features/departments/utils/colorStatus";
import { Input } from "@/components/ui/input";
import { departments } from "@/constants/options";
import { useAddMemberDialog } from "./AddMemberDialog.hook";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pagination } from "@/components/pagination";

const AddmemberDialog = () => {
  const {
    list,
    pagination,
    open,
    setOpen,
    handlePageChange,
    getRoleName,
    getDepartmentName,
    onCheckMember,
    isChecked,
    onAddMember,
  } = useAddMemberDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl p-6 space-y-6">
        <DialogHeader>
          <DialogTitle>Add Member to Department</DialogTitle>
          <DialogDescription>Select team members to add</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search available members..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="All">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["All", ...departments].map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!list?.length ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  list?.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Checkbox
                          checked={isChecked(member.id)}
                          onCheckedChange={() => onCheckMember(member.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {member.firstName} {member.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getDepartmentName(member.employeeInfo?.departmentId)}
                      </TableCell>
                      <TableCell>
                        {getRoleName(member.employeeInfo?.roleId)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <Pagination
            totalPages={pagination?.totalPages || 0}
            currentPage={pagination?.currentPage || 1}
            onPageChange={(page) => handlePageChange(page.toString())}
          />

          <Alert>
            <Users className="h-4 w-4" />
            <AlertDescription>
              Selected members will be transferred. Their access permissions and
              project assignments may be updated accordingly.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onAddMember}>
            <Plus className="h-4 w-4 mr-2" />
            Add Selected Members
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddmemberDialog;
