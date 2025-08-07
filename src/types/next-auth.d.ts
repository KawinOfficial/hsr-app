import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    nationality: string;
    employeeInfo: any;
    roles: string[];
    permissions: string[];
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    nationality: string;
    employeeInfo: any;
    roles: string[];
    permissions: string[];
  }
}
