import { useState } from "react";
import { User } from "@/features/team-members/schemas/User.schema";
import { useContextSelector } from "use-context-selector";
import { UsersContext } from "@/features/team-members/components/users-provider";

const mockUserDetails = {
  personalInfo: {
    dateOfBirth: "1985-03-15",
    nationality: "Thai",
    idNumber: "1-1234-56789-12-3",
    emergencyContact: "+66-2-555-9876",
    address: "123 Sukhumvit Road, Bangkok 10110",
  },
  employment: {
    employeeId: "EMP-2023-001",
    startDate: "2023-01-15",
    contractType: "Full-time",
    reportingManager: "Somchai Tanakorn",
    salary: 75000,
    workLocation: "Bangkok HQ",
  },
  security: {
    lastPasswordChange: "2024-01-15",
    twoFactorEnabled: true,
    loginAttempts: 0,
    accountLocked: false,
    lastSecurityReview: "2024-02-01",
  },
  activityLog: [
    {
      date: "2024-02-17 09:30",
      action: "Login",
      ip: "192.168.1.100",
      device: "Chrome on Windows",
      success: true,
    },
    {
      date: "2024-02-16 17:45",
      action: "Updated project status",
      details: "Modified TH-CN-001 progress to 68%",
      success: true,
    },
    {
      date: "2024-02-16 14:20",
      action: "Approved payment",
      details: "Payment PAY-2024-003 for ฿3.5M",
      success: true,
    },
    {
      date: "2024-02-16 08:15",
      action: "Login",
      ip: "192.168.1.100",
      device: "Chrome on Windows",
      success: true,
    },
  ],
  permissions: {
    dashboard: { read: true, write: true, admin: true },
    projects: { read: true, write: true, admin: true },
    financial: { read: true, write: true, admin: true },
    reports: { read: true, write: true, admin: true },
    users: { read: true, write: true, admin: true },
    settings: { read: true, write: true, admin: true },
  },
  certifications: [
    {
      name: "PMP - Project Management Professional",
      issuer: "PMI",
      issueDate: "2022-06-15",
      expiryDate: "2025-06-15",
      status: "Valid",
    },
    {
      name: "Railway Safety Certification",
      issuer: "Thai Railway Authority",
      issueDate: "2023-01-20",
      expiryDate: "2026-01-20",
      status: "Valid",
    },
  ],
};

export const useUserDetailDialog = () => {
  const selectedUser = useContextSelector(
    UsersContext,
    (state) => state?.selectedUser
  );
  const isOpen = useContextSelector(UsersContext, (state) => state?.isOpen);
  const setIsOpen = useContextSelector(
    UsersContext,
    (state) => state?.setIsOpen
  );

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User | undefined>(selectedUser);

  function handleSave() {
    setEditMode(false);
  }

  function handleEdit() {
    setEditMode(true);
  }

  function handleCancel() {
    setFormData(undefined);
    setEditMode(false);
  }

  const userDetails = {
    ...selectedUser,
    ...mockUserDetails,
  };

  return {
    userDetails,
    editMode,
    formData,
    handleSave,
    handleEdit,
    handleCancel,
    isOpen,
    setIsOpen,
  };
};
