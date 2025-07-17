import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SystemStatus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-warning-amber" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Financial System</span>
            <CheckCircle className="h-4 w-4 text-success-green" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Contract Management</span>
            <CheckCircle className="h-4 w-4 text-success-green" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Progress Tracking</span>
            <CheckCircle className="h-4 w-4 text-success-green" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">External Integration</span>
            <Clock className="h-4 w-4 text-warning-amber" />
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium">Quick Actions</p>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
