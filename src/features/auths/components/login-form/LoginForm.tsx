"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLoginForm } from "./LoginForm.hook";
import Link from "next/link";
import { PAGE_ROUTES } from "@/routers/page";

const LoginForm = () => {
  const { showPassword, setShowPassword, register, handleSubmit, onSubmit } =
    useLoginForm();
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the HSR management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@thairail.go.th"
                  className="pl-10"
                  required
                  {...register("email")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  required
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link href="" className="text-sm text-rail-blue hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              <div className="flex items-center space-x-2">
                {/* <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> */}
                <span>Sign in</span>
              </div>
            </Button>
          </form>

          <Separator className="my-4" />

          <div className="text-sm flex items-center justify-center gap-2">
            <p className=" text-muted-foreground">Don't have an account?</p>
            <Link
              href={PAGE_ROUTES.REGISTER}
              className="text-rail-blue hover:underline"
            >
              Create account
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Help Links */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          © 2025 Thai-Chinese High-Speed Rail. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
