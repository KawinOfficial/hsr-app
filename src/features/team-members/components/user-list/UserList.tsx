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
import { Eye, Edit } from "lucide-react";
import { useUserList } from "./UserList.hook";
import { getStatusColor } from "@/features/team-members/utils/colorStatus";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/pagination";

const UserList = () => {
  const {
    paginatedMembers,
    currentPage,
    totalPages,
    handlePageChange,
    startIndex,
    itemsPerPage,
    totalItems,
    handleView,
  } = useUserList();

  return (
    <Card className="mt-6 mx-6">
      <CardContent>
        <div className="h-[calc(88vh-10rem)] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role & Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMembers.map((member, index) => (
                <TableRow key={`${member.id}-${index}`}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{member.role}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.department}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{member.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        📍 {member.location}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.projects.map((project) => (
                        <Badge
                          key={project}
                          variant="outline"
                          className="text-xs"
                        >
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {member.lastLogin}
                      <p className="text-xs text-muted-foreground">
                        Joined: {member.joinDate}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(member)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        // onClick={() => handleEdit(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination
          startIndex={startIndex ?? 0}
          itemsPerPage={itemsPerPage ?? 10}
          totalItems={totalItems ?? 0}
          currentPage={currentPage ?? 1}
          totalPages={totalPages ?? 1}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
};

export default UserList;
