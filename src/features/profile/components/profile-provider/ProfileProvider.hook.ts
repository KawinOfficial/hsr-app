import { useState } from "react";

// User Profile Data
const userProfile = {
  id: "USR-001",
  firstName: "Somchai",
  lastName: "Tanakorn",
  email: "somchai.tanakorn@thcn-hsr.com",
  phone: "+66 2 123 4567",
  mobile: "+66 81 234 5678",
  position: "Project Manager",
  department: "Project Management Office",
  employeeId: "EMP-2023-001",
  hireDate: "2023-01-15",
  location: "Bangkok, Thailand",
  reportingTo: "Krisana Suriyawong",
  workLocation: "Head Office - Bangkok",
  nationality: "Thai",
  languages: ["Thai", "English", "Chinese"],
  timezone: "GMT+7 (Bangkok)",
  profileImage: "/placeholder.svg",
  status: "Active",
  lastLogin: "2024-02-15 09:30",
  createdDate: "2023-01-10",
  bio: "Experienced project manager with 12+ years in infrastructure development. Leading the Thai-Chinese High-Speed Rail project with focus on cost control and quality assurance.",
  education: [
    {
      degree: "Master of Engineering",
      field: "Civil Engineering",
      institution: "Chulalongkorn University",
      year: "2015",
      location: "Bangkok, Thailand",
    },
    {
      degree: "Bachelor of Engineering",
      field: "Civil Engineering",
      institution: "King Mongkut's University of Technology",
      year: "2012",
      location: "Bangkok, Thailand",
    },
  ],
  certifications: [
    {
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute",
      issueDate: "2018-05-15",
      expiryDate: "2027-05-15",
      status: "Active",
    },
    {
      name: "Railway Systems Engineering Certificate",
      issuer: "International Railway Training Institute",
      issueDate: "2020-08-20",
      expiryDate: "2025-08-20",
      status: "Active",
    },
    {
      name: "Quality Management System ISO 9001",
      issuer: "TUV Rheinland",
      issueDate: "2019-03-10",
      expiryDate: "2025-03-10",
      status: "Active",
    },
  ],
  workExperience: [
    {
      position: "Project Manager",
      company: "Thai-Chinese High Speed Rail Co., Ltd.",
      duration: "Jan 2023 - Present",
      location: "Bangkok, Thailand",
      description:
        "Leading cost control and project management for the Bangkok-Nakhon Ratchasima high-speed rail section.",
    },
    {
      position: "Senior Engineering Manager",
      company: "Bangkok Mass Transit Authority",
      duration: "Mar 2019 - Dec 2022",
      location: "Bangkok, Thailand",
      description:
        "Managed multiple metro line construction projects with budgets exceeding 50 billion THB.",
    },
    {
      position: "Project Engineer",
      company: "CH. Karnchang Public Company Limited",
      duration: "Jun 2015 - Feb 2019",
      location: "Bangkok, Thailand",
      description:
        "Oversaw infrastructure projects including bridges, tunnels, and station construction.",
    },
  ],
};

// User Permissions
const userPermissions = {
  systemAccess: {
    dashboard: true,
    projectManagement: true,
    financialManagement: true,
    reports: true,
    userManagement: true,
    documentWorkflow: true,
    assetManagement: true,
    systemSettings: false,
  },
  projectPermissions: {
    "TH-CN-001": ["view", "edit", "approve"],
    "TH-CN-002": ["view", "edit"],
    "TH-CN-003": ["view"],
  },
  approvalLimits: {
    paymentApproval: 5000000, // THB
    contractApproval: 10000000, // THB
    purchaseOrderApproval: 2000000, // THB
  },
  documentTypes: [
    "Purchase Request",
    "Purchase Order",
    "Payment Request",
    "Contract Agreement",
  ],
};

export const useProfileProvider = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileImageOpen, setProfileImageOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  function handleSaveProfile() {
    setEditMode(false);
  }

  return {
    editMode,
    setEditMode,
    profileImageOpen,
    setProfileImageOpen,
    userProfile,
    userPermissions,
    handleSaveProfile,
    changePasswordOpen,
    setChangePasswordOpen,
  };
};
