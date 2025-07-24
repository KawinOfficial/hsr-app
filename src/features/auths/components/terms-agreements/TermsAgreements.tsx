"use client";

import { useFormContext } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const TermsAgreements = () => {
  const {} = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Terms and Agreements</h3>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox id="agreeTerms" />
            <div className="text-sm">
              <Label htmlFor="agreeTerms" className="cursor-pointer">
                I agree to the{" "}
                <Link href="" className="text-rail-blue hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="" className="text-rail-blue hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="agreePrivacy" />
            <div className="text-sm">
              <Label htmlFor="agreePrivacy" className="cursor-pointer">
                I consent to the processing of my personal data in accordance
                with the{" "}
                <Link href="" className="text-rail-blue hover:underline">
                  Data Protection Policy
                </Link>
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="agreeCode" />
            <div className="text-sm">
              <Label htmlFor="agreeCode" className="cursor-pointer">
                I agree to abide by the{" "}
                <Link href="" className="text-rail-blue hover:underline">
                  Employee Code of Conduct
                </Link>{" "}
                and security policies
              </Label>
            </div>
          </div>
        </div>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Your account will be reviewed by the HR department before activation.
          You will receive an email notification once your account is approved.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default TermsAgreements;
