import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  department: z.string(),
  status: z.string(),
  lastLogin: z.string(),
  joinDate: z.string(),
  location: z.string(),
  avatar: z.string(),
  projects: z.array(z.string()),
  permissions: z.array(z.string()),
});

export const UserDetailSchema = z.object({
  personalInfo: z.object({
    dateOfBirth: z.string(),
    nationality: z.string(),
    idNumber: z.string(),
    emergencyContact: z.string(),
    address: z.string(),
  }),
  employment: z.object({
    employeeId: z.string(),
    startDate: z.string(),
    contractType: z.string(),
    reportingManager: z.string(),
    salary: z.number(),
    workLocation: z.string(),
  }),
  security: z.object({
    lastPasswordChange: z.string(),
    twoFactorEnabled: z.boolean(),
    loginAttempts: z.number(),
    accountLocked: z.boolean(),
    lastSecurityReview: z.string(),
  }),
  activityLog: z.array(
    z.object({
      date: z.string(),
      action: z.string(),
      ip: z.string().optional(),
      device: z.string().optional(),
      details: z.string().optional(),
      success: z.boolean(),
    })
  ),
  permissions: z.object({
    dashboard: z.object({
      read: z.boolean(),
      write: z.boolean(),
      admin: z.boolean(),
    }),
    projects: z.object({
      read: z.boolean(),
      write: z.boolean(),
      admin: z.boolean(),
    }),
    financial: z.object({
      read: z.boolean(),
      write: z.boolean(),
      admin: z.boolean(),
    }),
    reports: z.object({
      read: z.boolean(),
      write: z.boolean(),
      admin: z.boolean(),
    }),
    users: z.object({
      read: z.boolean(),
      write: z.boolean(),
      admin: z.boolean(),
    }),
    settings: z.object({
      read: z.boolean(),
      write: z.boolean(),
      admin: z.boolean(),
    }),
  }),
  certifications: z.array(
    z.object({
      name: z.string(),
      issuer: z.string(),
      issueDate: z.string(),
      expiryDate: z.string(),
      status: z.string(),
    })
  ),
});

export const UsersSchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;
export type Users = z.infer<typeof UsersSchema>;
export type UserDetail = z.infer<typeof UserDetailSchema>;
