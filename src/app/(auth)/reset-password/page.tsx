import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, Shield, Train, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ResetForm } from "@/features/auths/components/reset-form";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rail-blue/5 via-background to-rail-gold/5">
      <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding and Information */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Train className="h-12 w-12 text-rail-blue" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Thai-Chinese HSR
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Cost Control System
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">
                  Create New Password
                </h2>
                <p className="text-muted-foreground">
                  Set a strong, secure password for your HSR account.
                </p>
              </div>
            </div>

            {/* Project Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Building2 className="h-8 w-8 text-rail-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-rail-blue">253km</div>
                  <p className="text-sm text-muted-foreground">
                    Total Track Length
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-construction-orange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-construction-orange">
                    2,850+
                  </div>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </CardContent>
              </Card>
            </div>

            {/* Security Requirements */}
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">Password Security Requirements</p>
                  <ul className="text-sm space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Include uppercase and lowercase letters</li>
                    <li>• Contain at least one number</li>
                    <li>• Include at least one special character</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>

          <ResetForm />
        </div>
      </div>
    </div>
  );
}
