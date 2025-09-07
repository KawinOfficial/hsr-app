"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Building2,
  Users,
  CheckCircle,
  MapPin,
  Settings,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMemberListDialog } from "./MemberListDialog.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/features/departments/utils/colorStatus";
import { AddMemberDialog } from "@/features/departments/components/add-member-dialog";
import { Pagination } from "@/components/pagination";
import { TableLoading } from "@/components/table/TableLoading";
import { TableEmpty } from "@/components/table/TableEmpty";

const MemberListDialog = () => {
  const {
    memberOpen,
    setMemberOpen,
    selectedDepartment,
    pagination,
    list,
    roleOptions,
    onEditDepartment,
    getRoleName,
    handlePageChange,
    handleRoleChange,
    isLoading,
    canUpdate,
  } = useMemberListDialog();

  return (
    <Dialog open={memberOpen} onOpenChange={setMemberOpen}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-6 overflow-y-auto space-y-6">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>{selectedDepartment?.name} - Team Members</span>
          </DialogTitle>
          <DialogDescription>
            Manage team members, roles, and assignments for this department
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Department Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 text-rail-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-rail-blue">
                  {pagination?.totalItems || 0}
                </div>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-6 w-6 text-success-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-success-green">
                  {pagination?.totalItems || 0}
                </div>
                <p className="text-sm text-muted-foreground">Active</p>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardContent className="p-4 text-center">
                <MapPin className="h-6 w-6 text-warning-amber mx-auto mb-2" />
                <div className="text-2xl font-bold text-warning-amber truncate">
                  {selectedDepartment?.location}
                </div>
                <p className="text-sm text-muted-foreground">Location</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AddMemberDialog />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <Select defaultValue="all" onValueChange={handleRoleChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Members Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableLoading colSpan={5} />
                ) : !list?.length ? (
                  <TableEmpty colSpan={5} />
                ) : (
                  list?.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <p className="font-medium">
                          {member.firstName} {member.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {member.employeeInfo?.employeeId}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {getRoleName(member.employeeInfo?.roleId || "")}
                          </p>
                          {member.id === selectedDepartment?.headId && (
                            <Badge className="bg-rail-gold text-white mt-1">
                              Department Head
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{member.email}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.phoneNumber}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
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
            onPageChange={(page) => handlePageChange(page)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setMemberOpen?.(false)}>
            Close
          </Button>
          {canUpdate && (
            <Button onClick={onEditDepartment}>
              <Settings className="h-4 w-4 mr-2" />
              Department Settings
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MemberListDialog;
