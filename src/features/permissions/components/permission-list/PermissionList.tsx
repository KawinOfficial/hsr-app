"use client";

import { usePermissionList } from "./PermissionList.hook";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Lock, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStatusColor } from "@/features/permissions/utils/colorStatus";
import { Loading } from "@/components/loading";

const PermissionList = () => {
  const { handleEdit, isLoading, permissionList, canUpdate } =
    usePermissionList();

  return (
    <div>
      {isLoading && <Loading />}

      <div className="space-y-4">
        {permissionList?.map((group, idx) => (
          <Card
            key={`${group.id}-${idx}`}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {group.description}
                    </p>
                  </div>
                  <Badge
                    className={getStatusColor(
                      group.isActive ? "Active" : "Inactive"
                    )}
                  >
                    {group.isActive ? "Active" : "Inactive"}
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
                          <div className="grid grid-cols-2 gap-y-2 gap-x-14">
                            <div className="flex items-center justify-between text-sm">
                              <span>Read</span>
                              {perms.read ? (
                                <CheckCircle className="h-4 w-4 text-success-green" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Create</span>
                              {perms.create ? (
                                <CheckCircle className="h-4 w-4 text-success-green" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Update</span>
                              {perms.update ? (
                                <CheckCircle className="h-4 w-4 text-success-green" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Delete</span>
                              {perms.delete ? (
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
                  {canUpdate && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit?.(group)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Permissions
                    </Button>
                  )}
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
