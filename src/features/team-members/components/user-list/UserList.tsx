"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useUserList } from "./UserList.hook";
import { getStatusColor } from "@/features/team-members/utils/colorStatus";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/pagination";
import { Loading } from "@/components/loading";
import { formatDate } from "@/lib/format";

const UserList = () => {
  const {
    list,
    pagination,
    handlePageChange,
    handleView,
    getRoleName,
    getDepartmentName,
    isLoading,
  } = useUserList();

  return (
    <Card className="mt-6 mx-6">
      <CardContent>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="h-[calc(88vh-10rem)] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role & Department</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((member, index) => (
                    <TableRow key={`${member.id}-${index}`}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={""} />
                            <AvatarFallback>
                              {member.firstName?.charAt(0)}
                              {member.lastName?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {member.firstName} {member.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {member.employeeInfo?.employeeId}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {getRoleName?.(member.employeeInfo?.roleId ?? "")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {getDepartmentName?.(
                              member.employeeInfo?.departmentId ?? ""
                            )}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{member.email}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.phoneNumber}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            📍 {member.employeeInfo?.workLocation}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatDate(member.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(member.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Pagination
              startIndex={0}
              itemsPerPage={pagination?.itemsPerPage || 0}
              totalItems={pagination?.totalItems || 0}
              totalPages={pagination?.totalPages || 0}
              currentPage={pagination?.currentPage || 1}
              onPageChange={(page) => handlePageChange?.(page)}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserList;
