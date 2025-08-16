"use client";

import { useDepartmentList } from "./DepartmentList.hook";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStatusColor } from "@/features/departments/utils/colorStatus";
import { formatCurrency } from "@/lib/format";

const DepartmentList = () => {
  const {
    departmentList,
    handleEditDepartment,
    handleViewMembers,
    findHeadName,
  } = useDepartmentList();

  return (
    <div className="space-y-4">
      {departmentList?.map((dept) => (
        <Card key={dept.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{dept.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {dept.description}
                    </p>
                  </div>
                  <Badge className={getStatusColor(dept.status)}>
                    {dept.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Department Head</p>
                    <p className="font-medium">{findHeadName(dept.headId)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Team Members</p>
                    <p className="font-medium">
                      {dept.teamMembers ?? 0} members
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{dept.location}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium">{formatCurrency(dept.budget)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Key Responsibilities
                  </p>
                  <ul className="text-sm space-y-1">
                    {dept.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-success-green mr-2" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    {dept.teamMembers ?? 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleViewMembers?.(dept)}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Members
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEditDepartment?.(dept)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DepartmentList;
