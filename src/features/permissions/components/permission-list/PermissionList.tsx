"use client";

import { usePermissionList } from "./PermissionList.hook";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Lock, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStatusColor } from "@/features/permissions/utils/colorStatus";

const PermissionList = () => {
  const { permissionGroups, handleEdit } = usePermissionList();

  return (
    <div>
      <div className="space-y-4">
        {permissionGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {group.description}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {group.userCount} users assigned
                    </p>
                  </div>
                  <Badge className={getStatusColor(group.status)}>
                    {group.status}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Permissions Matrix</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(group.permissions).map(
                      ([module, perms]) => (
                        <div
                          key={module}
                          className="border rounded-lg p-3 space-y-2"
                        >
                          <h5 className="font-medium capitalize">
                            {module.replace("-", " ")}
                          </h5>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Read</span>
                              {perms.read ? (
                                <CheckCircle className="h-4 w-4 text-success-green" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Write</span>
                              {perms.write ? (
                                <CheckCircle className="h-4 w-4 text-success-green" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Admin</span>
                              {perms.admin ? (
                                <CheckCircle className="h-4 w-4 text-success-green" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit?.(group)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Permissions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PermissionList;
