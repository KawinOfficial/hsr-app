"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusColor } from "@/features/profile/utils/colorStatus";
import { usePermission } from "./Permission.hook";
import { formatCurrency } from "@/lib/format";

const Permission = () => {
  const { userPermissions } = usePermission();

  if (!userPermissions) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* System Access */}
      <Card>
        <CardHeader>
          <CardTitle>System Access</CardTitle>
          <CardDescription>
            System modules and features access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(userPermissions.systemAccess).map(
              ([module, hasAccess]) => (
                <div key={module} className="flex items-center justify-between">
                  <span className="capitalize">
                    {module.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <Badge
                    className={getStatusColor(
                      hasAccess ? "Active" : "Inactive"
                    )}
                  >
                    {hasAccess ? "Granted" : "Denied"}
                  </Badge>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Approval Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Limits</CardTitle>
          <CardDescription>
            Financial approval limits for different document types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(userPermissions.approvalLimits).map(
              ([type, limit]) => (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="capitalize text-sm">
                      {type.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="font-bold text-rail-blue">
                      {formatCurrency(limit as number)}
                    </span>
                  </div>
                  <Progress
                    value={((limit as number) / 10000000) * 100}
                    className="h-2"
                  />
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Project Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Project Access</CardTitle>
          <CardDescription>Access level for different projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Permissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(userPermissions.projectPermissions).map(
                ([project, permissions]) => (
                  <TableRow key={project}>
                    <TableCell className="font-medium">{project}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(permissions as string[]).map((perm) => (
                          <Badge key={perm} variant="outline">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Document Types */}
      <Card>
        <CardHeader>
          <CardTitle>Document Type Access</CardTitle>
          <CardDescription>
            Document types this user can create and manage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userPermissions.documentTypes.map((docType) => (
              <Badge key={docType} className="bg-rail-blue text-white">
                {docType}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Permission;
