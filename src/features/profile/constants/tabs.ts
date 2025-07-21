import { Lock, Shield, User } from "lucide-react";

export const PROFILE_TABS = [
  {
    label: "Profile",
    value: "profile",
    icon: User,
  },
  {
    label: "Permissions",
    value: "permissions",
    icon: Shield,
  },
  {
    label: "Security",
    value: "security",
    icon: Lock,
  },
];
